import dropzoneUpload from './DropzoneUpload.js'
import BRadio from '../themes/ios/Radio.vue'
export default 
{
    components : { BRadio },
    mixins : [dropzoneUpload],
    watch : {
        items : {
            handler: function (val, oldVal) {
                var vm = this;
                if(Array.isArray(val))
                {
                    val.forEach((item,index) => {
                        vm.value.list[index].exportType = item.exportType
                    })
                }
                
            },
            deep: true
        }
    },
    methods :{
        /* custom model items for document adhoc */
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
                let item = {
                    id         : listItem.id,
                    filesize   : filesize,
                    path       : listItem.path,
                    name       : (listItem.filename == null || listItem.filename == undefined) ? this.getNameByPath(listItem.path) : listItem.filename,
                    path       : listItem.path,
                    className  : className,
                    exportType : listItem.export_type ? listItem.export_type : 'docx',
                    is_active : listItem.is_active ? true : false
                }
                items.push(item);
            }
            this.items = items
            return this.items
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
                    alert('The selected file is not supported. The accepted file types are: ' + this.supportTypes.join(','))
                }
                else {

                    /* handle append export type after added file */
                    var idExportTypeElement = Math.floor(Math.random() * 100000); // Create the remove button 
                    var exportTypeElement = Dropzone.createElement(`<div class="form-group document-type export-type-upload"><div class="b__components b-radio"><input checked name="${idExportTypeElement}" value="docx" type="radio" class="radio__input"> <span class="radio__checkmark"></span> <label>Docx</label></div> <div class="b__components b-radio" ><input name="${idExportTypeElement}" type="radio" class="radio__input" value="pdf"> <span class="radio__checkmark"></span> <label>Pdf</label></div></div></div>`);
                    var d = file.previewElement.appendChild(exportTypeElement)

                    if (fileEx == "jpg" || fileEx == "jpeg" || fileEx == "png" ||  fileEx == "gif" ||  fileEx == "bmp")
                        return child.className += " dz-image"
                    switch(fileEx) {
                        case "pdf":
                            child.className += " dz-pdf"
                            break;
                        case "doc":
                            child.className += " dz-doc"
                            break;
                        case "docx":
                            child.className += " dz-doc"
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

            })

            this.$emit('dropzone', this.dropzone)
            if(this.value != undefined)
                if(this.value.list != undefined && this.value.list != null)
                    this.prepareItems(this.value.list)
        },
        configDropzone() {
            let acceptedFiles = this.supportTypes.join(',')
            let vue = this;
            $(document.querySelector(`.${this.id}__preview`)).html(vue.customHtmlReview());
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
                    alert('Upload file too specified number.')
                },
            }
            this.completedConfig  = Object.assign(config, this.config)
        },
        customHtmlReview()
        {
            let html = '<div class="preview"><div class="dz-thumb"><img data-dz-thumbnail=""></div> <span data-dz-name="" class="dz-name"></span> <span data-dz-size="" class="dz-size dz-document-adhoc"></span> <a href="#" target="_blank" data-dz-remove="" class="remove-archive"><span><i class="fa fa-trash-o"></i></span></a></div>'
            return html;
        }
    }
}