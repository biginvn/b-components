<template>
  <div class="b__components b__loader">
    <div class="b__components b__loader">
      <div class="loader">
        <span class="inner1"></span>
        <span class="inner2"></span>
        <span class="inner3"></span>
      </div>
    </div>
  </div>
</template>
<script></script>
<style>
  .loader {
    display: block;
    width: 5em;
    margin: 10% auto;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: translateY(0%);
    }
    30% {
      -webkit-transform: translateY(-0.25em);
    }
    50% {
      -webkit-transform: translateY(0%);
    }
    70% {
      -webkit-transform: translateY(0.25em);
    }
  }
  .loader {
    display: block;
  }
  .loader .inner1,
  .loader .inner2,
  .loader .inner3 {
    display: inline-block;
    margin: 0.125em;
    width: 0.5em;
    height: 0.5em;
    border: 1px solid lightgray;
    border-radius: 1em;
    background-color: lightgray;
    -webkit-transform-origin: 50%;
    -webkit-animation-duration: 0.75s;
    -webkit-animation-name: rotate;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
  }
  .loader .inner2 {
    -webkit-animation-delay: 0.1875s;
  }
  .loader .inner3 {
    -webkit-animation-delay: 0.375s;
  }
</style>
