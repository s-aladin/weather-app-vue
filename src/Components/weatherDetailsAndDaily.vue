<template>
  <div class="wrapper">
    <div class="weather__details">
      <img class="weather__details__status-icon" :src=this.currentWeather.statusIcon :alt=this.currentWeather.status>
      <h3 class="title weather__details__title">
        Погода в городе {{ this.currentWeather.cityName }}:
      </h3>
      <ul class="list weather__details__list">
        <li class="text">
          {{ this.currentWeather.status }}
        </li>
        <li class="text" v-if='this.currentWeather.fullData.rain !== undefined'>
          осадки: <span class="temperature">
          {{ this.currentWeather.fullData.rain['1h'] }} мм</span>
        </li>
        <li class="text" v-if='this.currentWeather.fullData.snow !== undefined'>
          осадки: <span class="temperature">
          {{ this.currentWeather.fullData.snow['1h'] }} мм</span>
        </li>
        <li class="text">
          температура воздуха: <span class="temperature">{{ this.currentWeather.temp }}°C</span>
        </li>
        <li class="text">
          ощущается как: <span class="temperature">{{ this.currentWeather.feelsLike }}°C</span>
        </li>
        <li class="text">
          ветер: <span class="temperature">
          {{ formatWind(this.currentWeather.fullData.wind.deg) }}
          ({{ this.currentWeather.fullData.wind.speed }} м/с)</span>
        </li>
        <li class="text" v-if='this.currentWeather.fullData.wind.gust !== undefined'>
          порывы ветра: <span class="temperature">
          {{ this.currentWeather.fullData.wind.gust }} м/с</span>
        </li>
        <li class="text">
          влажность: <span class="temperature">{{ this.currentWeather.fullData.main.humidity }}%</span>
        </li>
        <li class="text">
          давление: <span class="temperature">{{ this.currentWeather.fullData.main.pressure }} мм рт.ст.</span>
        </li>
        <li class="text">
          видимость: <span class="temperature">{{ this.currentWeather.fullData.visibility / 1000 }} км</span>
        </li>
        <li class="text">
          рассвет: <span class="temperature">{{ formatTime(this.currentWeather.fullData.sys.sunrise + this.currentWeather.fullData.timezone) }}</span>
        </li>
        <li class="text">
          закат: <span class="temperature">{{ formatTime(this.currentWeather.fullData.sys.sunset + this.currentWeather.fullData.timezone) }}</span>
        </li>
      </ul>
      <my-button
          class="weather__details__button"
          @click="$router.push('/form')">Назад</my-button>
    </div>
    <weather-daily
      class="weather__daily-block"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import MyButton from "@/Components/UI/my-button.vue";
import WeatherDaily from "@/Components/weatherDaily.vue";

export default {
  components: {WeatherDaily, MyButton},
  computed: {
    ...mapGetters('weatherModule', ['currentWeather', 'formatWindDirection', 'formatTimeType'])
  },
  methods: {
    formatTime(unixDate) {
      return this.formatTimeType(unixDate);
    },
    formatWind(deg) {
      return this.formatWindDirection(deg);
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.weather__details {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  &__title {
    position: relative;
    margin-top: 0;
    z-index: 100;
  }

  &__status-icon {
    position: absolute;
    width: 130px;
    height: 130px;
    z-index: 1;
    left: 40%;
    top: 0%;
    opacity: 0.9;
  }

  &__list {
    position: relative;
    z-index: 100;
  }
}

.weather__daily-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}
</style>