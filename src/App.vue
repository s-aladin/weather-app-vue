<template>
  <div class="weather">
    <h1 class="weather__title title">Добро пожаловать на сайт просмотра погоды!</h1>
    <p class="weather__text text">Введите название города, чтобы запросить информацию о погоде:</p>
    <my-input
        class="weather__input"
        v-model="city"
    />
    <my-button
      class="weather__button"
      @click="fetchWeather"
    >
      Запрос погоды
    </my-button>
    <h2 class="title">Погода в городе {{ city }}:</h2>
    <div class="postItem" v-show="weather.temp !== null">
      <img v-show="weather.temp !== null" :src=weather.statusIcon>
      <ul class="list">
        <li class="text">{{ weather.status }}</li>
        <li class="text">температура воздуха: <span class="temperature">{{ weather.temp }}</span></li>
        <li class="text">ощущается как: <span class="temperature">{{ weather.feelsLike }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyInput from "@/Components/UI/my-input.vue";
import MyButton from "@/Components/UI/my-button.vue";

export default {
  components: {MyButton, MyInput},
  data() {
    return {
      apiKey: '85cc7fd172e4346ef38471324ffc447f',
      city: '',
      weather: {
        temp: null,
        feelsLike: null,
        status: null,
        statusIcon: null
      }
    }
  },
  methods: {
    fetchWeather() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&lang=ru&appid=${this.apiKey}`)
            .then(response => {
              console.log(response)

              this.weather.temp = response.data.main.temp;
              this.weather.feelsLike = response.data.main.feels_like;
              this.weather.status = response.data.weather[0].description;
              this.weather.statusIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            });
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }

  .text{
    font-family: 'Open Sans', sans-serif;
  }

  .weather {
    width: 700px;
    height: 360px;
    margin: 200px auto;
    background-color: #FFF;
    border: 5px solid #3A7BD5;
    border-radius: 50px;
    padding: 50px;

    &__title {
      margin: 0;
      margin-bottom: 15px;
    }

    &__input {
      display: inline-block;
      vertical-align: middle;
    }

    &__button {
      display: inline-block;
      vertical-align: middle;
      margin-left: 20px;
    }

  }

  .postItem {
    width: 600px;
    height: 100px;
    background-color: #E6F2FF;
    border: 2px solid #3A7BD5;
    border-radius: 20px;
    position: center;
    display: flex;
    gap: 20px;
  }

  .temperature {
    font-family: 'Quicksand', sans-serif;
    font-weight: 600;
  }
</style>