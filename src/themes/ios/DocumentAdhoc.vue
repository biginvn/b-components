<template>
    <div class="b__components b__dropzone_upload">
        <div class="b__components__dropzone" :id="id" v-show="(dropzoneTotalFile + inputTotalFile) < parseInt(maxFile) || maxFile == undefined">
            <div class="content">
                <div class="row">
                    <img v-if="completedConfig.publicPath" :src="completedConfig.publicPath + '/assets/images/svg-cloud-icon.svg'" class="icon-upload">
                    <span class="uk-text-middle" v-html="parseDropzoneContent()"></span>
                </div>
            </div>
        </div>
        <div :class="id + '__preview__container'">
            <div :class="id + '__preview preview stuff'">
                <div class="preview">
                    <div class="dz-thumb"><img data-dz-thumbnail /></div>
                    <span class="dz-name" data-dz-name></span>
                    <span class="dz-size" data-dz-size></span>
                    <a href="#" class="remove-archive" target="_blank" data-dz-remove><span><i class="fa fa-trash-o"></i></span></a>
                </div>
            </div>
            <div v-for= "item in items" class="preview">
                <div :class="item.className" style="animation: fadeOut;">
                    <img v-if="item.className == 'dz-thumb' || item.className == 'dz-thumb dz-image'" data-dz-thumbnail="" :src="item.path">
                    <img v-else data-dz-thumbnail="">
                    <a :href="item.path"><span data-dz-name="" class="dz-name">{{ item.name }}</span></a>
                    <strong>
                        <span :class="getClassSize(item)" data-dz-size>{{ item.filesize }}</span>
                    </strong>
                    <a data-dz-remove="" class="remove-archive" @click="deleteThisItem(item.id)"><i class="fa fa-trash-o"></i></a>
                </div> 
                <div class="form-group document-type" v-if="item.className == 'dz-thumb dz-doc show-option-document'">
                    <b-check-box v-model="item.isProcess" label="Document Process"></b-check-box>
                    <b-radio v-model="item.exportType" label="Docx" value="docx" v-if="item.isProcess"></b-radio>
                    <b-radio v-model="item.exportType" label="Pdf" value="pdf" v-if="item.isProcess"></b-radio>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DocumentAdhoc from './../../components/DocumentAdhoc'
export default DocumentAdhoc
// <b-check-box v-model="" :bind-value="add.id" :id="add.value" :label="add.value"></b-check-box>
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
        text-align: center;
    }
    .dz-document-adhoc {
        bottom: 60px !important ;
    }
    .dz-document-bonus {
        bottom: 40px !important ;
    }
    .dz-document-none {
        bottom: 5px !important ;
    }
</style>