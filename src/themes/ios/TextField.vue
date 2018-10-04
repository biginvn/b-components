<template>
 <div class="b__components b-ios b-float-label" :class="classesParent">
  <label :class="classLabel">{{ label }}</label>
  <input 
    :placeholder="placeholder" 
    :type="typeComponent" 
    :min="min" 
    :maxlength="maxLength" 
    ref="bInput" 
    :name="name" 
    :id="id" 
    :class="classes" 
    :value="value" 
    :disabled="disabled"
    :regex="regex"
    @keydown="keyDownRegex"
    @input="change($event.target.value)" 
    @blur="blur" 
    @focus="focus"
    @keyup="keyupEnter"
    @keypress="keyupEnter"
    >
     <slot name="otherElements"></slot>
 </div>
</template>
<script>
  import TextField from './../../components/TextField'
  export default TextField
</script>
