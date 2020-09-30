<template>
    <div :class="{'has-error': error}" class="b__components b-ios b-float-label b__numeric">
        <label :class="[{ required : required }, classLabel]">{{ label }}</label>
        <input type="text" :class="classes" @keypress="keypress" @keyup="keyup" @blur="blur($event.target.value)" @focus="focus()" :value="mask" :placeholder="placeholder" :disabled="disabled" @input="updateInput($event.target.value)">
    </div>
</template>
<script>
import NumbericFormatted from './../../components/NumericFormatted'
export default NumbericFormatted
</script>
<style scoped>
.required:after {
    content: " *";
    color: red;
}
</style>