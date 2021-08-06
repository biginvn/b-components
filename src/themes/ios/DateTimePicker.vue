<template>
  <div class="b__datetime__picker b__components b-float-label">
    <label :class="classLabel">{{ label }}</label>
    <input
      :placeholder="placeholder"
      type="text"
      ref="bInput"
      :name="name"
      :id="id"
      :class="classes"
      :disabled="disabled"
      @input="change($event.target.value)"
      @blur="onBlur"
    />
    <a class="c-datepicker-btn" @click="togglePicker">
      <span class="material-icon"
        ><i class="fa fa-calendar" aria-hidden="true"></i
      ></span>
    </a>
  </div>
</template>
<script>
  import DateTimePicker from './../../components/DateTimePicker'
  import '../../plugins/material-datetime-picker/material-datetime-picker.css'
  export default DateTimePicker
</script>

<style>
  .c-datepicker {
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    z-index: 1;
  }
  .c-datepicker__clock__hours,
  .c-datepicker__clock__minutes {
    position: relative;
  }
  .c-datepicker__header-date {
    height: 182px;
  }
  .c-scrim--shown {
    z-index: 1;
  }
  .c-datepicker-btn {
    cursor: pointer;
  }
  .c-datepicker__day--selected::after {
    background-color: rgb(1, 188, 212);
    z-index: -1;
  }
  .c-datepicker__day--selected.c-datepicker__day-body {
    color: #fff;
  }
</style>
