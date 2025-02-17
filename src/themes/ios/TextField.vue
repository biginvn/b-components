<template>
  <div
    class="b__components b-ios b-float-label b-input-extend-custom"
    :class="(hasUrl ? 'has-link-view' : '') + (classParent || '')"
  >
    <label :class="[{ required: required }, classLabel]">{{
      label || placeholder
    }}</label>
    <input
      :placeholder="placeholder"
      :type="type"
      :min="min"
      :max="max"
      :maxlength="maxlength"
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
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @keypress="keyupEnter"
      :negative="negative"
    />
    <div v-if="hasUrl" class="link-name-area">
      <a
        class="link-text-name"
        :href="url"
        :target="targetBlank ? '_blank' : ''"
        >{{ value }}</a
      >
    </div>
    <slot name="otherElements"></slot>
  </div>
</template>
<script>
  import TextField from './../../components/TextField'
  export default TextField
</script>
<style scoped>
  .required:after {
    content: ' *';
    color: red;
  }
</style>
