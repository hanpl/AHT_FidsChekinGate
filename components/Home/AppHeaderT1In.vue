<template>
    <div class="headerT1">
    <div class="left-section">
        <div class="arrow-block">
        <img src="/img/icon/left.png" alt="direction arrow" class="arrow-img" />
        <span class="distance">210m</span>
        </div>

        <div class="">
        <img src="/img/icon/T1.png" alt="T1" class="icon-img-t1" />
        </div>

        <div class="iconT1 yellow">
        <img src="/img/icon/Airplan1.png" alt="Airplane" class="icon-img" />
        </div>

        <div class="text-block">
        <p class="vn-text">Nối chuyến quốc nội</p>
        <p class="en-text">Domestic transfer</p>
        </div>
    </div>

    <div class="right-section">
        <p class="kr-text" style="font-family: 'tienghan' !important;">국내선 환승</p>
        <p class="cn-text">转机国内航班</p>
    </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style>
@import "@/assets/css/fonttienghan.css";
/* --- Tổng thể header --- */
.headerT1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding: 0 3rem;
  height: 17vh;
  width: 100%;
  box-sizing: border-box;
}

/* --- Bên trái --- */
.left-section {
  display: flex;
  align-items: center;
  gap: 1.5vw;
}

/* --- Khối mũi tên và khoảng cách --- */
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

/* --- Biểu tượng ô vuông vàng --- */
.iconT1 {
  display: flex;
  align-items: center;
  justify-content: center;

}

.iconT1.yellow {
    background-color: #ffd700;
    max-height: 18vh;
    width: auto;
}

.icon-img {
    max-height: 12vh;
    width: auto;
}

.icon-img-t1 {
    max-height: 18vh;
    width: auto;
}

/* --- Khối chữ bên trái --- */
.text-block {
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 15vh;
    justify-content: space-around;
}

.vn-text {
  font-size: 6vh;
  font-weight: 400;
  color: white;
  margin: 0;
}

.en-text {
  font-size: 6vh;
  font-weight: 400;
  color: #ffd700;
  margin: 0;
}

/* --- Bên phải --- */
.right-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 15vh;
    justify-content: space-around;
}

.kr-text,
.cn-text {
  font-size: 5vh;
  font-weight: 400;
  margin: 0;
}


</style>
