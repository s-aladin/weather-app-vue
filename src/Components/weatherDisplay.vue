<template>
  <div class="weather__info">
    <h3 class="title weather__info__title">Погода в городе {{ cityName }}:</h3>
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
  width: 600px;
  height: 130px;
  padding: 10px;
  background-color: #E6F2FF;
  border: 2px solid #3A7BD5;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 20px;

  &__title {
    flex: 100%;
    margin: 0;
  }
}
</style>