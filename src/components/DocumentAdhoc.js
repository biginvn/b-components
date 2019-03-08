import dropzoneUpload from './DropzoneUpload.js'
import BRadio from '../themes/ios/Radio.vue'
import BCheckbox from '../themes/ios/CheckBox.vue'
export default 
{
    components : { BRadio, BCheckbox },
    mixins : [dropzoneUpload],
    watch : {
        items : {
            handler: function (val, oldVal) {
                var vm = this;
                if(Array.isArray(val))
                {
                    val.forEach((item,index) => {
                        if(!item.isProcess)
                            item.exportType = 'docx';
                        vm.value.list[index].isProcess = item.isProcess
                        vm.value.list[index].exportType = item.exportType
                    })
                }
            },
            deep: true
        }
    },
    methods :{
        /* custom model items for document adhoc */
        deleteThisItem(id){
            for(var i = 0; i < this.items.length; i++){
                if( this.items[i].id  == id ){
                    this.items[i].show = false
                    this.items.splice(i, 1)
                }
            }
            this.value.list = this.items;
            this.value.removeIds.push(id);
            this.$emit('input', this.value)
        },
        prepareItems(list) {
            if (list == undefined || list == null || list.length == 0){
                if (this.default != undefined && this.default != null ){
                    this.items = [this.default]
                    return [this.default];
                }
                return [{ id : '', path : '' }];
            }
            let items = [];
            for(let i=0; i < list.length; i++){
                let listItem = list[i];
                let className
                if( listItem.className != null || listItem.className != undefined )
                    className = listItem.className
                else
                    className = this.getClassByPath(listItem.path)
                let filesize = this.renderFileSize(listItem.filesize.replace(" ", ""))
                let typeProcess = listItem.exportType ? listItem.exportType : (listItem.type_process ? listItem.type_process : 'docx');
                let isProcess = listItem.isProcess ? listItem.isProcess : (listItem.is_process ? listItem.is_process : false);
                let item = {
                    id         : listItem.id,
                    filesize   : filesize,
                    path       : listItem.path,
                    name       : (listItem.filename == null || listItem.filename == undefined) ? this.getNameByPath(listItem.path) : listItem.filename,
                    className  : className,
                    exportType : typeProcess,
                    isProcess  : isProcess,
                }
                items.push(item);
            }
            this.items = items
            return this.items
        },
        getClassByPath(path){
            var itemClass = "dz-thumb"
            var fileEx = this.checkTypeFile(path)
            if (fileEx == "jpg" || fileEx == "jpeg" || fileEx == "png" ||  fileEx == "gif" ||  fileEx == "bmp")
                return itemClass += " dz-image"
            switch(fileEx) {
                case "pdf":
                    itemClass += " dz-pdf"
                    break;
                case "doc":
                    itemClass += " dz-doc"
                    break;
                case "docx":
                    itemClass += " dz-doc show-option-document"
                    break;
                case "ppt":
                    itemClass += " dz-ppt"
                    break;
                case "xls":
                    itemClass += " dz-xls"
                    break;
                case "xlsx":
                    itemClass += " dz-xls"
                    break;
                case "txt":
                    itemClass += " dz-txt"
                    break;
                case "csv":
                    itemClass += " dz-csv"
                    break;
                case "rtf":
                    itemClass += " dz-rtf"
                    break;
                case "zip":
                    itemClass += " dz-zip"
                    break;
                case "rar":
                    itemClass += " dz-zip"
                    break;
                default:
                    itemClass = itemClass + " dz-file"
            }
            return itemClass
        },
        initDropzone(){
            this.configDropzone()
            this.dropzone = new Dropzone(`#${this.id}`, this.completedConfig)
            let Vue = this
            this.dropzone.on("sending", (file, xhr, formData) => {
                document.querySelector(`#${Vue.id} + .total-progress .progress`).style.opacity = "1"
            })
            this.dropzone.on("addedfile", (file) => {
                var parent = document.querySelectorAll('.' + this.id + '__preview__container .preview:not(stuff)');
                for (var i = 0; i < parent.length ; i++) {
                    var child = parent[i].querySelector('.dz-thumb');
                    parent[i].querySelector('.dz-thumb').style.animation = "fadeOut";
                }
                var fileEx = file.name.split('.').pop();
                if (this.supportTypes.length > 0 && this.supportTypes.indexOf('.' + fileEx) === -1) {
                    this.dropzone.removeFile(file);
                    this.$emit('validation-file-type', this.supportTypes.join(', '))
                    if(!this.customMsgValidateType)
                        alert('The selected file is not supported. The accepted file types are: ' + this.supportTypes.join(','))
                }
                else {

                    /* handle append export type after added file */
                    var idExportTypeElement = Math.floor(Math.random() * 100000); // Create the remove button 
                    var exportTypeElement = Dropzone.createElement(`<div class="form-group document-type export-type-upload"><div class="b__components b-checkbox"><input name="is-process-${idExportTypeElement}" type="checkbox" class="checkbox__input"> <span class="checkbox__checkmark"></span> <label>Document Process</label></div><div class="document-type-option"><div class="b__components b-radio" style="display:none;"><input checked name="export-type-${idExportTypeElement}" value="docx" type="radio" class="radio__input"> <span class="radio__checkmark"></span> <label>Docx</label></div> <div class="b__components b-radio" style="display:none;" ><input name="export-type-${idExportTypeElement}" type="radio" class="radio__input" value="pdf"> <span class="radio__checkmark"></span> <label>Pdf</label></div></div></div>`);
                    var d = file.previewElement.appendChild(exportTypeElement)

                    /* register event js for review document */
                    $(`input[name="is-process-${idExportTypeElement}"]`).change(function() {

                        if ($(this).is(':checked') == true) {
                            $(this).parent().siblings().children('.b-radio').css("display","");
                        }else{
                            $(this).parent().siblings().children('.b-radio').css("display","none");
                        }
                    });
                    /* end register event js for review document */

                    if (fileEx == "jpg" || fileEx == "jpeg" || fileEx == "png" ||  fileEx == "gif" ||  fileEx == "bmp")
                        child.className += " dz-image"
                    else
                    {
                        switch(fileEx) {
                            case "pdf":
                                child.className += " dz-pdf"
                                break;
                            case "doc":
                                child.className += " dz-doc"
                                break;
                            case "docx":
                                child.className += " dz-doc show-option-document"
                                break;
                            case "ppt":
                                child.className += " dz-ppt"
                                break;
                            case "xls":
                                child.className += " dz-xls"
                                break;
                            case "xlsx":
                                child.className += " dz-xls"
                                break;
                            case "txt":
                                child.className += " dz-txt"
                                break;
                            case "csv":
                                child.className += " dz-csv"
                                break;
                            case "rtf":
                                child.className += " dz-rtf"
                                break;
                            case "zip":
                                child.className += " dz-zip"
                                break;
                            case "rar":
                                child.className += " dz-zip"
                                break;
                            default:
                                child.className += " dz-file"
                        }
                    }
                        
                    if(fileEx != 'docx')
                    {
                        let element = $(`input[name="is-process-${idExportTypeElement}"]`);
                        element.closest('.preview').find('.export-type-upload').css("display","none");
                        element.closest('.preview').find('.dz-size').removeClass('dz-document-bonus').addClass('dz-document-none');
                    }
                }

            })

            this.$emit('dropzone', this.dropzone)
            if(this.value != undefined)
                if(this.value.list != undefined && this.value.list != null)
                    this.prepareItems(this.value.list)
        },
        configDropzone() {
            let acceptedFiles = this.supportTypes.join(',')
            let config = {
                thumbnailWidth : 80,
                thumbnailHeight: 80,
                parallelUploads: 1,
                acceptedFiles : (acceptedFiles) ? acceptedFiles : null,
                autoQueue: false,
                clickable: [`#${ this.id } .content`],
                accept : (file, done) => { done() },
                previewTemplate: document.querySelector(`.${this.id}__preview`).innerHTML,
                previewsContainer: `.${this.id}__preview__container`,
                maxFiles: (this.maxFile == undefined) ? null : this.maxFile,
                maxfilesexceeded: function(file) {
                    this.removeAllFiles();
                    this.addFile(file);
                    this.$emit('validation-file-number', file)
                    if(!this.customMsgValidateType)
                        alert('Upload file too specified number.')
                },
            }
            this.completedConfig  = Object.assign(config, this.config)
        }
    }
}