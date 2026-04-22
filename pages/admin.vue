<template>
    <div class="allocation-container">
      <div class="rowheaderA" style="width: 79vw;">
        <div class="hearderA" style="display: flex; padding: 0 5px; ">
          <div class="datetime-picker-wrapper">
            <input
              v-model="selectedDate"
              type="text"
              placeholder="Select Date and Time"
              readonly
            />
            <button @click="togglePicker">
              <i class="fas fa-calendar-alt" @click="openPicker"></i>
            </button>
            <vue3-datepicker
              v-show="showPicker"
              v-model="datePickerValue"
              @update:modelValue="onDateChange"
              type="datetime"
              :format="dateFormat"
            />
          </div>
          <h1 style="text-align: center;" >{{ datetitle }}</h1>
        </div>
        <div class="timeflight" style="margin-left: 0.23%;">
            <div class="timeheader" style="display: flex; ">
              <div class="hour" style="width: 7%;">Time</div>
              <div class="timeline" style="width: 93%;">
                <div v-for="(hour, index) in linetime.hours" :key="index" class="hour">
                  {{ hour }}
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="rowheaderA headerfix" style="width: 19.5vw; padding: 0 5px;">
        <!-- <div class="searchComponent">
          <div class="SearchBar_inputRow__RQiP9">
            <div class="SearchBar_inputContainer__5pnH0">
              <img class="SearchBar_searchIcon" :src="`/img/icon/search.jpg?timestamp=${new Date().getTime()}`" alt="">
              <div class="SearchBar_selectorWrapper__Oyf5Q">
                <input type="text" class="SearchBar_input__somiR" placeholder="Search !" value="">
              </div>
            </div>
          </div>
          <div class="searchmain">
            <a href="">cha mi</a>
          </div>
        </div> -->

        <div class="searchComponent">
          <div class="SearchBar_inputRow__RQiP9">
            <div class="SearchBar_inputContainer__5pnH0">
              <img class="SearchBar_searchIcon" :src="`/img/icon/search.jpg?timestamp=${new Date().getTime()}`" alt="">
              <div class="SearchBar_selectorWrapper__Oyf5Q">
                <!-- gõ tới đâu lọc tới đó -->
                <input
                  type="text"
                  class="SearchBar_input__somiR"
                  placeholder="Search !"
                  v-model="q"
                />
              </div>
            </div>
          </div>

          <!-- danh sách kết quả -->
          <div class="searchmain" v-if="results.length">
            <a
              v-for="(f, i) in results"
              :key="i"
              href="#"
              @click="handleClick(f)"
            >
              {{ f.lineCode }} · {{ f.flight }} · {{ f.city }} . {{ f.schedule }}
            </a>
          </div>

          <div class="searchmain" v-else-if="q.trim()">
            <a href="javascript:void(0)">Không có kết quả</a>
          </div>
        </div>




        <div class="headertitle">
          <flightInfor :flightData="propsValue" @result="handleResult" />
        </div>
      </div>
      <div class="rowmain" style="display: flex;">
        <div style="width: 79vw; padding: 0 5px;">
          
        <!-- <h1 style="text-align: center;">Thursday, 08 August 2024 - Check-In Counter Allocation</h1> -->
        <div class="headertitle">
          <!-- flights no Counter-->
          <div class="counters">
                <div class="counter"  >
                <div class="counter-name" style="width: 7%;">All</div>
                <div class="slots">
                    <div ref="sliderContainer" class="slider-container">
                        <div class="slider-track"></div>
                        <div v-for="(item, index) in dailyairline.flights" :key="index"
                            class="slider-thumb" 
                            :style="{ left: `${gettimestartnew(item.schedule)}%`, width: item.flight != '' ? `9%` : '0%', 
                            visibility: item.flight !== '' && (!item.checkInCounters || item.checkInCounters === '') ? 'visible' : 'hidden'
                            }"
                            @click="handleClick(item)">
                            <div class="slider-label">
                            <span class="item_time start">{{ formatTime(item.counterStart) }}</span>
                            <span class="btw">{{ item.flight }}</span>
                            <span class="item_time end">{{ formatTime(item.counterEnd) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
          <!-- End flights no Counter-->
          <div>
            <p class="abc">1/MOBILE_CHECK INA</p>
          </div>
          <div class="counters">
            <div class="counter" v-for="(counter, index) in chekincounters.mobileInAs" :key="index" >
              <div class="counter-name" style="width: 7%;">{{ counter.name }}</div>
              <div class="slots">
                <div ref="sliderContainer" class="slider-container">
                    <div class="slider-track"></div>
                    <div v-for="(item, index) in counter.flights" :key="index" class="slider-thumb" 
                        :style="{ left: `${gettimestart(item.counterStart)}%`, width: item.flight != '' ? `${getthumbWidth(item.counterEnd,item.counterStart)}%` : '0%', visibility: item.flight == '' ? 'hidden' : 'visible' }"
                        @click="handleClick(item)">
                        <div class="slider-label">
                          <span class="item_time start">{{ formatTime(item.counterStart) }}</span>
                          <span class="btw">{{ item.flight }}</span>
                          <span class="item_time end">{{ formatTime(item.counterEnd) }}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="abc">2/VIAGS</p>
          </div>
          <div class="counters">
            <div class="counter" v-for="(counter, index) in chekincounters.countersInAs" :key="index">
              <div class="counter-name" style="width: 7%;">{{ counter.name }}</div>
              <div class="slots">
                <div ref="sliderContainer" class="slider-container">
                    <div class="slider-track"></div>
                    <div v-for="(item, index) in counter.flights" :key="index" class="slider-thumb" 
                    :style="{ left: `${gettimestart(item.counterStart)}%`, width: `${getthumbWidth(item.counterEnd,item.counterStart)}%`, visibility: item.flight == '' ? 'hidden' : 'visible' }"
                    @click="handleClick(item)">
                        <div class="slider-label">
                          <span class="item_time">{{ formatTime(item.counterStart) }}</span>
                          <span class="btw">{{ item.flight }}</span>
                          <span class="item_time">{{ formatTime(item.counterEnd) }}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Checkin B -->
          <div>
            <p class="abc">3/SAGS</p>
          </div>
          <div class="counters">
            <div class="counter" v-for="(counter, index) in chekincounters.countersInBs" :key="index" >
              <div class="counter-name" style="width: 7%;">{{ counter.name }}</div>
              <div class="slots">
                <div ref="sliderContainer" class="slider-container">
                    <div class="slider-track"></div>
                    <div v-for="(item, index) in counter.flights" :key="index" class="slider-thumb" 
                        :style="{ left: `${gettimestart(item.counterStart)}%`, width: item.flight != '' ? `${getthumbWidth(item.counterEnd,item.counterStart)}%` : '0%', visibility: item.flight == '' ? 'hidden' : 'visible' }"
                        @click="handleClick(item)">
                        <div class="slider-label">
                          <span class="item_time start">{{ formatTime(item.counterStart) }}</span>
                          <span class="btw">{{ item.flight }}</span>
                          <span class="item_time end">{{ formatTime(item.counterEnd) }}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="abc">4/MOBILE_CHECK INB</p>
          </div>
          <div class="counters">
            <div class="counter" v-for="(counter, index) in chekincounters.mobileInBs" :key="index">
              <div class="counter-name" style="width: 7%;">{{ counter.name }}</div>
              <div class="slots">
                <div ref="sliderContainer" class="slider-container">
                    <div class="slider-track"></div>
                    <div v-for="(item, index) in counter.flights" :key="index" class="slider-thumb" 
                    :style="{ left: `${gettimestart(item.counterStart)}%`, width: `${getthumbWidth(item.counterEnd,item.counterStart)}%`, visibility: item.flight == '' ? 'hidden' : 'visible' }"
                    @click="handleClick(item)">
                        <div class="slider-label">
                          <span class="item_time">{{ formatTime(item.counterStart) }}</span>
                          <span class="btw">{{ item.flight }}</span>
                          <span class="item_time">{{ formatTime(item.counterEnd) }}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      
    </div>
  </template>


<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { parse, format } from 'date-fns'
  import jQuery from 'jquery';
  import Vue3Datepicker from 'vue3-datepicker';
  import flightInfor from './flightInfor.vue';
  import * as signalR from "@microsoft/signalr";
  
  // const urlHub = 'http://172.17.18.12:8084/dashboardHub';
  // const urlCheckinCounter = 'http://172.17.18.12:8085/api/CheckinCounter/';
  // const urlFlight = 'http://172.17.18.12:8085/api/CheckinCounter';

  const urlHub = 'https://localhost:7079/dashboardHub';
  const urlCheckinCounter = 'https://localhost:7079/api/CheckinCounter/';
  const urlFlight = 'https://localhost:7079/api/CheckinCounter';


  
  const $ = jQuery;
  const position = ref(10);
  const thumbWidth = 13000/1440;
  const propsValue = ref({
    id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
    status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
    aircraft: "", paxCount: "", dailyUpdateStand: "", codeShares:"",
  });
  const FlightData = reactive({
    id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
    status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
  });
  const linetime = reactive({
    hours: [
        '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00',
        '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00', '0:00', '1:00', '2:00', '3:00', '4:00'
      ]
  }
  );
  const menu = reactive({
    titles: [
        'STD', 'ETD', 'ROWFROM', 'ROWTO'
      ]
  }
  );
    // State to keep track of the focused row index
  const focusedIndex = ref<number | null>(null);
  let today = "2024/08/10";

  const chekincounters = reactive({
    mobileInAs: [{
      name: "",
      flights:
      [
        {
          id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
          status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
        },
      ]},],
    countersInAs: [{
      name: "",
      flights:
      [
        {
          id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
          status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
        },
      ]
    },],
    mobileInBs: [{
      name: "",
      flights:
      [
        {
          id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
          status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
        },
      ]},],
    countersInBs: [{
      name: "",
      flights:
      [
        {
          id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
          status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
        },
      ]},],
  });

  const dailyairline = reactive({
    flights: [
    {
      id: "",scheduledDate: "",schedule: "",estimated: "",actual: "",lineCode: "",flight: "",city:"",gate: "",remark: "",
      status: "",rowFrom: "",rowTo: "",checkInCounters: "",counterStart: "",counterEnd: "",gateStart: "",gateEnd: "",
    },
  ]});


  const q = ref('') // giá trị người dùng gõ
// Gom tất cả flights từ 4 nhóm + dailyairline
const allFlights = computed(() => {
  const groups = ['mobileInAs', 'countersInAs', 'mobileInBs', 'countersInBs'] as const
  const fromCheckin = groups.flatMap(g =>
    (chekincounters[g] ?? []).flatMap(gr => gr.flights ?? [])
  )
  const fromDaily = dailyairline.flights ?? []
  return [...fromCheckin, ...fromDaily]
})

// Lọc theo LineCode (không phân biệt hoa thường), gõ tới đâu lọc tới đó
const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return []

  // lọc theo lineCode
  const matched = allFlights.value.filter(
    f => (f.lineCode || '').toLowerCase().includes(s)
  )

  // loại trùng theo key duy nhất
  const unique = Array.from(
    new Map(
      matched.map(f => [
        `${f.lineCode}-${f.flight}-${f.city}`, // key duy nhất
        f
      ])
    ).values()
  )

  return unique.slice(0, 20) // giới hạn số kết quả hiển thị
})

