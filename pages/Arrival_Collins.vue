<template>
    <HomeAppHeaderArrCollins />
    <section class="content">
          <div class="conten" style="padding-right: 1.5px;">
            <div class="card-body pad table-responsive" style="width: 100%">
                <table class="table table-hover" id="tblWorkOrderDone">
                    <thead class="classtheadheadercl" style="background-color: #36c0c7;height: 6vh;">
                        <tr>
                            <th style="width: 10%;">STA</th>
                            <th style="width: 22%;">AIRLINE</th>
                            <th style="width: 12%;">FLIGHT</th>
                            <th style="width: 25%; "><spam style="float: left; padding-left: 2.4%;">FROM</spam></th>
                            <th style="width: 6%;">BELT</th>
                            <th style="width: 10%;">ETA</th>
                            <th style="width: 15%;">REMARK</th>
                        </tr>
                    </thead>
                    <tbody>
                      <template v-for="(flight, index) in pagedGroups1" :key="flight.flight + '-' + index">
                        <tr v-if="flight.isDaybreak && index >= 11" class="sizerow notice-row" :class="`row-${index}`" style="height: 6.6vh;">
                          <td colspan="8" style="vertical-align: middle;">
                            
                          </td>
                        </tr>
                        <tr v-if="flight.isDaybreak && index < 11" class="sizerow notice-row" :class="`row-${index}`" style="height: 13.2vh;">
                          <td colspan="8" style="vertical-align: middle;">
                            
                            <div class="notice-content">{{ formatDateToFlightMessage(flight.date) }}</div>
                            
                          </td>
                        </tr>
                        <tr v-if="flight.isDaybreak" class="sizerow notice-row" style="height: 0vh;">

                        </tr>

                        <!-- Nếu là chuyến bay -->
                        <tr v-else-if="flight.flight" class="sizerowcl">
                          <td class="midal">{{ formatTime(flight.schedule) }}</td>
                          <td class="midallogo">
                            <img class="Vuelogocl" alt="Vuelogo"
                                :src="`/img/Logo_785x225/${flight.lineCode}_785x225.png?timestamp=${new Date().getTime()}`"
                                @error="handleImageError(flight)" />
                          </td>
                          <td class="midal">{{ flight.flight }}</td>
                          <td class="midalcl">{{ getFullCityName(flight.city) }}</td>
                          <td class="midal">{{ flight.belt }}</td>
                          <td class="midal">{{ formatTime(flight.actual || flight.estimated) }}</td>
                          <td class="midal" :class="flight.remark == 'Boarding' ? 'green' : flight.remark == 'Cancelled' ? 'red' : flight.remark == 'Delayed' ? 'yellow' : ''">
                            {{ flight.remark }}
                          </td>
                        </tr>
                      </template>
                      <template v-if="!pagedGroups1">
                        <tr v-for="i in Math.max(0, 12)"
                          :key="'empty-' + i"
                          class="sizerow empty-row1 !pagedGroups"
                          style="height: 6.6vh; background-color: #121441;">
                          <td colspan="8"></td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr
                          v-for="i in Math.max(0, pageSize - displayedRowCount1)"
                          :key="'empty-' + i"
                          class="sizerow empty-row2"
                          style="height: 6.6vh; background-color: #121441;"
                        >
                          <td colspan="8"></td>
                      </tr>
                      </template>
                    </tbody>
                </table>
            </div>
          </div>
          <div class="conten" style="padding-left: 1.5px;">
            <div class="card-body pad table-responsive" style="width: 100%">
                <table class="table table-hover" id="tblWorkOrderDone">
                    <thead class="classtheadheadercl" style="background-color: #36c0c7;height: 6vh;">
                        <tr>
                            <th style="width: 10%;">STA</th>
                            <th style="width: 22%;">AIRLINE</th>
                            <th style="width: 12%;">FLIGHT</th>
                            <th style="width: 25%; "><spam style="float: left; padding-left: 2.4%;">FROM</spam></th>
                            <th style="width: 6%;">BELT</th>
                            <th style="width: 10%;">ETA</th>
                            <th style="width: 15%;">REMARK</th>
                        </tr>
                    </thead>
                    <tbody>
                      <template v-for="(flight, index) in pagedGroups" :key="flight.flight + '-' + index">
                        <tr v-if="flight.isDaybreak && index >= 11" class="sizerow notice-row" :class="`row-${index}`" style="height: 6.6vh;">
                          <td colspan="8" style="vertical-align: middle;">
                            
                          </td>
                        </tr>
                        <tr v-if="flight.isDaybreak && index < 11" class="sizerow notice-row" :class="`row-${index}`" style="height: 13.2vh;">
                          <td colspan="8" style="vertical-align: middle;">
                            
                            <div class="notice-content">{{ formatDateToFlightMessage(flight.date) }}</div>
                            
                          </td>
                        </tr>
                        <tr v-if="flight.isDaybreak" class="sizerow notice-row" style="height: 0vh;"></tr>
                        <tr v-else-if="flight.flight" class="sizerowcl">
                          <td class="midal">{{ formatTime(flight.schedule) }}</td>
                          <td class="midallogo">
                            <img class="Vuelogocl" alt="Vuelogo"
                                :src="`/img/Logo_785x225/${flight.lineCode}_785x225.png?timestamp=${new Date().getTime()}`"
                                @error="handleImageError(flight)" />
                          </td>
                          <td class="midal">{{ flight.flight }}</td>
                          <td class="midalcl">{{ getFullCityName(flight.city) }}</td>
                          <td class="midal">{{ flight.belt }}</td>
                          <td class="midal">{{ formatTime(flight.actual || flight.estimated) }}</td>
                          <td class="midal" :class="flight.remark == 'Boarding' ? 'green' : flight.remark == 'Cancelled' ? 'red' : flight.remark == 'Delayed' ? 'yellow' : ''">
                            {{ flight.remark }}
                          </td>
                        </tr>
                      </template>
                      <template v-if="!pagedGroups">
                        <tr v-for="i in Math.max(0, 12)"
                          :key="'empty-' + i"
                          class="sizerow empty-row !pagedGroups"
                          style="height: 6.6vh; background-color: #121441;">
                          <td colspan="8"></td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr
                          v-for="i in Math.max(0, pageSize - displayedRowCount)"
                          :key="'empty-' + i"
                          class="sizerow empty-row pagedGroups"
                          style="height: 6.6vh; background-color: #121441;"
                        >
                          <td colspan="8"></td>
                      </tr>
                      </template>
                    </tbody>
                </table>
            </div>
          </div>
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
    id: string;scheduledDate: string;schedule: string;estimated: string; actual: string; counterStart: string; counterEnd: string;
    lineCode: string;flight: string;city: string; gate: string;remark: string; checkInCounters: string; codeShare: string
  };
