<template>
	<div class="b__components b__multi__select" @mouseleave = "switchList(false)" @click = "switchList(true)">
		<div class="b__multi__select__control">
			<div class="selected" v-for="item in selected">
				<span class="thumb" v-html="item.thumbHtml"></span>
				<span class="close-item" @click = "toggleItem(item.id)"><i class="fa fa-times" aria-hidden="true"></i></span>
			</div>
			<div class="control" @click="toggleList()">
				<i class="fa fa-angle-down" aria-hidden="true" v-show="!isExpanding"></i>
				<i class="fa fa-angle-up" aria-hidden="true" v-show="isExpanding"></i>
			</div>
		</div>

		<ul :class="listClasses">
			<li :class="(value.includes(item.id) ? 'active' : '' ) + ' list-item'" v-for = "item in list" @click="toggleItem(item.id)">
				<div class="icon">
					<img :src="item.icon" alt="" class="icon-img">
				</div>
				<div class="content" v-html="item.html"></div>

			</li>
		</ul>
	</div>
</template>
<script>
	import MultiSelect from './../../components/MultiSelect'
	export default MultiSelect
</script>