// Tạo biến để lưu trạng thái datetimepicker và ngày được chọn
const selectedDate = ref<Date | null>(null);
const showPicker = ref(false);
const dateFormat = "YYYY-MM-DD HH:mm:ss"; // Định dạng ngày/giờ
let formattedDate = "2024-08-10";

// Biến này sẽ được dùng làm v-model cho datepicker, đảm bảo kiểu dữ liệu đúng
const datePickerValue = computed<Date | undefined>({
  get: () => selectedDate.value ?? undefined,
  set: (value: Date | undefined) => {
    selectedDate.value = value ?? null;
  },
});

// Hàm bật/tắt datetimepicker
const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const openPicker = () => {
  showPicker.value = false;
};

// Hàm xử lý khi chọn ngày mới
const onDateChange = (date: Date | null | undefined) => {
  if (date) {
    dateoftitle.value = formatDateOftitle(date);
    datetitle.value = dateoftitle.value + " - Check-In Counter Allocation";
    formattedDate = formatDate(date);
    today = formatDateToday(date);
    //console.log(today+" "+formattedDate);
    fetchDatanew(formattedDate);
    fetchData(formattedDate, "A");
    fetchDataMa(formattedDate, "MA");
    fetchDataB(formattedDate, "B");
    fetchDataMb(formattedDate, "MB");
    //console.log(formattedDate);
  } else {
    formattedDate = "";
  }
  showPicker.value = false; // Đóng datetimepicker sau khi chọn
};

  const gettimestart = (datetime: string): string => {
  if ((datetime !== "") && (datetime != null)) {
    //console.log("chami"+datetime);
    const dateParts = datetime.split(' ');
    const date = parse(datetime, 'dd/MM/yyyy h:mm:ss a', new Date());
    const hour = parseInt(format(date, 'H'));
    const minute = parseInt(format(date, 'mm'));
    //console.log(hour + " " + hour*60 + minute);
    if (dateParts.length < 2) {
      throw new Error('Invalid datetime format: ' + datetime);
    }
    const scheduleDate = dateParts[0];
    
    //console.log(scheduleDate + " " + today + " " + datetime);
    const parsedDate1 = parse(scheduleDate, 'd/M/yyyy', new Date());
    const parsedDate2 = parse(today, 'd/M/yyyy', new Date());
    // So sánh các giá trị thời gian (timestamp) của hai đối tượng Date
    if (parsedDate1.getTime() === parsedDate2.getTime()) {
      return ((hour * 60 + minute - 300) * 100 / 1440).toString();
    }
    else {
      return ((hour * 60 + minute + 19 * 60) * 100 / 1440).toString();
    }
  } else {
    return "0";
  }
};

