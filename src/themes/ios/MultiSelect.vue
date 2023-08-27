<template>
  <div
    class="b__components b__multi__select"
    tabindex="0"
    @blur="closeDropdow()"
    @click="switchList(true)"
  >
    <span class="placeholder show" v-if="!isActive && !isSingle">{{
      placeholder
    }}</span>
    <label :for="id" :class="[{ required: required }, { active: isActive }]">{{
      label
    }}</label>
    <div
      class="b__multi__select__control"
      v-bind:class="{ addBorder: isExpanding, multi: !singleDropdown }"
    >
      <div class="selected" v-if="!isSingle" v-for="item in getSelectedList()">
        <span class="thumb" v-html="item.thumbHtml"></span>
        <span class="close-item" @click="toggleItem(item.id)"
          ><i class="fas fa-times" aria-hidden="true"></i
        ></span>
      </div>
      <div class="selected single" v-if="isSingle">
        <span
          class="thumb"
          v-if="getSingleSelected() != null"
          v-html="getSingleSelected().thumbHtml"
          @click="editQuery()"
        >
        </span>
      </div>
      <div
        class="input-control-wrap"
        v-if="isSingle && getSingleSelected() == null"
        style="width: 100%"
      >
        <input
          ref="inputSearch"
          v-show="singleDropdown"
          :placeholder="placeholder"
          type="text"
          style="
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            position: absolute;
            top: 5px;
            left: 10px;
            width: 90%;
          "
          @keydown.40="keypressAction('ArrowDown')"
          @keydown.8="keypressAction('BackSpace')"
          @keydown.38="keypressAction('ArrowUp')"
          @keydown.13="
            searchList.length > 0 && pointerIndex != null
              ? toggleItem(searchList[pointerIndex].id)
              : ''
          "
          class="input-control"
          @focus="
            focusInputAction($event.target.value)
            $emit('removeRequired')
          "
          @input="searchAction($event.target.value)"
          :value="searchKeyword"
          @blur="closeDropdow()"
          onClick="this.select()"
          autocomplete="new-password"
        />
      </div>
      <div
        :class="isExpanding ? 'iconC iconD' : 'iconC'"
        @click="toggleList($event)"
      ></div>
    </div>
    <div
      class="dropdown-main"
      v-bind:class="[{ addBorder: isExpanding }, listClasses]"
    >
      <div class="input-control-wrap" style="width: 100%" v-if="!isSingle">
        <input
          ref="inputSearch"
          :placeholder="placeholder"
          type="text"
          @keydown.40="keypressAction('ArrowDown')"
          @keydown.38="keypressAction('ArrowUp')"
          @keydown.13="
            searchList.length > 0 && pointerIndex != null
              ? toggleItem(searchList[pointerIndex].id)
              : ''
          "
          class="form-control input-control"
          @focus="
            focusInputAction($event.target.value)
            $emit('removeRequired')
          "
          @input="searchAction($event.target.value)"
          :value="searchKeyword"
          @blur="closeDropdow()"
          onClick="this.select()"
          autocomplete="new-password"
        />
      </div>
      <ul class="b__multi__select__list">
        <li
          v-show="searchList == undefined || searchList.length == 0"
          class="not-found"
        >
          {{ textTranslate.not_found }}
        </li>
        <li
          @mousedown="selectAll()"
          v-show="
            hasSelectAll &&
            !isSingle &&
            searchList != undefined &&
            searchList.length != 0
          "
          class="list-item select-all-option"
        >
          {{ textTranslate.all_service }}
        </li>
        <li
          v-for="(item, index) in searchList"
          class="list-item"
          :class="{
            active:
              (!isSingle && selected.includes(parseInt(item.id))) ||
              (isSingle && selected == parseInt(item.id)),
            hover: index == pointerIndex,
            'main-vendor': item.main_vendor,
            disabled: item.disabled,
          }"
          @mousedown="toggleItem(item.id)"
        >
          <div class="icon" v-if="!disableIcon">
            <img :src="item.icon" class="icon-img" />
          </div>
          <div class="content" v-html="item.html"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import MultiSelect from './../../components/MultiSelect'
  export default MultiSelect
</script>
<style>
  .required:after {
    content: ' *';
    color: red;
  }

  .dropdown-main .input-control-wrap + ul {
    padding-top: 40px;
  }

  .addBorder {
    border: 1px solid #0082d5;
  }

  .b__multi__select__control {
    padding-top: 2px !important;
  }

  .b__multi__select__control.multi {
    padding-top: 8px !important;
  }

  .selected {
    margin-left: 3px;
  }

  .iconC::after {
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
    content: '\f107';
    font-family: 'Font Awesome 5 Free';
    font-weight: 600;
    font-size: 13px;
  }

  .iconD::after {
    transform: rotate(180deg);
  }

  .multi {
    /*max-height: 145px !important;*/
    height: 100% !important;
    /*overflow: scroll !important;*/
  }

  .iconC::after {
    content: '\f078';
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
    content: '\f078';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  .iconD::after {
    transform: rotate(180deg);
  }

  .b__multi__select.select-disabled .iconC {
    display: none;
  }

  .b__multi__select.select-disabled {
    border: none;
  }

  .b__components.b__multi__select.select-disabled
    .b__multi__select__control.multi {
    border: 1px solid #dfdfdf !important;
  }

  .b__components.b__multi__select.select-disabled
    .b__multi__select__control
    .selected {
    padding: 5px 10px 5px 10px;
  }

  .b__components.b__multi__select.select-disabled
    .b__multi__select__control
    .selected
    .close-item {
    display: none;
  }
</style>
