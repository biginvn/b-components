import baseComponent from '../mixins/base-mixins'

export default {
    data() {
        return {
            dropzone: null,
            completedConfig : {},
            items : null,
        }
    },
    components: {

    },
    mixins: [baseComponent],
    mounted() {
        this.configDropzone()
        this.dropzone = new Dropzone(`#${this.id}`, this.completedConfig)
        let dropzoneComponent = this

        // this.dropzone.on("totaluploadprogress", (progress) => {
        //     document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.width = progress + "%"
        //     document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.display = "block"
        // })

        this.dropzone.on("sending", (file) => {
            document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.opacity = "1"
        })

        this.dropzone.on("queuecomplete", (progress) => {
            // document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.opacity = "0"
        })

        this.dropzone.on("addedfile", (file) => {
            var parent = document.querySelectorAll('.preview:not(stuff)');
            for (var i = 0; i < parent.length ; i++) {
                var child = parent[i].querySelector('.dz-thumb');
                parent[i].querySelector('.dz-thumb').style.animation = "fadeOut";
            }

            var fileEx = file.name.split('.').pop();
            if (fileEx != "JPG" || fileEx != "JPEG" || fileEx != "PNG" ||  fileEx != "GIF" ||  fileEx != "BMP"){
                fileEx == "pdf" ? child.className += " dz-pdf" : child.className;
                fileEx == "doc" ? child.className += " dz-doc" : child.className;
                fileEx == "ppt" ? child.className += " dz-ppt" : child.className;
                fileEx == "xls" ? child.className += " dz-xls" : child.className;
                fileEx == "txt" ? child.className += " dz-txt" : child.className;
                fileEx == "csv" ? child.className += " dz-csv" : child.className;
                fileEx == "rtf" ? child.className += " dz-rtf" : child.className;
                fileEx == "zip" ? child.className += " dz-zip" : child.className;
            }
        })
        this.$emit('dropzone', this.dropzone)
        // edit by thien nguyen
        if(this.value.list != undefined || this.value.list != null)
            this.prepareItems(this.value.list)
    },
    props: ['name', 'config', 'id', 'mode'],
    computed: {
        
    },
    watch:{
        'dropzone.files'(value){
            this.value.dropzone = this.dropzone
            this.$emit('input', this.value)
        },
        'value.list'(value){ // edit by thien nguyen
            this.prepareItems(value)
        },
    },
    methods: {
        // upload() {  //rem by thien.nguyen
        //     this.dropzone.enqueueFiles(this.dropzone.getFilesWithStatus(Dropzone.ADDED));
        //     this.$emit('input', this.dropzone)
        // },
        configDropzone() {
            let config = {
                thumbnailWidth : 80,
                thumbnailHeight: 80,
                parallelUploads: 1,
                autoQueue: false,
                clickable: [`#${ this.id } .content`],
                accept : (file, done) => { done() },
                previewTemplate: document.querySelector(`.${this.id}__preview`).innerHTML,
                previewsContainer: `.${this.id}__preview__container`,
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
                let name = this.getNameByPath(listItem.path)
                let item = {
                    id         : listItem.id, 
                    size       : listItem.size,
                    path       : listItem.path,
                    name       : name,
                    path       : listItem.path,
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
                return itemClass
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
            this.$emit('input', this.value)
        }
    },
}