<template>
  <nav-bar
    class="navbar__block"
  ></nav-bar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import NavBar from "@/Components/UI/navBar.vue";

  export default {
    components: {NavBar}

  }
</script>

<style lang="scss">

.title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.text{
  font-family: 'Open Sans', sans-serif;
}

.error {
  color: red;
}

.container {
  max-width: 700px;
  width: 100%;
  height: 370px;
  margin: 0 auto;
  background-color: #FFF;
  border: 5px solid #3A7BD5;
  border-radius: 50px;
  padding: 50px;
  overflow: hidden;
}

.temperature {
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
}

.navbar__block {
  margin: 0 auto;
  margin-top: 150px;
}

@media(max-width: 830px) {
  .navbar__block {
    margin-left: 50px;
  }
}
</style>