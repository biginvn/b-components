<template>
	<div class="b__components b__combo__box">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<input @input="searchAction($event)" @blur="blurCombobox($event)" @focus="focusCombobox($event)" :value="searchKeyword" class="search-keywords" @keydown.40="keypressAction('ArrowDown', $event)" @keydown.8="keypressAction('BackSpace', null)"
		@keydown.prevent.38="keypressAction('ArrowUp', $event)" @keydown.13="keypressAction('Enter')">
		<ul :class="[{active : isExpanding}, 'list-search']">
			<li v-show = "searchList.length == 0" class="not-found">Not found</li>
			<li class="list-item" :class="{'hover': index == pointerIndex }" v-for = "(item, index) in searchList" @click="toggleItem(item.id, index)" @mouseover="pointerIndex=index">
				<div class="icon" v-if = "!disableIcon">
					<img :src="item.icon" class="icon-img">
				</div>
				<div class="content" v-html="item.html"></div>
			</li>
		</ul>
		<div class="control" @click="switchList(true)"><i aria-hidden="true" class="fa fa-angle-down"></i> <i aria-hidden="true" class="fa fa-angle-up" style="display: none;"></i></div>
	</div>
</template>
<script>
	import Combobox from '../../components/Combobox'
	export default Combobox
</script>
<style>

</style>
