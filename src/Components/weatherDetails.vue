<template>
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
</template>

<script>
import MyButton from "@/Components/UI/my-button.vue";
import {mapGetters} from "vuex";

export default {
  components: {MyButton},
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
.weather__details {

  &__title {
    position: relative;
    margin-top: 0;
    z-index: 100;
  }

  &__status-icon {
    position: absolute;
    max-width: 130px;
    width: 100%;
    z-index: 1;
    left: 40%;
    opacity: 0.9;
  }

  &__list {
    position: relative;
    z-index: 100;
  }
}
</style>