<template>
  <div class="weather__info">
    <h3 class="title weather__info__title">Погода в городе {{ cityName }}:</h3>
    <button
        class="weather__info__button"
        title="Добавить город в избранное"
    >
      <svg class="weather__info__icon" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15.39L8.24 17.66L9.23 13.38L5.91 10.5L10.29 10.13L12 6.09L13.71 10.13L18.09 10.5L14.77 13.38L15.76 17.66L12 15.39Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </button>
    <img :src=statusIcon :alt=status>
    <ul class="list">
      <li class="text">{{ status }}</li>
      <li class="text">температура воздуха: <span class="temperature">{{ temp }}°C</span></li>
      <li class="text">ощущается как: <span class="temperature">{{ feelsLike }}°C</span></li>
    </ul>
    <my-button
        @click="$router.push('/details')"
    >
      Подробнее
    </my-button>
  </div>
</template>

<script>
import MyButton from "@/Components/UI/my-button.vue";

export default {
  components: {MyButton},
  props: {
    cityName: {
      type: String,
      required: true
    },
    temp: {
      type: Number,
      required: true
    },
    statusIcon: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    feelsLike: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.weather__info {
  max-width: 600px;
  width: 100%;
  padding: 10px;
  background-color: #E6F2FF;
  border: 2px solid #3A7BD5;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 20px;

  &__title {
    flex: 80%;
    margin: 0;
  }

  &__button {
    padding: 0;
    max-width: 35px;
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>