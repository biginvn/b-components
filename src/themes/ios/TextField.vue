<template>
 <div class="b__components b-ios b-float-label b-input-extend-custom" :class="(hasUrl ? 'has-link-view' : '') + classesParent">
  <label :class="classLabel">{{ label }}</label>
  <input
    :placeholder="placeholder" 
    :type="typeComponent" 
    :min="min" 
    :maxlength="maxLength()" 
    ref="bInput" 
    :name="name"
    :id="id" 
    :class="classes" 
    :value="value" 
    :disabled="disabled"
    :regex="regex"
    :url="url"
    :autocomplete="autocomplete"
    @keydown="keyDownRegex"
    @input="change($event.target.value)" 
    @blur="blur" 
    @focus="focus"
    @keypress="keyupEnter"
    :negative="negative"
    >
  <div v-if="hasUrl" class="link-name-area">
   <a class="link-text-name" :href="url" :target="targetBlank ? '_blank' : ''">{{ value }}</a>
  </div>
  <slot name="otherElements"></slot>
 </div>
</template>
<script>
  import TextField from './../../components/TextField'
  export default TextField
</script>