const gettimestartnew = (datetime: string): string => {
  if (datetime !== "") 
  {
    const dateParts = datetime.split(' ');
    const date = parse(datetime, 'dd/MM/yyyy h:mm:ss a', new Date())
     // Kiểm tra nếu date không hợp lệ
     if (isNaN(date.getTime())) {
      throw new Error('Invalid datetime format gettimestartnew: ' + datetime);
    }
    const hour = parseInt(format(date, 'H'))
    const minute = parseInt(format(date, 'mm'))
    if (dateParts.length < 2) {
      throw new Error('Invalid datetime format: ' + datetime);
    }
    const scheduleDate = dateParts[0];
    if (hour > 4) {
      return ((hour * 60 + minute - 300 -180) * 100 / 1440).toString();
    } else {
      return ((hour * 60 + minute + 19 * 60 -180) * 100 / 1440).toString();
    }
  } 
  else {
    return "0";
  }
};

  const getthumbWidth = (datetimeend:string, datetimestrart:string) => {
    if((datetimestrart != "" || datetimeend != "") &&(datetimestrart != null && datetimeend != null))
    {
      //const endTime = new Date(datetimeend).getTime();
      const dateend = parse(datetimeend, 'dd/MM/yyyy h:mm:ss a', new Date())
      if (isNaN(dateend.getTime())) {  // Kiểm tra tính hợp lệ
        console.error('Invalid end datetime format getthumbWidth:', datetimeend);
        return 0; // hoặc giá trị hợp lý nào khác
        }
      const hoursend = parseInt(format(dateend, 'H'))
      const minutesend = parseInt(format(dateend, 'mm'))
      const endTime = hoursend*60 + minutesend;
      const datestart =  parse(datetimestrart, 'dd/MM/yyyy h:mm:ss a', new Date())
      if (isNaN(datestart.getTime())) {  // Kiểm tra tính hợp lệ
        console.error('Invalid start datetime format getthumbWidth:', datetimestrart);
        return 0; // hoặc giá trị hợp lý nào khác
        }
      const hours = parseInt(format(datestart, 'H'))
      const minutes = parseInt(format(datestart, 'mm'))
      const endStart = hours*60 + minutes;
      const timeDifference =  (endTime - endStart) > 0 ? (endTime - endStart) : (endTime + 1440 - endStart);
      //console.log(endTime + " " +endStart + " " + timeDifference.toString());
      return timeDifference*100/1440;
    }
    else
    {
      return thumbWidth; //const thumbWidth = ref(13000/1440);
    }
  };

  const fetchDatanew = (data:string) => {
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  fetch(urlCheckinCounter+`${data}`) 
  .then(response => response.json())
  .then(data => {
    
    dailyairline.flights = data;
  })
  .catch(error => {
    console.error(error);
  });
  };


  // Get data by Schedule format"yyyy-mm-dd"
