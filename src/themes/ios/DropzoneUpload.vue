<template>
    <div class="b__components b__dropzone_upload">
        <div class="b__components__dropzone" :id="id" v-show="((dropzoneTotalFile + inputTotalFile) < parseInt(maxFile)) && !disabled">
            <div class="content">
                <div class="row">
                    <img v-if="completedConfig.publicPath" :src="completedConfig.publicPath + '/assets/images/svg-cloud-icon.svg'" class="icon-upload">
                    <span class="uk-text-middle" v-html="parseDropzoneContent()"></span>
                </div>
            </div>
        </div>
        <!-- <div class="b__components__dropzone" :id="id" v-show="(dropzoneTotalFile + inputTotalFile) >= parseInt(maxFile)">
            <div class="disabled-upload text-center">
                <span class="uk-text-middle">Max File Uploaded...</span>
            </div>
        </div> -->
        <div :class="id + '__preview__container'">
            <div :class="id + '__preview preview stuff'">
                <div class="preview">
                    <div class="dz-thumb"><img data-dz-thumbnail /></div>
                    <span class="dz-name" data-dz-name></span>
                    <span class="dz-size" data-dz-size></span>
                    <a href="#" class="remove-archive" target="_blank" data-dz-remove><span><i class="fas fa-times"></i></span></a>
                </div>
            </div>
            <div v-for= "item in items" class="preview">
                <!-- <a :href="item.path"> -->
                    <div :class="item.className" style="animation: fadeOut;">
                        <img v-if="item.className == 'dz-thumb' || item.className == 'dz-thumb dz-image'" data-dz-thumbnail="" :src="item.path" style="height: 45px;">
                        <img v-else data-dz-thumbnail="">
                        <a :href="item.path" target="_blank"><span data-dz-name="" class="dz-name" data-toggle="tooltip" data-original-title="Download">{{ item.name }}</span></a>
                        <strong><span class="dz-size" data-dz-size>{{ item.filesize }}</span></strong>
                        <a data-dz-remove="" v-show="!disabled"  class="remove-archive" @click="deleteThisItem(item.id)"><i class="fas fa-times"></i></a>
                    </div> 
                <!-- </a> -->
            </div>
        </div>
    </div>
</template>

<script>
import DropzoneUpload from './../../components/DropzoneUpload'
export default DropzoneUpload
</script>

<style>
    .disabled-upload:hover .uk-text-middle:after{
        content: '(*Remove assets file to change new file.)';

    }
    .disabled-upload{
        animation: fadeIn;
        animation-duration: 1s;
        will-change: padding;
        cursor: help;
    }
</style>