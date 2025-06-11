<template>
  <div class="weather__details">
    <h3 class="title weather__details__title">Погода в городе {{ this.currentWeather.cityName }}:</h3>
    <img :src=this.currentWeather.statusIcon :alt=this.currentWeather.status>
    <ul class="list">
      <li class="text">{{ this.currentWeather.status }}</li>
      <li class="text">температура воздуха: <span class="temperature">{{ this.currentWeather.temp }}°C</span></li>
      <li class="text">ощущается как: <span class="temperature">{{ this.currentWeather.feelsLike }}°C</span></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('weatherModule', ['currentWeather'])
  }
}
</script>

<style lang="scss" scoped>

</style>