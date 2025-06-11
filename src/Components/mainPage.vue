<template>
  <div class="main">
    <h1 class="main__title title">Погода всегда под рукой! 🌦️</h1>
    <p class="main__text text">Узнавайте точный прогноз на сегодня и ближайшие дни в удобном формате.
      Текущая температура, осадки, влажность и скорость ветра — всё в одном месте.
      Простой интерфейс, мгновенные обновления и красивые анимации подарят приятный опыт.
      С нашим приложением вы всегда будете готовы к любым капризам природы! ☀️🌧️❄️</p>
    <my-button
        class="main__button button"
        @click="$router.push('/form')"
    >
      Начать!
    </my-button>
  </div>
</template>

<script>
import myButton from "@/Components/UI/my-button.vue";
export default {
  components: {
    myButton
  }
}
</script>

<style lang="scss" scoped>
  .main {

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;


    &__title {
      margin-bottom: 50px;
    }

    &__text {
      margin-bottom: 50px;
    }

    &__button {
      width: 250px;
      height: 70px;
      font-size: 20px;
      border-radius: 10px;
    }
  }
</style>