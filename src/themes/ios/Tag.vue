<template>
	<div class=" b-float-label">
		
		<div class="b__components b__component_input_tag_wrapper ">
			<label :class="classLabel">{{ label }}</label>
			<span v-for="(tag,index) in tags" class="b__component_input_tag">
				<span>{{ tag }}</span>
				<a @click.prevent.stop="remove(index)" class="remove"></a>
			</span>
			<input type="text" :id="id" :disabled="disabled" name="input__tag" :placeholder="tagPlaceholder" v-model="newTag" class="new_tag" v-on:keydown.delete.stop="removeLastTag()" v-on:keydown.enter.188.tab.prevent.stop="addNewTag(newTag)"  v-on:keyup.enter.188.tab.prevent.stop="onPaste(newTag)" @change="onPaste(newTag)">
		</div>
	</div>
</template>

<script>
	import InputTag from './../../components/Tag'
	export default InputTag
</script>