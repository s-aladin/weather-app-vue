<template>
  <div class="navbar">
    <my-button
        class="navbar__button button"
        @click="$router.push('/')"
        :class="{ navbar__button_active: $route.path === '/'}"
    >
      Главная
    </my-button>
    <my-button
        class="navbar__button button"
        :class="{ navbar__button_active: $route.path === '/favorites'}"
    >
      Избранное
    </my-button>
    <my-button
        class="navbar__button button"
        @click="$router.push('/form')"
        :class="{ navbar__button_active: $route.path === '/form'}"
    >
      Запрос погоды
    </my-button>
    <my-button
        class="navbar__button button"
        @click="$router.push('/details')"
        :class="{ navbar__button_active: $route.path === '/details'}"
    >
      Детали погоды
    </my-button>
  </div>
</template>

<script>
import MyButton from "@/Components/UI/my-button.vue";

export default {
  components: {MyButton},
}
</script>

<style lang="scss" scoped>
  .navbar {
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;

    &__button {

      background-color: #FFFFFF;
      border-radius: 15px 15px 0 0;
      border-bottom: none;

      &_active {
        border: #3A7BD5 5px solid;
        border-bottom: none;
        box-shadow: 0 10px 0 -5px #FFFFFF;
      }
    }
  }
</style>