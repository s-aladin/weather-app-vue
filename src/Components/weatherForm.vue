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
        :weather="currentWeather"
    ></weather-block>
  </div>
</template>

<script>
import MyInput from "@/Components/UI/my-input.vue";
import MyButton from "@/Components/UI/my-button.vue";
import weatherBlock from "@/Components/weatherBlock.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {weatherBlock, MyButton, MyInput},
  data() {
    return {
      city: ''
    }
  },
  computed: {
    ...mapGetters('weatherModule', ['currentWeather', 'isLoading', "isError"])
  },
  methods: {
    ...mapActions('weatherModule', ['fetchWeatherData']),

    fetchWeather() {
      this.fetchWeatherData(this.city)
      this.city = '';
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