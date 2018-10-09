<template>
	<div class="b__components b-select">
		<label :for="id" :class="isActive ? 'active' : '' ">{{ label }}</label>
		<select :placeholder="placeholder" :name="name" :id="id" :disabled="disabled" @change="update($event.target.value)" v-model="selected" :class="(isHyperLinkView ? 'hyper-link-select-view' : '') + (className?className:'') + ' b__select_element'">
			<option v-for="item in items" :value="item.value">{{ item.name }}</option>
		</select>
		<span :class=" isActive ? 'placeholder' : 'placeholder show' ">{{ placeholder }}</span>
		<a v-if="isHyperLinkView" class="external-link-select" :href="externalLink" :target="targetBlank ? '_blank' : ''">{{ externalName }}</a>
	</div>
</template>
<script>
    import Select from './../../components/Select'
    export default Select
</script>
