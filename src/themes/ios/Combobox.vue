<template>
	<div class="b__components b__combo__box "  :class="[{'active-border' : isFocused},{'combo_box_disable': disabled}]">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<div v-show="showResult" class="result" @click="showInputSearch()">
			<div class="icon" v-if = "!disableIcon">
				<img :src="itemResult.icon" class="icon-img">
			</div>
			<div class="content" v-html="itemResult.html"></div>
		</div>
		<input v-show="!showResult" :disabled="disabled" :placeholder="inputPlacehoder" @input="searchAction($event)"
			   @blur="blurCombobox($event)" @focus="focusCombobox($event);$emit('removeRequired')" :value="searchKeyword" class="search-keywords" @keydown.40="keypressAction('ArrowDown', $event)" @keydown.8="keypressAction('BackSpace', null)"
		@keydown.prevent.38="keypressAction('ArrowUp', $event)" @keydown.13="keypressAction('Enter')" 
		>
		<ul :class="[{active : isExpanding}, 'list-search', {'custom-default-select' : styleDefault}, {'active-border' : isFocused}]">
			<li v-show ="searchList.length == 0" class="not-found" v-html="placeholderEmpty"></li>
			<li class="list-item" :class="{'hover': index == pointerIndex }" v-for = "(item, index) in searchList" @click="toggleItem(item.id, index)" @mouseover="pointerIndex=index">
				<div class="icon" v-if = "!disableIcon">
					<img :src="item.icon" class="icon-img">
				</div>
				<div class="content" v-html="item.html"></div>
			</li>
		</ul>
		<div class="control" @click="switchList(true)" :class="[{'control-down':disabled}]"><i aria-hidden="true" class="fa fa-angle-down" ></i> <i aria-hidden="true" class="fa fa-angle-up" style="display: none;"></i></div>
	</div>
</template>
<script>
	import Combobox from '../../components/Combobox'
	export default Combobox
</script>
<style>
.combo_box_disable{
	border:transparent !important;
	cursor: default !important;
}
.control-down{
	display: none;
}
</style>
