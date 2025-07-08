<template>
  <div
      class="no-weather"
      v-if="this.currentWeather.cityName === null"
  >
    <h1 class="no-weather__title title">Чтобы получить данные о погоде, введите названия города в форму запроса погоды!
      ❄️🌫️☕</h1>
  </div>
  <div
      class="wrapper"
      v-else
  >
    <weather-details
        class="weather__details-block"
    />
    <weather-daily
        class="weather__daily-block"
    />
  </div>
</template>

<script>
import WeatherDaily from "@/Components/weatherDaily.vue";
import WeatherDetails from "@/Components/weatherDetails.vue";
import {mapGetters} from "vuex";

export default {
  components: {WeatherDetails, WeatherDaily},
  computed: {
    ...mapGetters('weatherModule', ['currentWeather'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.weather__details-block {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.weather__daily-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}

.no-weather {
  margin-top: 100px;
}
</style>