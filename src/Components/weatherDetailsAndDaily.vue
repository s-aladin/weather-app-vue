<template>
  <div class="wrapper">
    <weather-details
        class="weather__details-block"
    />
    <weather-daily
        class="weather__daily-block"
    />
  </div>
</template>

<script>
import WeatherDaily from "@/Components/weatherDaily.vue";
import WeatherDetails from "@/Components/weatherDetails.vue";

export default {
  components: {WeatherDetails, WeatherDaily},
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.weather__details-block {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.weather__daily-block {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
}
</style>