const fetchData = (data:string, local:string) => {
  console.log(data + " " + local);
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  fetch(urlCheckinCounter+`${data}/${local}`) 
  .then(response => response.json())
  .then(data => {
    chekincounters.countersInAs = data;
    
    console.log(chekincounters.countersInAs);
  })
  .catch(error => {
    console.error(error);
  });
};

const updateFlighsdst = (flight:any) => {
  const url = urlFlight;
  fetch(url, 
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // Thay đổi kiểu dữ liệu nếu cần thiết
      // Các tiêu đề khác nếu cần thiết
    },
    body: JSON.stringify(flight) // Dữ liệu cần gửi đi (chuyển thành chuỗi JSON)
  }).then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
    // Xử lý lỗi
  });
};

 const sosanh =(date:string) :boolean  => {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const formattedCurrentDate = formatDate12(currentDate);
  const targetDatePlusOne = new Date(targetDate);
  targetDatePlusOne.setDate(targetDate.getDate() + 1);
  const formattedTargetDatePlusOne = formatDate12(targetDatePlusOne);
  return (formattedCurrentDate === date || formattedCurrentDate === formattedTargetDatePlusOne)
};

// Hàm định dạng ngày thành 'yyyy-MM-dd'
const formatDate12 = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() trả về giá trị từ 0-11, cần +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const numberArray = ref([]);
function handleResult(updatedData:any) {
  numberArray.value = updatedData.checkInCounters.split(',')
      .filter((item: string) => !isNaN(Number(item))) 
      .map(Number);
  if(updatedData.id == "")
  {
  }
  else
  {
    const counters = updatedData.checkInCounters;
    const gatenumber = updatedData.gate;
    const dateinvoke = updatedData.scheduledDate;
    updateFlight(updatedData).then(result => {
    if (result) {
      //console.log('Do sendInvoke:'+ counters +" "+gatenumber);
      if(sosanh(dateinvoke))
        {
          sendInvoke(counters, gatenumber);
        }
      const date = formatDate(parse(updatedData.schedule, 'dd/MM/yyyy h:mm:ss a', new Date()));
      fetchDatanew(formattedDate);
      if(numberArray.value[0] <=27)
      {
        fetchData(formattedDate, "A");
        fetchDataMa(formattedDate, "MA");
      }
      if(numberArray.value[0] >27)
      {
        fetchDataB(formattedDate, "B");
        fetchDataMb(formattedDate, "MB");
      }
      if(numberArray.value.length = 1)
      {
        fetchDatanew(formattedDate);
        fetchData(formattedDate, "A");
        fetchDataMa(formattedDate, "MA");
        fetchDataB(formattedDate, "B");
        fetchDataMb(formattedDate, "MB");
      }
    } else {
      console.log('Cập nhật thất bại.');
    }
    });
  }
};
async function updateFlight(flightData:any) {
  const url = urlFlight;
  console.log(JSON.stringify(flightData));
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(flightData), 
    });
    if (!response.ok) {
      console.error(`Lỗi khi cập nhật: ${response.statusText}`); 
      return false; 
    }
    return true; 
  } catch (error) {
    console.error('Lỗi khi cập nhật dữ liệu:', error); 
    return false; 
  }
};



