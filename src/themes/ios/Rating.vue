<template>
  <div class="b__components b-ios b-rating" :class="classDis">
    <ul :class="classes">
      <li v-for="item in listRate" class="active" @click="update(item)">
        <i :class="classStar(item)" aria-hidden="true"></i>
      </li>
    </ul>
  </div>
</template>
<script>
  import Rating from './../../components/Rating'

  export default Rating
</script>
<style scoped>
  .disabled-rating {
    pointer-events: none;
  }
</style>
