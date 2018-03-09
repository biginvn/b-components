import baseComponent from '../mixins/base-mixins'

export default {
    data() {
        return {
            dropzone: null,
            completedConfig : {}
        }
    },
    components: {

    },
    mixins: [baseComponent],
    mounted() {
        this.configDropzone()
        this.dropzone = new Dropzone(`#${this.id}`, this.completedConfig)
        let dropzoneComponent = this

        this.dropzone.on("totaluploadprogress", (progress) => {
            document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.width = progress + "%"
            document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.display = "block"
        })

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


    },
    props: ['name', 'config', 'id'],
    computed: {
        
    },
    methods: {
        upload() {
            this.dropzone.enqueueFiles(this.dropzone.getFilesWithStatus(Dropzone.ADDED));

        },
        configDropzone() {
            let config = {
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                parallelUploads: 1,
                autoQueue: false,
                clickable: [`#${ this.id } .content`],
                accept : (file, done) => { done() },
                previewTemplate: document.querySelector(`.${this.id}__preview`).innerHTML,
                previewsContainer: `.${this.id}__preview__container`
            }
            this.completedConfig  = Object.assign(config, this.config)
        }
    }

}