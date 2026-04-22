<template>
    <Gate v-if="gate" />
    <Checkin v-if="checkin" />
    <SortingArr v-if="sortingArr" />
    <SortingDep v-if="sortingDep" />
    <Arr85 v-if="arr85" />
    <Dep v-if="dep" />
    <DepT1In v-if="depT1In" />
    <DepT1Out v-if="depT1Out" />
    <DepCollins v-if="depCollins" />
    <DepACollins v-if="depACollins" />
    <DepBCollins v-if="depBCollins" />
    <DepDepCollins v-if="depDepCollins" />
    <DepLed v-if="depLed" />
    <Arr v-if="arr" />
    <ArrClaim v-if="arrClaim" />
    <ArrCollins v-if="arrCollins"/>
    <DepArrCollins v-if="deparrCollins"/>
    <Ahtlogo v-if="ahtlogo" />
</template>
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import Gate from './gate.vue';
  import Checkin from './checkin.vue';
  import SortingArr from './SortingArr.vue';
  import SortingDep from './SortingDep.vue';
  import Arr85 from './Arrival85.vue';
  import Dep from './Departures.vue';
  import DepT1In from './DeparturesT1In.vue';
  import DepT1Out from './DeparturesT1Out.vue';
  import DepCollins from './Departures_Collins.vue';
  import DepACollins from './DeparturesA_Collins.vue';
  import DepBCollins from './DeparturesB_Collins.vue';
  import DepDepCollins from './DeparturesDep_Collins.vue';
  import DepLed from './DeparturesLED.vue';
  import Arr from './Arrival.vue';
  import ArrClaim from './ArrivalClaim.vue';
  import ArrCollins from './Arrival_Collins.vue';
  import DepArrCollins from './DepArr_Collins.vue';


  const gate = ref(false);
  const checkin = ref(false);
  const sortingArr = ref(false);
  const sortingDep = ref(false);
  const arr85 = ref(false);
  const dep = ref(false); 
  const depT1In = ref(false); 
  const depT1Out = ref(false); 
  const depCollins = ref(false);
  const depACollins = ref(false);
  const depBCollins = ref(false);
  const depDepCollins = ref(false);
  const depLed = ref(false);
  const arr = ref(false); 
  const arrClaim = ref(false); 
  const arrCollins = ref(false);
  const deparrCollins = ref(false);
  const ahtlogo = ref(false);

  //const ulrCheckDevice = 'http://172.17.18.12:8085/api/FidsLocation';

  const ulrCheckDevice = 'https://localhost:7079/api/FidsLocation';

    const offMode =() => {
     gate.value = false; checkin.value = false; ahtlogo.value = false; depDepCollins.value = false;
     sortingArr.value = false; sortingDep.value = false; arr85.value = false; deparrCollins.value = false;
     dep.value = false; arr.value = false; arrClaim.value = false; depLed.value = false;  depCollins.value = false;
     arrCollins.value = false; depACollins.value = false; depBCollins.value = false; depT1In.value = false; depT1In.value = false
  };


  const fetchFlights = () => {
    fetch(ulrCheckDevice) 
    .then(response => response.json())
    .then(data => {
      console.log("fetch ok !" +data.length);
      if(data.length>0)
      {
        console.log(data[0].description);
        switch (data[0].description.trim()) 
          {
              case 'Checkin':
                  offMode();
                  checkin.value = true;
                  break;
              case 'Gate':
                  offMode();
                  gate.value = true;
                  break;
              case 'SortingDep':
                  offMode();
                  sortingDep.value = true;
                  break;
              case 'SortingArr':
                  offMode();
                  sortingArr.value = true;
                  break;
              case 'Arr85':
                  offMode();
                  arr85.value = true;
                  break;
              case 'Dep':
                  offMode();
                  dep.value = true;
                  break;
              case 'DepT1In':
                  offMode();
                  depT1In.value = true;
                  break;
              case 'DepT1Out':
                  offMode();
                  depT1Out.value = true;
                  break;
              case 'DepCollins':
                  offMode();
                  depCollins.value = true;
                  break;
              case 'DepACollins':
                  offMode();
                  depACollins.value = true;
                  break;
              case 'DepBCollins':
                  offMode();
                  depBCollins.value = true;
                  break;
              case 'DepDepCollins':
                  offMode();
                  depDepCollins.value = true;
                  break;
              case 'ArrCollins':
                  offMode();
                  arrCollins.value = true;
                  break;
              case 'DepLed':
                  offMode();
                  depLed.value = true;
                  break;
              case 'Arr':
                  offMode();
                  arr.value = true;
                  break;
              case 'ArrClaim':
                  offMode();
                  arrClaim.value = true;
                  break;
              case 'DepArrCollins':
                  offMode();
                  deparrCollins.value = true;
                  break;
              default:
                  offMode();
                  ahtlogo.value = true;
                  break;
          }
      }
      else
      {
        gate.value = false; checkin.value = false; ahtlogo.value = false;
        ahtlogo.value = true;
      }

    })
    .catch(error => {
      console.error(error);
    });
  };

  onMounted(async () => {
    fetchFlights(); 
  });

  </script>
  
  <style scoped>

  </style>
  