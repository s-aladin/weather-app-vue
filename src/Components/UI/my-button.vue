<template>
  <button class="button"><slot></slot></button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style lang="scss" scoped>
.button {
  max-width: 180px;
  width: 100%;
  border: 1px solid #3A7BD5;
  border-radius: 5px;
  background-color: #E6F2FF;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 5px;
  cursor: pointer;
}
</style>