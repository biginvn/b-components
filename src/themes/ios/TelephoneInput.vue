<template>
  <div
    class="b-tel-input b__components b-ios b-float-label b-input-extend-custom"
    :class="classesParent"
    :id="idParent"
  >
    <label :class="classLabel">{{ label }}</label>
    <ul v-show="open" ref="list">
      <li
        class="dropdown-item"
        v-for="(pb, index) in sortedCountries"
        :key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
        @click="choose(pb)"
        :class="getItemClass(index, pb.iso2)"
        @mousemove="selectedIndex = index"
      >
        <div
          class="iti-flag"
          v-if="enabledFlags"
          :class="pb.iso2.toLowerCase()"
        ></div>
        <strong>{{ pb.name }}</strong>
        <span>+{{ pb.dialCode }}</span>
      </li>
    </ul>
    <div
      class="dropdown"
      @click="toggleDropdown"
      v-click-outside="clickedOutside"
      :class="{ open: open }"
      @keydown="keyboardNav"
      tabindex="0"
      @keydown.esc="reset"
    >
      <span class="selection">
        <div
          class="iti-flag"
          v-if="enabledFlags"
          :class="activeCountry.iso2.toLowerCase()"
        ></div>
        <span class="b-code">{{ activeCountry.iso2 }}</span>
        <span class="dropdown-arrow">{{ open ? '▲' : '▼' }}</span>
      </span>
    </div>
    <input
      ref="input"
      v-model="phone"
      type="tel"
      :placeholder="placeholder"
      :state="state"
      :disabled="disabled"
      @blur="onBlur"
      @input="onInput"
      :required="required"
      @keydown="keyDownPress"
      @keyup="keyUpPress"
      class="b__input uiFirefox b-telephone-input"
    />
  </div>
</template>

<script>
  import TelephoneInput from '../../components/TelephoneInput'
  export default TelephoneInput
</script>

<style src="../../assets/telephone-input/sprite.css"></style>
<style scoped>
  :local {
    --border-radius: 2px;
  }

  li.last-preferred {
    border-bottom: 1px solid #cacaca;
  }
  .iti-flag {
    margin-right: 5px;
    margin-left: 5px;
  }
  .dropdown-item .iti-flag {
    display: inline-block;
    margin-right: 5px;
  }
  .selection {
    font-size: 0.8em;
    display: flex;
    align-items: center;
  }
  .b-tel-input {
    border-radius: 3px;
    display: flex;
    border: 1px solid #bbb;
    text-align: left;
  }
  .b-float-label input.b__input.b-telephone-input {
    border: none;
    border-left: 1px solid #bbbbbb;
    border-radius: 0;
  }
  .input-disabled.b-tel-input {
    border: none;
  }
  .input-disabled.b-tel-input .dropdown-arrow {
    display: none;
  }
  .input-disabled.b-tel-input input.b__input:disabled {
    border: none;
  }
  .input-disabled.b-tel-input input.b__input {
    border: none;
  }
  .b-tel-input:focus-within {
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(102, 175, 233, 0.6);
    border-color: #66afe9;
  }
  input {
    border: none;
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
    width: 100%;
    outline: none;
    padding-left: 7px;
  }
  ul {
    z-index: 99999;
    padding: 0;
    margin: 0;
    text-align: left;
    list-style: none;
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    top: 33px;
    left: -1px;
    right: -1px;
    background-color: #fff;
    border: 1px solid #ccc;
    max-width: unset !important;
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    position: relative;
    padding: 7px;
    cursor: pointer;
  }
  .dropdown.open {
    background-color: #f3f3f3;
  }
  .dropdown:hover {
    background-color: #f3f3f3;
  }
  .dropdown-arrow {
    transform: scaleY(0.5);
    display: inline-block;
    color: #666;
  }
  .dropdown-item {
    cursor: pointer;
    padding: 4px 8px;
  }
  .dropdown-item.highlighted {
    background-color: #f3f3f3;
  }
  .dropdown-menu.show {
    max-height: 300px;
    overflow: scroll;
  }
  .b-tel-input.disabled .selection,
  .b-tel-input.disabled .dropdown,
  .b-tel-input.disabled input {
    cursor: no-drop;
  }
  .b-code{
    margin: 0px 4px 0 0px;
    font-weight: bold;
    font-size: 12px;
  }
  @-moz-document url-prefix() {
    .uiFirefox {
      max-width: calc(100% - 54.3px);
    }
  }
</style>
