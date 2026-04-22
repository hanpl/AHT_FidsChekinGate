<template>
    <div class="headerdc">
        <div class="logodc">
            <img class="logoahtdc" src="/img/logo/logo_dit.png" alt="" title="">
        </div>
        <div class="textdc">
            <img class="logoflightdc" src="/img/logo/Icon-Arrival.png" alt="" title="">
            <p class="cl">ARRIVALS</p>
        </div>
        
    </div>
    
</template>

<script setup lang="ts">

</script>

<style>
.headerdc {
    background-color: #121441 !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px 0.5rem;
    height: 8.5vh;
}
.logoahtdc {
    max-height: 100%;
    width: auto;
    vertical-align: middle;
}
.logodc  {
    height: 50%;
    width: 70vw;
    display: flex;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.logoflightdc  {
    height: 100%;
    width: 70vw;
}
.textdc {
    color: white !important;
    font-weight: 100;
    font-size: large;
    margin-right: 9px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 30vw;
    height: 100%;
}
p.cl {
    /* margin-top: 0; */
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    /* height: 100%; */
    color: white;
    font-weight: 700;
    font-size: 4.5vw;
    /* padding-top: 7%; */
}


</style>