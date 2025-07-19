<template>
  <div class="favorites__empty" v-if="favorites.length === 0">
    <h1 class="favorites__empty__title title">Тут пока пусто... ☁️🌧️🌙</h1>
    <p class="favorites__empty__text text">Чтобы город появился в разделе "Избранное", просто добавьте его туда!</p>
  </div>
  <div class="favorites__wrapper" v-else>
    <weather-display
        class="favorites__item"
        v-for="city in favorites"
        :feels-like="city.feelsLike"
        :status="city.status"
        :status-icon="city.statusIcon"
        :temp="city.temp"
        :city-name="city.cityName"
        :city-id="city.cityId"/>
  </div>
</template>

<script>
import WeatherDisplay from "@/Components/weatherDisplay.vue";
import {mapGetters} from "vuex";
export default {
  components: {WeatherDisplay},
  computed: {
    ...mapGetters("weatherModule", ["favorites"])
  }

}
</script>

<style lang="scss" scoped>
  .favorites__wrapper {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    max-height: 400px;
    overflow-y: auto;
  }

  .favorites__empty {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
</style>