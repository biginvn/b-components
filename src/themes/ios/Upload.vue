<template>
  <div class="b__components b__upload">
    <div class="b__components__dropzone" :id="id">
      <div class="content">
        <img
          v-if="completedConfig.publicPath"
          :src="
            completedConfig.publicPath + '/assets/images/svg-cloud-icon.svg'
          "
          class="icon-upload"
        />
        <p>Drag and drop files here...</p>
      </div>
    </div>

    <div class="total-progress">
      <div class="progress" style="width: 20%"></div>
    </div>

    <div :class="id + '__preview__container'">
      <div :class="id + '__preview preview stuff'">
        <div class="preview">
          <div class="dz-thumb"><img data-dz-thumbnail /></div>
          <span class="dz-name" data-dz-name></span>
          <span class="dz-size" data-dz-size></span>
          <a href="#" class="remove-archive" target="_blank" data-dz-remove
            ><i class="fa fa-trash-o"></i
          ></a>
        </div>
      </div>
    </div>

    <div class="upload-control">
      <b-button
        class-name="button-primary"
        @click.native="upload()"
        label="Upload"
        icon="<i class='fa fa-cloud-upload' aria-hidden='true'></i>"
      ></b-button>
    </div>
  </div>
</template>
<script>
  import Upload from './../../components/Upload'
  export default Upload
</script>
