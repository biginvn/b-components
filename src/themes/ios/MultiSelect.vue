<template>
	<div class="b__components b__multi__select" tabindex="0" @blur = "closeDropdow()" @click = "switchList(true)">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<div class="b__multi__select__control" v-bind:class="{ addBorder : isExpanding, multi: !singleDropdown }">
			<div class="selected" v-if="!isSingle" v-for="item in getSelectedList()">
				<span class="thumb" v-html="item.thumbHtml"></span>
				<span class="close-item" @mousedown = "toggleItem(item.id)"><i class="fa fa-times" aria-hidden="true"></i></span>
			</div>

			<div class="selected single" v-if="isSingle">
				<span 
					class="thumb" 
					v-if="getSingleSelected()!=null"
					v-html="getSingleSelected().thumbHtml"
					@click='editQuery()'	
				>
				</span>
			</div>

			<div class="search" v-if = "!isSingle || getSingleSelected() == null " style="width:100%;">
				<input
				ref="inputSearch"
				v-show="singleDropdown"
				:placeholder="placeholder"
				type="text" 
				
				@keydown.40="keypressAction('ArrowDown')" @keydown.8="keypressAction('BackSpace')"
				@keydown.38="keypressAction('ArrowUp')" @keydown.13="searchList.length > 0 && pointerIndex!=null ? toggleItem(searchList[pointerIndex].id) : ''"
				class="input-control" @focus="focusInputAction($event.target.value);$emit('removeRequired')" @input = "searchAction($event.target.value)" :value = "searchKeyword"
    			@blur='closeDropdow()'
    			onClick="this.select()"
			></div>

			<div :class="isExpanding ? 'iconC iconD' : 'iconC'" @click="toggleList($event)">
			</div>
		</div>
		
		<!-- <input type="hidden" :name="name" :value="value" class="mutiple-select-hidden-value"> -->
		<ul v-bind:class="[{addBorder : isExpanding}, listClasses]">
			<li v-show = "searchList == undefined || searchList.length == 0" class="not-found">Not found</li>
			<li class="list-item" :class="{ 'active' : (!isSingle && selected.includes(item.id)) || ( isSingle && selected == item.id ) , 'hover' : index == pointerIndex }" v-for = "(item, index) in searchList" @mousedown="toggleItem(item.id)">
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
<style>
	.addBorder{
		border: 1px solid #0082d5 !important;
	}
	.b__multi__select__control{
		padding-top: 2px !important;
	}
	.selected{
		margin-left: 3px;
	}

	.iconC::after{
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		position: absolute;
		display: block;
		padding-top: 11px;
		top: 1px;
		right: 6px;
		height: calc(100% - 2px);
		width: 12px;
		color: #74767d;
		z-index: 2;
		content: "\f107";
		font-family: 'Font Awesome 5 Free';
		font-weight: 600;
		font-size: 13px;
	}

	.iconD::after{
		transform: rotate(180deg);
	}

	.multi{
		max-height: 145px !important;
		height: 100% !important;
		overflow: scroll !important;
	}

	.iconC::after{
		content: "\f078";
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        display: block;
        padding-top: 11px;
        top: 1px;
        right: 6px;
        height: calc(100% - 2px);
        width: 12px;
        font-size: 10px;
        color: #74767d;
        z-index: 2;
        content: "\f078";
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
	}
	.iconD::after{
		transform: rotate(180deg);
	}
	.search {
	    display: inline-block;
	    position: relative;
	    /* background-color: #e0e0e0; */
	    padding: 5px 32px 5px 10px;
	    margin-right: 7px;
	    margin-bottom: 5px;
	    border-radius: 15px;
	}
	.search > input {
		border: transparent;
	}
</style>