const fetchDataMa = (data:string, local:string) => {
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  fetch(urlCheckinCounter+`${data}/${local}`)
  .then(response => response.json())
  .then(data => {
    chekincounters.mobileInAs = data;
  })
  .catch(error => {
    console.error(error);
  });
};

const fetchDataB = (data:string, local:string) => {
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  fetch(urlCheckinCounter+`${data}/${local}`)
  .then(response => response.json())
  .then(data => {
    chekincounters.countersInBs = data;
  })
  .catch(error => {
    console.error(error);
  });
};

const fetchDataMb = (data:string, local:string) => {
  const headers = new Headers();
  headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.append('Pragma', 'no-cache');
  headers.append('Expires', '0');
  fetch(urlCheckinCounter+`${data}/${local}`)
  .then(response => response.json())
  .then(data => {
    chekincounters.mobileInBs = data;
  })
  .catch(error => {
    console.error(error);
  });
};

function onInputFocus(field: string, index: number) {
  $('.edit'+index).removeClass('hiden');
  $('.check'+index).addClass('hiden');
};

function onEditClick(index: number) {
  if((dailyairline.flights[index].rowFrom > dailyairline.flights[index].rowTo)&&(dailyairline.flights[index].rowTo != ""))
  {
    alert("RowTo not availble!");
  }else
  {
    $('.check'+index).removeClass('hiden');
    $('.edit'+index).addClass('hiden');
    //console.log(dailyairline.flights[index].rowTo );
  }
};

  // Hàm xử lý sự kiện click
  function handleClick(item: any) {
    console.log('Item được click:', item.counterStart);
    q.value = ''  // clear input
    item.counterStart = item.counterStart == "" ? subtractMinutes(item.schedule, 180) : item.counterStart;
    item.counterEnd = item.counterEnd == "" ? subtractMinutes(item.schedule, 50) : item.counterEnd;
    item.gateStart = item.gateStart == "" ? subtractMinutes(item.schedule, 55) : item.gateStart;
    item.gateEnd = item.gateEnd == "" ? item.schedule : item.gateEnd;
    propsValue.value = item;
  };

  function subtractMinutes(dateString: string, minutes: number): string {
    // Parse the input date string to a Date object
    const [datePart, timePart, period] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    // Adjust hour for AM/PM period
    let hours24 = hour % 12; // Convert 12-hour format to 24-hour format
    if (period === 'PM') {
      hours24 += 12;
    }
    // Create a Date object
    const date = new Date(year, month - 1, day, hours24, minute, second);
    // Subtract minutes
    date.setMinutes(date.getMinutes() - minutes);

    // Format the output back to "MM/DD/YYYY hh:mm:ss AM/PM"
    const newDatePart = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    const newHour = date.getHours();
    const newPeriod = newHour >= 12 ? 'PM' : 'AM';
    const newHour12 = newHour % 12 || 12; // Convert to 12-hour format
    const newMinute = String(date.getMinutes()).padStart(2, '0');
    const newSecond = String(date.getSeconds()).padStart(2, '0');
    return `${newDatePart} ${String(newHour12).padStart(2, '0')}:${newMinute}:${newSecond} ${newPeriod}`;
  }
  // Lắng nghe sự kiện cuộn
  window.addEventListener('scroll', function() {
            const rowheaderA = document.getElementsByClassName('rowheaderA');
            if (window.scrollY > 30) {
                // Nếu cuộn quá 30px thì đặt top về 0px
                $(rowheaderA).removeClass('fixtop5');
                $(rowheaderA).addClass('fixtop0');
                
            } else {
                // Ngược lại đặt lại top về 20px
                $(rowheaderA).removeClass('fixtop0');
                $(rowheaderA).addClass('fixtop5');
                
            }
  });

  //SignR Connect
  const hubConnection = ref<signalR.HubConnection | null>(null);
  const intervalId = ref<number | null>(null);
  const connectHub = async () => {
    hubConnection.value = new signalR.HubConnectionBuilder()
        .withUrl(urlHub)
        .configureLogging(signalR.LogLevel.Information)
        .build();
      hubConnection.value
        .start()
        .then(() => {
          console.log('SignalR connection established');
          //reload();
        })
        .catch((err) => console.error('SignalR Connection failed to start:', err));
      hubConnection.value.onclose(() => {
        console.log('Connection closed');
        startInterval();
      });
  };

  const reconnectHub = async () => {
    hubConnection.value?.start().then(() => {
      console.log("SignalR reconnection");
      if (intervalId.value !== null) {
      clearInterval(intervalId.value);
      intervalId.value = null;}
      //reload();
    }).catch(err => console.error("Signalr ReConnection failed start:", err));
  };

  const startInterval = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
    }
    intervalId.value = window.setInterval(() => {
      reconnectHub();
    }, 30000); // 30 seconds
    };


