<template>
	<div class="b__components b__combo__box">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<input @input="searchAction($event)" @focus="switchList(true)" :value="searchKeyword" class="search-keywords" @keydown.40="keypressAction('ArrowDown')" @keydown.8="keypressAction('BackSpace')"
		@keydown.38="keypressAction('ArrowUp')" @keydown.13="selectItem(pointerIndex)">
		<ul :class="[{active : isExpanding}, 'list-search']">
			<li v-show = "searchList.length == 0" class="not-found">Not found</li>
			<li class="list-item" :class="{'hover': index == pointerIndex }" v-for = "(item, index) in searchList" @click="toggleItem(item.id)" @mouseover="pointerIndex=index">
				<div class="icon" v-if = "!disableIcon">
					<img :src="item.icon" class="icon-img">
				</div>
				<div class="content" v-html="item.html"></div>
			</li>
		</ul>
	</div>
</template>
<script>
	import Combobox from '../../components/Combobox'
	export default Combobox
</script>
<style>

</style>
