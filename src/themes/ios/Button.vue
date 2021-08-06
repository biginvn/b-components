<template>
  <div class="b__components b__button">
    <button
      :type="type"
      :class="classes"
      :disabled="disabled"
      :id="id"
      :name="name"
      v-html="labelHtml"
      @click="animate()"
    ></button>
  </div>
</template>
<script>
  import Button from './../../components/Button'
  export default Button
</script>
