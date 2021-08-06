<template>
  <div class="b__components b-rating-gt">
    <div class="stars" v-for="item in stringToArray(stars)">
      <input
        class="star"
        :id="item"
        type="radio"
        name="star"
        :checked="item == value ? true : false"
        @click="showName(item)"
      />
      <label class="star" for=""></label>
    </div>
    ss
  </div>
</template>
<script>
  export default {
    props: ['stars', 'checked', 'value'],
    methods: {
      stringToArray(stars) {
        var array = []
        for (var i = 1; i <= stars; i++) {
          array.push(i)
        }
        return array
      },
      showName(item) {
        this.$emit('input', item)
      },
    },
  }
</script>
