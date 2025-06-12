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
        рассвет: <span class="temperature">{{ formatDate(this.currentWeather.fullData.sys.sunrise + this.currentWeather.fullData.timezone) }}</span>
      </li>
      <li class="text">
        закат: <span class="temperature">{{ formatDate(this.currentWeather.fullData.sys.sunset + this.currentWeather.fullData.timezone) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('weatherModule', ['currentWeather'])
  },
  methods: {
    formatDate(unixDate) {

      const date = new Date(unixDate * 1000);

      let seconds = date.getUTCSeconds();
      let minutes = date.getUTCMinutes();
      let hours = date.getUTCHours();

      seconds < 10 ? seconds = '0' + seconds : seconds;
      minutes < 10 ? minutes = '0' + minutes : minutes;
      hours < 10 ? hours = '0' + hours : hours;

      return `${hours}:${minutes}:${seconds}`;
    },
    formatWind(deg) {
      let windDescription = '';
      switch (true) {
        case (0 <= deg && deg <= 11.25):
          windDescription = 'северный';
          break;
        case (11.25 < deg && deg <= 33.75):
          windDescription = 'северный, северо-восточный';
          break;
        case (33.75 < deg && deg <= 56.25):
          windDescription = 'северо-восточный';
          break;
        case (56.25 < deg && deg <= 78.75):
          windDescription = 'восточный, северо-восточный';
          break;
        case (78.75 < deg && deg <= 101.25):
          windDescription = 'восточный';
          break;
        case (101.25 < deg && deg <= 123.75):
          windDescription = 'восточный, юго-восточный';
          break;
        case (123.75 < deg && deg <= 146.25):
          windDescription = 'юго-восточный';
          break;
        case (146.25 < deg && deg <= 168.75):
          windDescription = 'южный, юго-восточный';
          break;
        case (168.75 < deg && deg <= 191.25):
          windDescription = 'южный';
          break;
        case (191.25 < deg && deg <= 213.75):
          windDescription = 'южный, юго-западный';
          break;
        case (213.75 < deg && deg <= 236.25):
          windDescription = 'юго-западный';
          break;
        case (236.25 < deg && deg <= 258.75):
          windDescription = 'западный, юго-западный';
          break;
        case (258.75 < deg && deg <= 281.25):
          windDescription = 'западный';
          break;
        case (281.25 < deg && deg <= 303.75):
          windDescription = 'западный, северо-западный';
          break;
        case (303.75 < deg && deg <= 326.25):
          windDescription = 'северо-западный';
          break;
        case (326.25 < deg && deg <= 348.75):
          windDescription = 'северный, северо-западный';
          break;
        case (348.75 < deg && deg <= 360):
          windDescription = 'северный';
          break;
        default:
          windDescription = 'Ошибка получения данных';
          break;
      }
      return windDescription;
    }
  }
}
</script>

<style lang="scss" scoped>
.weather__details {
  position: relative;

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
</style>