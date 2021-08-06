<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 01/10/2017 -->
<!-- Component: DateAndTime -->
<template>
  <div class="b__datetime__picker b__components b-float-label">
    <label :class="[{ required: required }, classLabel]">{{ label }}</label>
    <input
      @click="$emit('clickCon')"
      :id="id"
      :placeholder="placeholder"
      type="text"
      ref="bInput"
      :name="name"
      :class="classes"
      :disabled="disabled"
      @change="checkInputInvalid($event.target.value)"
      @blur="resetError()"
    />
  </div>
</template>
<script>
  import DateAndTime from './../../components/DateAndTime'
  export default DateAndTime
</script>
<style scoped>
  .required:after {
    content: ' *';
    color: red;
  }
</style>
