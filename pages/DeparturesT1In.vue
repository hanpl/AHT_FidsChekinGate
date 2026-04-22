<template>
    <HomeAppHeaderT1In />
    <section class="content">
      <div class="row">
              <div class="card-body pad table-responsive" style="width: 100vw">
                      <table class="table table-hover" id="tblWorkOrderDone">
                          <thead class="classtheadheader" style="background-color: #36c0c7;height: 6vh;">
                              <tr>
                                  <th style="width: 10vw;">STD</th>
                                  <th style="width: 12vw;">AIRLINE</th>
                                  <th style="width: 10vw;">FLIGHT</th>
                                  <th style="width: 21vw; "><spam style="float: left; padding-left: 2.4vw;">DESTINATION</spam></th>
                                  <th style="width: 5vw;">GATE</th>
                                  <th style="width: 12vw;">COUNTER</th>
                                  <th style="width: 10vw;">NEW TIME</th>
                                  <th style="width: 18vw;">STATUS</th>
                              </tr>
                          </thead>
                          <tbody>
                            <template v-for="(flight, index) in pagedGroups" :key="flight.flightNo + '-' + index">
                              <tr v-if="flight.isDaybreak" class="sizerowT1 notice-row" style="height: 14vh;">
                                <td colspan="8" style="vertical-align: middle;">
                                  <div class="notice-content">{{ formatDateToFlightMessage(flight.date) }}</div>
                                </td>
                              </tr>

                              <!-- Nếu là chuyến bay -->
                              <tr v-else-if="flight.flightNo" class="sizerowT1">
                                <td class="midal">{{flight.sobt }}</td>
                                <td class="midal">
                                  <img class="VuelogoT1"
                                      :src="`/img/logo_785x225/${flight.lineCode}_785x225.png?timestamp=${new Date().getTime()}`"
                                      @error="handleImageError(flight)" />
                                </td>
                                <td class="midal">{{ flight.flightNo }}</td>
                                <td class="midal1">{{ getFullCityName(flight.city) }}</td>
                                <td class="midal">{{ flight.dgate }}</td>
                                <td class="midal">{{ flight.ckiRow }}</td>
                                <td class="midal">{{ flight.mcdt }}</td>
                                <td
                                  class="midal"
                                  :class="{
                                    green: flight.status === 'OPN',
                                    gray: flight.status === 'CLS',
                                    red: flight.status === 'CNX' || flight.status === 'XXX', // Cancel/Delete
                                    yellow: flight.status === 'DLA' || flight.status === 'RTG', // Delay/Return
                                    blue: flight.status === 'DIV'          // Divert
                                  }">
                                  {{ getStatusText(flight.status) }}
                                </td>
                              </tr>
                            </template>
                          </tbody>
                      </table>
                  </div>
          </div >
    </section>
    <HomeAppFooter /> 
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { parse, format } from 'date-fns'
  import { watch, reactive, toRefs } from 'vue';
  const currentIndex = ref(0);


  // const urlCountries = 'https://localhost:7079/api/Countries';
  // const urlConfig = 'https://localhost:7079/api/FidsInformation';
  // const urlbase = 'https://localhost:7079/';

  const urlCountries = 'http://172.17.18.12:8085/api/Countries';
  const urlConfig = 'http://172.17.18.12:8085/api/FidsInformation';
  const urlbase = 'http://172.17.18.12:8085';




  const intervalId = ref<NodeJS.Timeout | null>(null);
  const countries = reactive({
    cityMap: [
        {codeAirport: "BHY",nameAirport: "Beihai",countries: "Trung Quốc"},
        {codeAirport: "ICN",nameAirport: "Incheon",countries: "Hàn Quốc"}
    ]});

  interface Flight {
    id: string;
    scheduledDate: string;
    sobt: string;
    eobt: string; 
    lineCode: string;
    flightNo: string;
    city: string; 
    dgate: string;
    status: string; 
    ckiRow: string
    
  };