const flights = ref<Flight[]>([]);

const pagedGroupsData = ref<any[][]>([])
const currentPage = ref(0)
let pageSize = 12
let maxPages = 2
let pageInterval = 3000
let reloadInterval = 180000 // 3 phút

  const displayedRowCount = computed(() => {
    if (!pagedGroups.value) return 0
    return pagedGroups.value.reduce((count, flight, index) => {
      if (flight.isDaybreak && index < pageSize-1) return count + 2
      return count + 1
    }, 0)
  })

  const displayedRowCount1 = computed(() => {
    if (!pagedGroups1.value) return 0
    return pagedGroups1.value.reduce((count, flight, index) => {
      if (flight.isDaybreak && index < pageSize-1) return count + 2
      return count + 1
    }, 0)
  })

async function loadFlights(rollOn: number, rollOff: number) {
  flights.value = await refetchDataArr(rollOn, rollOff);
  const allFlights = groupFlightsByDayWithBreak(flights.value)
  pagedGroupsData.value = paginateFlights(allFlights)
  if (currentPage.value >= pagedGroupsData.value.length) {
    currentPage.value = 0;
  }
}
  
const refetchDataArr = async (rollOn: number,  rollOff: number): Promise<Flight[]> =>{
  const config = useRuntimeConfig()
  const { data, error } = await useFetch<Flight[]>('/api/FidsArrivals', {
    baseURL: urlbase,
    method: 'GET',
    query: { rollOn, rollOff}
  });
  if (error.value) {
    console.error('❌ API Error:', error.value)
    return []
  }
  return data.value ?? []
};

function groupFlightsByDayWithBreak(flights: Flight[]) {
  //console.log(flights[0].scheduledDate);
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
  //console.log(result);
  return result
};

// function paginateFlights(flightList: any[]) {
//   const pages: any[][] = []
//   let currentPage: any[] = []
//   let rowCount = 0

//   for (const item of flightList) {
//     const linesNeeded = item.isDaybreak ? 2 : 1

//     if (rowCount + linesNeeded > pageSize) {
//       pages.push(currentPage)
//       if (pages.length >= maxPages) break
//       currentPage = []
//       rowCount = 0
//     }

//     currentPage.push(item)
//     rowCount += linesNeeded
//   }

//   if (currentPage.length > 0) {
//     pages.push(currentPage)
//   }

//   return pages
// };

