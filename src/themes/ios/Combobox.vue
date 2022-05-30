<template>
  <div
    class="b__components b__combo__box"
    :id="id"
    :class="[{ 'active-border': isFocused }, { combo_box_disable: disabled }]"
    :null-placeholder="nullPlaceholder"
    :org-placeholder="orgPlaceholder"
  >
    <label :for="id" :class="isActive ? 'active' : ''">{{
      label.toUpperCase()
    }}<slot name="append-label"></slot></label>
    <div
      v-show="showResult && isShowHtmlResult"
      class="result"
      @click="showInputSearch()"
    >
      <a
        v-if="hasUrl && itemResult.url"
        :href="itemResult.url"
        target="_blank"
        class="url-item-combobox item-result-combobox"
      >
        <div class="icon" v-if="!disableIcon">
          <img :src="itemResult.icon" class="icon-img" />
        </div>
        <div class="content" v-html="itemResult.html"></div>
      </a>
      <div v-else class="item-result-combobox">
        <div class="icon" v-if="!disableIcon">
          <img :src="itemResult.icon" class="icon-img" />
        </div>
        <div class="content" v-html="itemResult.html"></div>
      </div>
    </div>

    <!--remove action key down backspace: @keydown.8="keypressAction('BackSpace', null)" -->
    <input
      :ref="'input-search-' + id"
      v-show="showInputSearchCombobox"
      :disabled="disabled"
      autocomplete="off"
      :placeholder="inputPlacehoder"
      :null-placeholder="nullPlaceholder"
      :org-placeholder="orgPlaceholder"
      @input="searchAction($event)"
      :id="'input-' + id"
      @blur="blurCombobox($event)"
      @focus="
        focusCombobox($event)
        $emit('removeRequired')
      "
      :value="searchKeyword"
      class="search-keywords input__combobox"
      @keydown.40="keypressAction('ArrowDown', $event)"
      @keydown.8="keypressAction('BackSpace', null)"
      @keydown.prevent.38="keypressAction('ArrowUp', $event)"
      @keydown.13="keypressAction('Enter')"
    />
    <ul
      :class="[
        { active: isExpanding },
        'list-search',
        { 'custom-default-select': styleDefault },
        { 'active-border': isFocused },
      ]"
    >
      <li
        v-show="searchList.length == 0"
        class="not-found"
        v-html="placeholderEmpty"
      ></li>
      <li
        class="list-item"
        :class="{ hover: index == pointerIndex }"
        v-for="(item, index) in searchList"
        @click="toggleItem(item.id, index)"
        @mouseover="pointerIndex = index"
      >
        <div class="icon" v-if="!disableIcon">
          <img :src="item.icon" class="icon-img" />
        </div>
        <div class="content" v-html="item.html"></div>
      </li>
    </ul>
    <div
      tabindex="0"
      @blur="blurCombobox($event)"
      class="control"
      @click="toggleArrowDropdown()"
      :class="[{ 'control-down': disabled }]"
    >
      <i aria-hidden="true" class="fa fa-angle-down"></i>
      <i aria-hidden="true" class="fa fa-angle-up" style="display: none"></i>
    </div>
  </div>
</template>
<script>
  import Combobox from '../../components/Combobox'
  export default Combobox
</script>
<style>
  .combo_box_disable {
    border: transparent !important;
    cursor: default !important;
  }
  .control-down {
    display: none;
  }
</style>
<!-- test push -->
