<template>
	<div class="b__components b__multi__select" @mouseleave = "switchList(false)" @click = "switchList(true)">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<div class="b__multi__select__control" v-bind:class="{addBorder : isExpanding}">
			<div class="selected" v-if="!isSingle" v-for="item in getSelectedList()">
				<span class="thumb" v-html="item.thumbHtml"></span>
				<span class="close-item" @click = "toggleItem(item.id)"><i class="fa fa-times" aria-hidden="true"></i></span>
			</div>

			<div class="selected single" v-if="isSingle">
				<span class="thumb" v-if = "getSingleSelected()!=null" v-html="getSingleSelected().thumbHtml"></span>
			</div>

			<div class="input-control-wrap" v-if = "!isSingle || getSingleSelected() == null " style="width:100%;">
				<input
				:placeholder="placeholder"
				type="text" 
				style="margin-left: 13px; font-family: 'Open Sans',sans-serif; font-size: 14px; position: absolute; top: 5px; width: 90%" 
				@keydown.40="keypressAction('ArrowDown')" @keydown.8="keypressAction('BackSpace')"
				@keydown.38="keypressAction('ArrowUp')" @keydown.13="searchList.length > 0 && pointerIndex!=null ? toggleItem(searchList[pointerIndex].id) : ''"
				class="input-control" @focus = "focusInputAction($event.target.value)" @input = "searchAction($event.target.value)" :value = "searchKeyword"
				required
				oninvalid="this.setCustomValidity('The query field must not be blank')"
    			oninput="setCustomValidity('')"
			></div>

			<div class="control" @click="toggleList()">
				<i class="fa fa-angle-down" aria-hidden="true" v-show="!isExpanding"></i>
				<i class="fa fa-angle-up" aria-hidden="true" v-show="isExpanding"></i>
			</div>
		</div>

		<ul v-bind:class="[{addBorder : isExpanding}, listClasses]">
			<li v-show = "searchList.length == 0" class="not-found">Not found</li>
			<li class="list-item" :class="{ 'active' : (!isSingle && selected.includes(item.id)) || ( isSingle && selected == item.id ) , 'hover' : index == pointerIndex }" v-for = "(item, index) in searchList" @click="toggleItem(item.id)">
				<div class="icon" v-if = "!disableIcon">
					<img :src="item.icon" class="icon-img">
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
<style scope>
	.addBorder{
		border: 1px solid #0082d5 !important;
	}
</style>