const flights = ref<Flight[]>([]);

const pagedGroupsData = ref<any[][]>([])
const currentPage = ref(0)
let pageSize = 10
let maxPages = 2
let pageInterval = 3000
let reloadInterval = 180000 // 3 phút

function getStatusText(code: string): string {
  switch (code) {
    case 'OPN': return 'Open'
    case 'CLS': return 'Closed'
    case 'CNX': return 'Cancelled'
    case 'XXX': return 'Deleted'
    case 'DLA': return 'Delayed'
    case 'DIV': return 'Diverted'
    case 'RTG': return 'Return to Gate'
    default: return code || ''
  }
}

async function loadFlights(rollOn: number, rollOff: number) {

  flights.value = await refetchDataArr(rollOn, rollOff);
  const allFlights = groupFlightsByDayWithBreak(flights.value)
  pagedGroupsData.value = paginateFlights(allFlights)
  if (currentPage.value >= pagedGroupsData.value.length) {
    currentPage.value = 0;
  }
}
  
const loadCityMap = async () => {
    fetch(urlCountries) 
          .then(response => response.json())
          .then(data => {
            countries.cityMap = data;
          })
          .catch(error => {
          console.error(error);
          });
};

const refetchDataArr = async (rollOn: number,  rollOff: number): Promise<Flight[]> =>
  {
  const config = useRuntimeConfig()
  const { data, error } = await useFetch<Flight[]>('/api/T1Departures', {
    baseURL: urlbase,
    method: 'GET',
    query: { rollOn, rollOff}
  });
   //flights.value = data.value ?? [];
  if (error.value) {
    console.error('❌ API Error:', error.value)
    return []
  }
  return data.value ?? []
}


function groupFlightsByDayWithBreak(flights: Flight[]) {
  console.log(flights[0].scheduledDate);
  const result: any[] = []
  let currentDay = flights.length > 0 ? flights[0].scheduledDate : ''
  flights.forEach((flight) => {
    const dateKey = flight.scheduledDate;
    if (dateKey !== currentDay) {
      result.push({ isDaybreak: true, date: dateKey })
      currentDay = dateKey
    }
    result.push({ ...flight, isDaybreak: false, date: dateKey })
  })
  console.log(result);
  return result
};

function paginateFlights(flightList: any[]) {
  const pages: any[][] = []
  let currentPage: any[] = []
  let rowCount = 0

  for (const item of flightList) {
    const linesNeeded = item.isDaybreak ? 2 : 1

    if (rowCount + linesNeeded > pageSize) {
      pages.push(currentPage)
      if (pages.length >= maxPages) break
      currentPage = []
      rowCount = 0
    }

    currentPage.push(item)
    rowCount += linesNeeded
  }

  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return pages
};


const getFullCityName = (shortCode: string): string => {
  const airport = countries.cityMap.find(a => a.codeAirport === shortCode)
      return  airport ? airport.nameAirport : 'Not Found'
};

const formatTime = (datetime:string) :string => {
    if(datetime != "")
    {
        const date = parse(datetime, 'dd/MM/yyyy h:mm:ss a', new Date());
        if (isNaN(date.getTime())) {
            throw new Error('Invalid datetime format'+ datetime);
        }
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    else
    {
        return "";
    }
};
  
const formatDateToFlightMessage = (dateString: string): string => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
    }
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `FLIGHTS FOR ${dayOfWeek.toUpperCase()} ${month.toUpperCase()} ${day}, ${year}`;
};


const handleImageError = (item: Flight) => {
        console.log(item.lineCode);
        item.lineCode = 'trans'; // Thay đổi tên hình thay thế tại đây
        console.log(item.lineCode);
      };

interface ConfigDevice 
{ id: number; name: string; location: string; description: string; ip: string;  rollOn: number;  
rollOff: number;  pageSize: number;  maxPages: number;  pageInterval: number; reloadInterval: number; 
mobilities: string; connectionId: string}

