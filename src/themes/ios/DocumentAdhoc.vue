<template>
    <div class="b__components b__dropzone_upload">
        <div class="b__components__dropzone" :id="id" v-show="totalFileSize && !disabled">
            <div class="content">
                <div class="row">
                    <img v-if="completedConfig.publicPath" :src="completedConfig.publicPath + '/assets/images/svg-cloud-icon.svg'" class="icon-upload">
                    <span class="uk-text-middle" v-html="parseDropzoneContent()"></span>
                </div>
            </div>
        </div>
        <div :class="id + '__preview__container'">
            <div :class="id + '__preview preview stuff'">
                <div class="preview" style="height: 100%;">
                    <div class="dz-thumb">
                        <img data-dz-thumbnail="">
                    </div> 
                    <span data-dz-name="" class="dz-name"></span>
                    <span data-dz-size="" class="dz-size"></span>
                    <a href="#" target="_blank" data-dz-remove="" class="remove-archive">
                        <span><i class="fas fa-times"></i></span>
                    </a>
                </div>
            </div>
            <div v-for= "item in items" class="preview">
                <div :class="item.className" style="animation: fadeOut;">
                    <img v-if="item.className == 'dz-thumb' || item.className == 'dz-thumb dz-image'" data-dz-thumbnail="" :src="item.path">
                    <img v-else data-dz-thumbnail="">
                    <a :href="item.path"><span data-dz-name="" class="dz-name">{{ item.name }}</span></a>
                    <strong>
                        <span class="dz-size" data-dz-size>{{ renderFileSize(item.filesize) }}</span>
                    </strong>
                    <a data-dz-remove="" class="remove-archive" @click="deleteThisItem(item.id)"><i class="fas fa-times"></i></a>
                </div> 
                <div class="form-group document-type" v-if="item.className == 'dz-thumb dz-doc show-option-document'">
                    <b-check-box v-model="item.isProcess" label="Document Process"></b-check-box>
                    <div class="document-type-option">
                        <b-radio v-model="item.exportType" label="Docx" value="docx" v-if="item.isProcess"></b-radio>
                        <b-radio v-model="item.exportType" label="Pdf" value="pdf" v-if="item.isProcess"></b-radio>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DocumentAdhoc from './../../components/DocumentAdhoc'
export default DocumentAdhoc
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
    .document-type{
        margin: 10px 0 10px 20px;
    }
    .document-type-option{
        margin: 15px 30px 0px 30px;
        display: flex;
        justify-content: space-between;
    }
</style>