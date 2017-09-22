<template>
	<div class="b__components b__multi__select" @mouseleave = "switchList(false)" @click = "switchList(true)">
		<div class="b__multi__select__control">
			<div class="selected" v-for="item in getSelectedList()">
				<span class="thumb" v-html="item.thumbHtml"></span>
				<span class="close-item" @click = "toggleItem(item.id)"><i class="fa fa-times" aria-hidden="true"></i></span>
			</div>
			<div class="input-control-wrap"><input type="text" class="input-control" @focus = "focusInputAction($event.target.value)" @input = "searchAction($event.target.value)" :value = "searchKeyword"></div>
			<div class="control" @click="toggleList()">
				<i class="fa fa-angle-down" aria-hidden="true" v-show="!isExpanding"></i>
				<i class="fa fa-angle-up" aria-hidden="true" v-show="isExpanding"></i>
			</div>
		</div>

		<ul :class="listClasses">
			<li v-show = "searchList.length == 0" class="not-found">Not found</li>
			<li :class="(selected.includes(item.id) ? 'active' : '' ) + ' list-item'" v-for = "item in searchList" @click="toggleItem(item.id)">
				<div class="icon">
					<img :src="item.icon" :alt="item.id" class="icon-img">
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