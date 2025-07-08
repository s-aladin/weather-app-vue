<template>
  <div class="weather__daily__wrapper">
    <div class="weather__daily" v-for="day in currentDailyWeather">
      <h3 class="title weather__daily__title">{{ getWeekDay(day.date) }} {{ day.dateFormatted }}:</h3>
      <img class="weather__daily__image" :src=day.statusIcon :alt=day.status>
      <ul class="list weather__daily__list">
        <li class="text weather__daily__text">{{ day.status }}</li>
        <li class="text weather__daily__text">температура воздуха: <span class="temperature">{{ day.temp }}°C</span></li>
        <li class="text weather__daily__text">ощущается как: <span class="temperature">{{ day.feelsLike }}°C</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters('weatherModule', ['currentDailyWeather', 'getWeekDayFromDate'])
  },
  methods: {
    getWeekDay(date) {
      return this.getWeekDayFromDate(date);
    }
  }
}
</script>

<style lang="scss" scoped>
.weather__daily {
  max-width: 280px;
  width: 100%;
  padding: 5px;
  background-color: #E6F2FF;
  border: 2px solid #3A7BD5;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 5px;

  &__title {
    font-size: 16px;
    flex: 100%;
    margin: 0;
  }

  &__image {
    max-width: 50px;
    width: 100%;
  }

  &__list {
    margin: 0;
  }

  &__text {
    font-size: 14px;
  }
}
</style>