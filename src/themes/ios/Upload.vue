<template>
    <div class="b__components b__upload">
        <div class="b__components__dropzone" :id="id">
            <div class="content">

                <img v-if="completedConfig.publicPath" :src="completedConfig.publicPath + '/assets/images/svg-cloud-icon.svg'" class="icon-upload">
                <p>Drag and drop files here...</p>
            </div>
        </div>
        
        <div :class="id + '__preview__container'">
            <div :class="id + '__preview preview stuff'">
                <div class="preview">
                    <div class="dz-thumb"><img data-dz-thumbnail /></div>
                    <span class="dz-name" data-dz-name></span>
                    <span class="dz-size" data-dz-size></span>
                    <a href="#" class="remove-archive" target="_blank" data-dz-remove><i class="fa fa-trash-o"></i></a>
                </div>
            </div>
            <div v-for= "item in items" class="preview">
                <div :class="item.className" style="animation: fadeOut;">
                    <img v-if="item.className == 'dz-thumb'" data-dz-thumbnail="" :src="item.path">
                    <img v-else data-dz-thumbnail="">
                </div> 
                <a :href="item.path"><span data-dz-name="" class="dz-name">{{ item.name }}</span></a>
                <a data-dz-remove="" class="remove-archive" @click="deleteThisItem(item.id)"><i class="fa fa-trash-o"></i></a>
            </div>
        </div>
    </div>
</template>
<script>
import Upload from './../../components/Upload'
export default Upload
</script>

