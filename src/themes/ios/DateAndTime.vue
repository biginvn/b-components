<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 01/10/2017 -->
<!-- Component: DateAndTime -->

<template>
<!-- 	<div class="b__datetime__picker b__components b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input id='datetimepicker4' :placeholder="placeholder" type="text" ref="bInput" :name="name" :id="id" :class="classes" :disabled="disabled" @input="change($event.target.value)" @blur="onBlur">
			<span class="material-icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>
	</div> -->
	<div class="b__datetime__picker b__components b-float-label">
		<label :class="classLabel">{{ label }}</label>
      	<input id="datetimepicker4" :placeholder="placeholder" type="text" ref="bInput" :name="name" :class="classes" :disabled="disabled">

	</div>
</template>

<script>
	import DateAndTime from './../../components/DateAndTime'
	export default DateAndTime
</script>

<style>

</style>