const sendInvoke=(counters :string , gate :string ) => {
  //console.log('Send ReloadClients:'+ counters );
  if (hubConnection.value) {
    try {
      hubConnection.value.invoke("ReloadClients", counters, gate);
      //console.log('Send ReloadClients:'+ counters);
    } catch (err) {
      console.error('Error invoking ReloadClients:', (err as Error).toString());
    }
  } else {
    console.error('Hub connection is not established.');
  }
};



  // End SignR Connect

const formatDateOftitle = (date: Date): string => {
  // Using Intl.DateTimeFormat to format the date in the desired style
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
  };
// Hàm định dạng Date thành chuỗi theo định dạng mong muốn
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
  };

  const formatDateToday = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    //return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${day}/${month}/${year}`;
  };

  const formatTime = (datetime:string) :string => {
      if((datetime != "")&&(datetime != null) )
      {
          const date1 = parse(datetime, 'dd/MM/yyyy h:mm:ss a', new Date());
          const hour = format(date1, 'H')
          const minute = format(date1, 'mm')
          return hour+":"+minute;
      }
      else
      {
          return "";
      }
      
  };
  const dateoftitle = ref<string>("");
  const datetitle = ref<string>("");
  onBeforeMount(async () => {
    connectHub();
    const date = new Date();
    today = formatDateToday(date);
    dateoftitle.value = formatDateOftitle(date);
    datetitle.value = dateoftitle.value + " - Check-In Counter Allocation";
    formattedDate = formatDate(date);
    chekincounters.countersInAs = [];
    console.log("formatDate(date) - "+formatDate(date));
    fetchDatanew(formatDate(date));
    fetchData(formatDate(date), "A");
    fetchDataMa(formatDate(date), "MA");
    fetchDataB(formatDate(date), "B");
    fetchDataMb(formatDate(date), "MB");
  });
  onUnmounted(() => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
    }
    if (hubConnection.value) {
      hubConnection.value.stop().then(() => {
        console.log('SignalR connection stopped');
      });
    }
  });

  