const configs = reactive<{configDevice: ConfigDevice;}>
({configDevice: {id: 1, name: "", location: "", description: "", 
ip: "", rollOn: 0, rollOff: 0, pageSize: 8, maxPages: 1, 
pageInterval:0, reloadInterval:0, mobilities: "",connectionId:""}})


const loadconfig = async () => {
  try {
    const response = await fetch(urlConfig);
    const data = await response.json();
    configs.configDevice = data;
  } catch (error) {
    console.error("Failed to load config: ", error);
  }
};

const intervalLoadFlights = ref<NodeJS.Timeout | null>(null);
onMounted(async () => {
  await loadconfig()
  pageSize = configs.configDevice.pageSize;
  maxPages = configs.configDevice.maxPages;
  pageInterval = configs.configDevice.pageInterval;
  reloadInterval = configs.configDevice.reloadInterval;
  await loadFlights(configs.configDevice.rollOn, configs.configDevice.rollOff)
  autoRotatePages()
  intervalLoadFlights.value = setInterval(async () => 
    {
      await loadFlights(configs.configDevice.rollOn, configs.configDevice.rollOff)
    }, reloadInterval);
})

function autoRotatePages() {
  setInterval(() => {
    currentPage.value = (currentPage.value + 1) % pagedGroupsData.value.length
  }, pageInterval)
}

const pagedGroups = computed(() => {
  const pageCount = pagedGroupsData.value.length;
  if (currentPage.value >= pageCount) {
    currentPage.value = 0; // Reset về trang đầu nếu vượt quá
  }
  console.log("pagedGroupsData.value")
  console.log(pagedGroupsData.value)
  console.log(currentPage.value, pagedGroupsData.value[currentPage.value]);
  return pagedGroupsData.value[currentPage.value]
});


onUnmounted(() => {
  if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
  }
  if (intervalLoadFlights.value) {
    clearInterval(intervalLoadFlights.value);
    intervalLoadFlights.value = null;
  }
  });

onBeforeMount(() => {
  loadCityMap();
});


</script>
  
  <style>
  @import url("~/assets/css/icheck.css");
  body {
      text-align: center !important;
      overflow: hidden;
      background-color: #283b92;
  }
  .card-body {
      padding: 0rem !important;
  }
  
.sizerowT1 {
    height: 7vh;
    color: white;
    font-size: 2vh;
    font-weight: 450;
}

  .sizerowT1 td {
      padding: 10px;
      text-align: center;
      color: white;
      font-size: 3.9vh;
      vertical-align: middle; /* Căn giữa theo chiều dọc */
      /* border-bottom: 1px solid #ddd; */
  }

    .classtheadheader th {
      color: #121542;
      font-size: 3vh;
      padding: 10px !important;
      text-align: center;
      vertical-align: middle !important;
  }


.midal {
  vertical-align: middle !important;

}
.midal1 {
  vertical-align: middle !important;
  text-align: left !important; /* Căn chữ về bên trái */
  padding-left: 1.5vw !important;
}

  


  
  .sizerowT1:nth-child(odd) {
      background-color: #283b92; /* Màu nền cho hàng lẻ */
  }
  
  .sizerowT1:nth-child(even) {
      background-color: #121441; /* Màu nền cho hàng chẵn */
  }
  .table td, .table th {
      padding: 0.25rem;
      border-top: 0px solid #dee2e6 !important;
  }

  td img {
    text-align: center !important;
    margin: 0vh;
    width: 100%;
    display: flex;
  }
  
.notice-content {
  font-weight: bold;
  font-size: 3.9vh;
  color: white;
}

img.VuelogoT1 {
    width: 100%;
    padding: 0px 1vh;
}
  




  td.green {
    color: #07e207;
  }
  td.red {
    color: red;
  }
  td.yellow {
    color: yellow;
  }
  
  
  </style>