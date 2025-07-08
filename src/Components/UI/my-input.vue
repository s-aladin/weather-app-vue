<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: String
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  max-width: 400px;
  width: 100%;
  font-size: 22px;
  border: 1px solid #3A7BD5;
  outline: none;
  border-radius: 5px;
  padding-left: 20px;

  &:focus {
    background-color: #E6F2FF;
    border-bottom: 2px solid #3A7BD5;
  }
}
</style>