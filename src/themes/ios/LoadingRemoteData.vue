<template>
  <div class="b__components b__loading_remote_data b__multi__select">
    <div class="b__multi__select__control">
      <div class="selected" v-show="isShowingTag" v-for="(item, index) in list">
        <span class="thumb">{{ item.thumbHtml }}</span>
        <span class="close-item" @click.prevent.stop="remove(index)"
          ><i class="fas fa-times" aria-hidden="true"></i
        ></span>
      </div>
      <!-- <div class="selected single" v-if="isSingle">
				<span class="thumb" v-if = "getSingleSelected()!=null" v-html="getSingleSelected().thumbHtml"></span>
			</div> -->
      <div
        class="input-control-wrap"
        v-if="!isSingle || getSingleSelected() == null"
      >
        <input
          type="text"
          class="input-control"
          v-model="searchKeyword"
          :value="searchKeyword"
          v-on:keydown.delete.stop="removeLastTag()"
          v-on:keyup="change"
        />
      </div>
    </div>
    <ul :class="listClasses">
      <li v-show="searchList.length == 0" class="not-found">Not found</li>

      <li
        class="list-item"
        v-for="(item, index) in searchList"
        @click="toggleItem(item.id)"
      >
        <div class="icon" v-if="!disableIcon">
          <img :src="item.icon" class="icon-img" />
        </div>

        <div class="content" v-html="item.html"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import LoadingRemoteData from './../../components/LoadingRemoteData'
  export default LoadingRemoteData
</script>
