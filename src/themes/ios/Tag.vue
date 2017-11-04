<template>
	<div class=" b-float-label">
		<div class="b__component_input_tag_wrapper ">
			<label :class="classLabel">Input tag </label>
			<span v-for="(tag,index) in tags" v-bind:key="index" class="b__component_input_tag">
				<span>{{tag}} </span>
				<a @click.prevent.stop="remove(index)" class="remove"></a>
			</span>
			
			<input type="text" :value="value" name="input__tag" :placeholder="placeholder" v-model="newTag" class="new_tag" v-on:keydown.delete.stop="removeLastTag()" v-on:keydown.enter.188.tab.prevent.stop="addNewTag(newTag)">
		</div>
	</div>
</template>

<script>
	import InputTag from './../../components/Tag'
	export default InputTag
</script>