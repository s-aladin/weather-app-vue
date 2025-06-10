<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

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
  width: 700px;
  height: 360px;
  margin: 200px auto;
  background-color: #FFF;
  border: 5px solid #3A7BD5;
  border-radius: 50px;
  padding: 50px;
}
</style>