</script>


<style>

.slider-container {
    position: relative;
    width: 100%; /* 30 đơn vị, mỗi đơn vị là 10px */
    height: 1.5vh; /* Tăng chiều cao để chứa nhãn */
    overflow: hidden;
  }

  span.btw {
    font-weight: 700;
}
  
  .slider-track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    /* background-color: #f1f0f0; */
    transform: translateY(-50%);
    }
  
    .slider-thumb {
    position: absolute;
    top: 50%;
    height: 100%;
    background-color: #007bff;
    transform: translateY(-50%);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #5a5555;
 }

  .slider-label {
    color: white;
    font-size: 16px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

.allocation-container {
  font-family: Arial, sans-serif;
  width: 100%;
  margin: auto;
  padding-bottom: 4vh;
}

.header {
  text-align: center;
  /* margin-bottom: 20px; */
}

.hearderA {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

td.tbltd {
    padding: 0.2rem;
}

.headerfix {
    float: right !important;
    position: fixed;
    right: 0%;
    top: 5%;
}


input.slider-input {
    height: calc(1.7rem + 2px);
    width: 3.5vw;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.datatime.datetime-picker-wrapper {
    height: 30px;
}
.v3dp__datepicker {
    bottom: 30px;
}
.datetime-picker-wrapper {
    height: 30px;
}

.hiden {
    display: none;
}

.fixtop5{
  
    top: 5%;
    z-index: 1000;
    background-color: white;
}

.fixtop0{
    /* position: fixed; */
    position: fixed;
    top: 0%;
    z-index: 1000;
    background-color: white;
}

.search {
    background-color: gray;
    padding: 9px;
    border-radius: 19px;
    margin-left: 18px;
    margin-right: 18px;
    margin-top: 10px;
}

.timeline {
  display: flex;
  justify-content: space-between;
  padding: 0 0px;
  /* background-color: #f5f7f5; */
  /* border-bottom: 1px solid #ccc; */
}

span.item_time {
    color: black;
    font-size: 1.18vh;
}


.counter:nth-child(odd) {
  /*background-color: #121441;  Màu nền cho hàng lẻ */
  background-color: #939598;
}

.counter:nth-child(even) {
  /*background-color: #283b92;  Màu nền cho hàng chẵn */
  background-color: #b1b2b6;
}

p.abc {
  padding: 0 5px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px !important;
  color: black;
  font-size: 20px;
}

.hour {
  flex: 1;
  text-align: center;
  color: black;
  font-weight: 600;
  font-size: 20px;
  padding: 5px 0;
  border-left: 1px solid #5c79a3;
}

.counters {
  display: flex;
  flex-direction: column;
}

.counter {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #5c79a3;
  max-height: 2.7vh;
}

.counter-name {
  width: 100px;
  padding: 10px;
  /* background-color: #e0e0e0; */
  border-right: 1px solid #5c79a3;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  color: black;
}

.slots {
  display: flex;
  flex: 1;
  /* padding: 10px; */
  overflow-x: auto;
}

.slot {
  flex: 1;
  min-width: 60px;
  border-left: 1px solid #ccc;
  position: relative;
  background-color: #f9f9f9;
}

.slot.occupied {
  background-color: #d0e0ff;
}

.flight-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 12px;
}


.SearchBar_inputRow__RQiP9 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2px;

}

img.SearchBar_searchIcon {
    height: 20px;
}

.SearchBar_inputContainer__5pnH0 {
    flex-grow: 1;
    border: 1px solid;
    display: flex;
    align-items: center;
    border-radius: 27px;
}

img.SearchBar_searchIcon {
    padding-left: 10px;
}

input.SearchBar_input__somiR {
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
}

.searchComponent {
    margin-left: 1.3rem;
    margin-right: 1.3rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.searchmain {
    display: flex;
    flex-direction: column;
    padding-left: 0.8rem;
    z-index: 1200;
    position: absolute;
    background-color: #ebebeb;
    width: 86.5%;
    top: 6%;
    border-radius: 8px;
    color: black;
}
</style>
