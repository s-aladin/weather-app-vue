<template>
  <div>
    <h2 class="title" v-if="isLoading">Загрузка данных...</h2>
    <h2 class="title error" v-else-if="isError">Произошла ошибка! Проверьте правильность введенных данных.</h2>
    <h2 class="title" v-else-if="!weather || weather.temp === null">Здесь отобразятся данные о погоде...</h2>
    <weather-display
        v-else
        :city-id="weather.cityId"
        :city-name="weather.cityName"
        :temp="weather.temp"
        :feels-like="weather.feelsLike"
        :status="weather.status"
        :status-icon="weather.statusIcon"
    />
  </div>
</template>

<script>
import weatherDisplay from "@/Components/weatherDisplay.vue";
export default {
  components: {
    weatherDisplay,
  },
  props: {
    weather: {
      type: Object,
      required: false,
      default: () => ({})
    },
    isError: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>