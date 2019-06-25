<template>
    <div class="autocomplete">
        <label :for="id">{{label}}</label>
        <textarea v-if="textarea" :splitCharacter="splitCharacter" :id="id" :rows="rows" :cols="cols" class="autocomplete-input" :placeholder="placeholder" @focusout="focusout" @focus="focus" @keydown.13="chooseItem" @keydown.tab="chooseItem" @keydown.40="moveDown" @keydown.38="moveUp" v-model="inputValue"
                  type="text"></textarea>
        <input v-else :id="id" class="autocomplete-input" :placeholder="placeholder" @focusout="focusout" @focus="focus" @keydown.13="chooseItem" @keydown.tab="chooseItem" @keydown.40="moveDown" @keydown.38="moveUp" v-model="inputValue" type="text">
        <ul :class="{
        'autocomplete-list': true,
        [id+'-list']: true
      }" v-if="searchMatch.length > 0">
            <li :class="{active: selectedIndex === index}" v-for="(result, index) in searchMatch" @click="selectItem(index), chooseItem()" v-html="highlightWord(result)">

            </li>
        </ul>
    </div>
</template>

<script>
    import BAutoComplete from './../../components/BAutoComplete'
    export default BAutoComplete
</script>

<style scoped>
</style>