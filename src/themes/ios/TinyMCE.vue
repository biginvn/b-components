<template>
  <div class="b__components b__tinymcev4 b-float-label b__input loading-tiny">
    <label :class="classLabel">{{ label }}</label>
    <textarea :id="id"></textarea>
  </div>
</template>
<script>
  import TinyMCE from './../../components/TinyMCE'
  export default TinyMCE
</script>
