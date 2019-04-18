import baseComponent from '../mixins/base-mixins'

export default {
    data() {
        return {
            dropzone: null,
            completedConfig : {},
            items : null,
            totalInputFileSize : 0,
            totalDropzoneFileSize : 0,
            // totalFileSize : 0,
            dropzoneTotalFile : 0,
            inputTotalFile : 0,
            supportTypes : []
        }
    },
    components: {
    },
    mixins: [baseComponent],
    mounted() {
        if (this.supportFileType !== null) this.supportTypes = this.supportFileType.slice(0)
        if(this.value != null && this.value != undefined)
            this.initDropzone()
    },
    props: {
        name: {

        },
        config: {

        },
        id: {

        },
        maxFile: {

        },
        mode: {

        },
        maxSize: {

        },
        disabled : {
            type : Boolean,
            default : false
        },
        supportFileType: {
            type: Object/Array,
            default: null
        },
        customMsgValidateNumber:{
            type : Boolean,
            default : false
        },
        customMsgValidateSize:{
            type : Boolean,
            default : false
        },
        customMsgValidateType:{
            type : Boolean,
            default : false
        },
        adhocDocuments:{
            type: Object/Array,
            default: null
        }
    },
    watch:{
        'dropzone.files'(value){
            if(this.validateFileSize(value)){
                this.caculateTotalDropzoneFileSize(value)
                this.value.dropzone = this.dropzone
                this.dropzoneTotalFile = this.dropzone.files.length
                this.$emit('input', this.value)
            }
            
        },
        'value.list'(value){ // edit by thien nguyen
            this.totalInputFileSize = 0
            if(value != undefined){
                this.prepareItems(value)
                this.inputTotalFile = value.length
            }
        },
        value(value){
            // console.log(value);
            if(value != undefined && value != undefined) {
                this.initDropzone()
            }
        },
        supportFileType(value) {
            if (value !== null) this.supportTypes = this.supportFileType.slice(0)
        }
    },
    methods: {
        dropzoneRemoveFile(files = []){
            if(files)
                this.dropzone.removeAllFiles(true);
            else{
                for(let i = 0; i < files.length; i++){
                    this.dropzone.removeFile(files[i]);
                }
            }
        },
        initDropzone(){
            this.configDropzone()
            if (this.dropzone !== null) {
                this.dropzoneRemoveFile(true)
            }
            else {
                this.dropzone = new Dropzone(`#${this.id}`, this.completedConfig)
                let dropzoneComponent = this
                this.dropzone.on("sending", (file) => {
                    document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.opacity = "1"
                })
                this.dropzone.on("queuecomplete", (progress) => {
                })
                let Vue = this
                this.dropzone.on("addedfile", (file, xhr, formData) => {
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
            }
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
        },

        prepareItems(list) { // this to down write by thien nguyen
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
                let fileName = (listItem.filename != undefined && listItem.filename != null) ? listItem.filename : ((listItem.name == undefined || listItem.name == null) ? this.getNameByPath(listItem.path) : listItem.name);
                let item = {
                    id         : listItem.id,
                    filesize   : filesize,
                    path       : listItem.path,
                    name       : fileName,
                    className  : className,
                }
                items.push(item);
            }
            this.items = items
            return this.items
        },

        checkTypeFile(path){
            var pathEx = path.split('.').pop().toLowerCase()
            return pathEx
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
                    itemClass += " dz-doc"
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

        getNameByPath(path){
            var name = path.split('/').pop()
            return name = name.split('.').shift()
        },

        deleteThisItem(id){
            for(var i = 0; i < this.items.length; i++){
                if( this.items[i].id  == id ){
                    this.items[i].show = false
                    this.items.splice(i, 1)
                }
            }
            this.value.list = this.items

            /* add file added be removed */
            if(Array.isArray(this.value.removeIds))
            {
                this.value.removeIds.push(id);
            }

            this.$emit('input', this.value)
        },

        renderFileSize(size){
            let sizeLength = size.length
            let result = ""
            if(size.slice(sizeLength - 2, sizeLength).toLowerCase() == 'mb' || size.slice(sizeLength - 2, sizeLength).toLowerCase() == 'kb'){
                result = size
                this.totalInputFileSize = this.totalInputFileSize + parseInt(size.slice(0, sizeLength - 2))
            }
            else{
                result =  parseInt(size/1024) + ' KB'
                this.totalInputFileSize = this.totalInputFileSize + parseInt(size/1024)
            }
            return result
        },

        caculateTotalDropzoneFileSize(listFile){
            this.totalDropzoneFileSize = 0
            let fileError = ""
            for(let i = 0; i < listFile.length; i++){
                if(listFile[i].accepted == true)
                    this.totalDropzoneFileSize = this.totalDropzoneFileSize + listFile[i].size/1024
                let totalFileSize = (this.adhocDocuments == null || this.adhocDocuments == undefined) ? this.totalInputFileSize + this.totalDropzoneFileSize : this.totalInputFileSize + this.totalDropzoneFileSize +this.calculateTotalAdhocDocumentFileSize(this.adhocDocuments);
                if( this.maxSize != undefined && totalFileSize >= this.maxSize){
                    fileError = fileError + listFile[i].name + " "
                    this.totalDropzoneFileSize = this.totalDropzoneFileSize - listFile[i].size/1024
                    this.dropzone.removeFile(listFile[i])
                }
            }
            if( fileError != null &&  fileError != ""){
                this.$emit('validation-file-size', fileError)
                if(!this.customMsgValidateSize)
                    alert("File: " + fileError + " removed because total size to large.")
            }
            this.$emit('total-file-size', (this.adhocDocuments == null || this.adhocDocuments == undefined) ? this.totalInputFileSize + this.totalDropzoneFileSize : this.totalInputFileSize + this.totalDropzoneFileSize +this.calculateTotalAdhocDocumentFileSize(this.adhocDocuments))
        },
        calculateTotalAdhocDocumentFileSize(files){
            let adhocDocumentsFileSize = 0;
            for(var j=0; j < files.length; j++){
                let filesize = files[j].filesize.replace(" ", "");
                let sizeLength = filesize.length
                if(filesize.slice(sizeLength - 2, sizeLength).toLowerCase() == 'mb' || filesize.slice(sizeLength - 2, sizeLength).toLowerCase() == 'kb'){
                    adhocDocumentsFileSize = adhocDocumentsFileSize + parseInt(filesize.slice(0, sizeLength - 2));
                }
                else{
                    adhocDocumentsFileSize = adhocDocumentsFileSize + parseInt(filesize/1024)
                }
            }
            return adhocDocumentsFileSize;
        },
        parseDropzoneContent(){
            if(this.dropzoneContent == undefined || this.dropzoneContent == null)
                return 'Attach file by dropping here or <span class="uk-link">selecting one</span>'
            return this.dropzoneContent
        },
        validateFileSize(files){
            let fileError = ""
            for (var k =0; k < files.length;k++) {
                if(parseInt(files[k].size/1024) > 10240){
                    if(!this.customMsgValidateSize)
                        alert('File size is greater than 10MB')
                    fileError = fileError + files[k].name + " "
                    this.$emit('validate-file-size', fileError)
                    this.dropzone.removeFile(files[k]);
                    return false;
                }
            }
            return true; 
        }
    },
}