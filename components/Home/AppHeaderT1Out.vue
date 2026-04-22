<template>
    <div class="headerT1">
      <div class="right-section">
       <p class="kr-text" style="font-family: 'tienghan' !important;">국내선 환승</p>
       <p class="cn-text">转机国内航班</p>
      </div>
     <div class="left-section">
        <div class="text-block-out">
          <p class="vn-text">Nối chuyến quốc nội</p>
          <p class="en-text">Domestic transfer</p>
        </div>
        <div class="iconT1 yellow">
          <img src="/img/icon/Airplan1.png" alt="Airplane" class="icon-img" />
        </div>
        <div class="">
          <img src="/img/icon/T1.png" alt="T1" class="icon-img-t1" />
        </div>
        <div class="arrow-block">
          <img src="/img/icon/right.png" alt="direction arrow" class="arrow-img" />
          <span class="distance">170m</span>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style>
@import "@/assets/css/fonttienghan.css";
.arrow-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 15vh;
    justify-content: space-around;
}

.arrow-img {
  height: 7.5vh;
  transition: all 0.3s ease;
}

.distance {
  color: white;
  font-size: 4.5vh;
  padding-top: 0;
}

.text-block-out {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    height: 15vh;
    justify-content: space-around;
    align-items: flex-end;
}

</style>
