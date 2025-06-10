<template>
  <div>
    <h1 class="form__title title">Добро пожаловать на сайт просмотра погоды!</h1>
    <p class="form__text text">Введите название города, чтобы запросить информацию о погоде:</p>
    <my-input
        class="form__input"
        placeholder="Введите город"
        v-model="city"
        @keyup.enter="fetchWeather"
    />
    <my-button
        class="form__button"
        @click="fetchWeather"
    >
      Запрос погоды
    </my-button>
    <weather-block
        class="form__data"
        :is-loading="isLoading"
        :is-error="isError"
        :weather="weather"
    ></weather-block>
  </div>
</template>

<script>
import axios from "axios";
import MyInput from "@/Components/UI/my-input.vue";
import MyButton from "@/Components/UI/my-button.vue";
import weatherBlock from "@/Components/weatherBlock.vue";

export default {
  components: {weatherBlock, MyButton, MyInput},
  data() {
    return {
      apiKey: '85cc7fd172e4346ef38471324ffc447f',
      city: '',
      isError: false,
      isLoading: false,
      weather: {
        cityName: null,
        temp: null,
        feelsLike: null,
        status: null,
        statusIcon: null
      }
    }
  },
  methods: {
    fetchWeather() {
      if(!this.city.trim()) return;

      this.resetWeather();

      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: this.city,
          units: 'metric',
          lang: 'ru',
          appid: this.apiKey
        }
      })

          .then(response => {
            console.log(response)

            this.updateWeather(response.data);
            this.city = '';
          })
          .catch(error => {
            console.log(error);
            this.isError = true;
          })
          .finally(() => {
            this.isLoading = false
          })
    },
    resetWeather() {
      this.isError = false;
      this.isLoading = true;

      for(const prop in this.weather) {
        this.weather[prop] = null;
      }
    },
    updateWeather(data) {
      this.weather.cityName = data.name;
      this.weather.temp = Math.round(data.main.temp);
      this.weather.feelsLike = Math.round(data.main.feels_like);
      this.weather.status = data.weather[0].description;
      this.weather.statusIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
  }
}
</script>

<style lang="scss" scoped>
.form {

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

  &__data {
    margin-top: 30px;
  }

}
</style>