<template>
    <div class="b__components b-select" :disabled="disabled">
        <label :for="id" :class="{'active': isActive , 'required' : required}">{{ label }}</label>
        <select :placeholder="placeholder" :name="name" :id="id" :disabled="disabled" @change="update($event.target.value)" v-model="selected" class="b__select_element" :class="{className, 'hyper-link-select-view': isHyperLinkView}">
            <option v-for="item in items" :value="item.value">{{ item.name }}</option>
        </select>
        <span :class="{'show': !isActive, 'required' : required}" class="placeholder">{{ placeholder }}</span>
        <a v-if="isHyperLinkView" class="external-link-select" :href="externalLink" :target="targetBlank ? '_blank' : ''">{{ externalName }}</a>
    </div>
</template>
<script>
import Select from './../../components/Select'
export default Select
</script>
<style scoped>
.required:after {
    content: " *";
    color: red;
}
</style>