function paginateFlights(flightList: any[]) {
  const pages: any[][] = []
  let currentPage: any[] = []
  let rowCount = 0

  for (const item of flightList) {
    const linesNeeded = item.isDaybreak ? 2 : 1

    if (rowCount + linesNeeded > pageSize) {
      pages.push(currentPage)
      if (pages.length === maxPages - 1) {
        // Chỉ còn 1 page được phép nữa, đẩy hết phần còn lại vào đó rồi thoát
        const remaining = flightList.slice(flightList.indexOf(item))
        currentPage = []
        rowCount = 0

        for (const restItem of remaining) {
          const restLines = restItem.isDaybreak ? 2 : 1
          if (rowCount + restLines > pageSize) break

          currentPage.push(restItem)
          rowCount += restLines
        }

        if (currentPage.length > 0) {
          pages.push(currentPage)
        }
        break
      }

      currentPage = []
      rowCount = 0
    }

    currentPage.push(item)
    rowCount += linesNeeded
  }

  // Nếu chưa đủ 2 trang thì thêm phần còn lại
  if (currentPage.length > 0 && pages.length < maxPages) {
    pages.push(currentPage)
  }

  return pages
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
        //console.log(item.lineCode);
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
const intervalLoadConfig = ref<NodeJS.Timeout | null>(null);
onMounted(async () => {
  await loadconfig()
  pageSize = configs.configDevice.pageSize;
  maxPages = configs.configDevice.maxPages;
  pageInterval = configs.configDevice.pageInterval;
  reloadInterval = configs.configDevice.reloadInterval;
  await loadFlights(configs.configDevice.rollOn, configs.configDevice.rollOff);
  autoRotatePages()
  intervalLoadFlights.value = setInterval(async () => 
  {
    await loadFlights(configs.configDevice.rollOn, configs.configDevice.rollOff);
  }, reloadInterval);
  intervalLoadConfig.value = setInterval(async () => 
  {
    await loadconfig()
  }, 600010);
})

function autoRotatePages() {
  setInterval(() => {
    currentPage.value = (currentPage.value + 1) % pagedGroupsData.value.length
  }, pageInterval)
}

const pagedGroups1 = computed(() => {
  const pageCount = pagedGroupsData.value.length;
  if (currentPage.value >= pageCount) {currentPage.value = 0;}
  return pagedGroupsData.value[0]
});

const pagedGroups = computed(() => {
  const pageCount = pagedGroupsData.value.length;
  if (currentPage.value >= pageCount) {currentPage.value = 0;}
  return pagedGroupsData.value[1]
});

intervalLoadConfig
onUnmounted(() => {
  if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
  }
  if (intervalLoadFlights.value) {
    clearInterval(intervalLoadFlights.value);
    intervalLoadFlights.value = null;
  }
  if (intervalLoadConfig.value) {
    clearInterval(intervalLoadConfig.value);
    intervalLoadConfig.value = null;
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
      background-color: #121441;
  }
  .card-body {
      padding: 0rem !important;
  }
  
.sizerowcl {
    height: 6.6vh;
    color: white;
    font-size: 2vh;
}

  .sizerowcl td {
      padding: 0px;
      text-align: center;
      color: white;
      font-size: 3vh;
      vertical-align: middle; /* Căn giữa theo chiều dọc */
      /* border-bottom: 1px solid #ddd; */
  }

    .classtheadheadercl th {
      color: #121542;
      font-size: 2.5vh;
      padding: 0px !important;
      text-align: center;
      vertical-align: middle !important;
  }


.midal {
  vertical-align: middle !important;

}
.midalcl {
  vertical-align: middle !important;
  text-align: left !important; /* Căn chữ về bên trái */
  padding-left: 1% !important;

}

  


  
  /* .sizerowcl:nth-child(odd) {
      background-color: #283b92;
  }
  
  .sizerowcl:nth-child(even) {
      background-color: #121441;
  } */

  :root {
  --row-odd-color: #283b92;
  --row-even-color: #121441;
}

.sizerowcl:nth-child(odd) {
  background-color: var(--row-odd-color);
}

.sizerowcl:nth-child(even) {
  background-color: var(--row-even-color);
}

  .table td, .table th {
      padding: 0rem;
      border-top: 0px solid #dee2e6 !important;
  }

  td img {
    text-align: center !important;
    margin: 0vh;
    width: 85%;
    display: flex;
  }

  td.midallogo
 {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-wrap: wrap; */
    height: 6.6vh;
 }
  
.notice-content {
  font-weight: bold;
  font-size: 3.9vh;
  color: white;
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
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
}

.conten {
    width: 50vw;
}


.sizerowcl {
  width: 10px;              /* hoặc bất kỳ giá trị cố định nào */
  overflow: hidden;
  white-space: nowrap;
}

img.Vuelogocl {
    width: 75%;
}


  </style>