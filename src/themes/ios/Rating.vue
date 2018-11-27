<template>
	<div class="b__components b-ios b-rating">
		<ul :class="classes">
			<li v-for = "item in listRate" :class="item <= rate ? 'active' : '' " @click="update(item)">
				<i class="fas fa-star" aria-hidden="true" v-show=" item > rate "></i>
				<i class="fas fa-star" aria-hidden="true" v-show=" item <= rate "></i>
			</li>
		</ul>
	</div>
</template>
<script>
	import Rating from './../../components/Rating'
	export default Rating
</script>