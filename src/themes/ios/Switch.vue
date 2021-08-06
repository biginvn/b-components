<template>
  <div checked="" class="b__components b-switch" @click="update()">
    <input
      type="checkbox"
      :name="name"
      :id="id"
      :class="classes"
      :disabled="disabled"
      :checked="isChecked"
    />
    <div class="switch__toggle">
      <div class="switch__handle">
        <div class="switch__touch"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import CheckBox from '../../components/CheckBox'
  export default {
    mixins: [CheckBox],
    computed: {
      classes() {
        return (this.className ? this.className : '') + ' switch__input'
      },
    },
  }
</script>
