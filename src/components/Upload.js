import baseComponent from '../mixins/base-mixins'

export default {
    data() {
        return {
        	dropzone : null
        }
    },
    components: {

    },
    mixins: [baseComponent],
    mounted() {
        this.dropzone = new Dropzone(`#${this.id}`, this.configDropzone)
        let dropzoneComponent = this

        this.dropzone.on("totaluploadprogress", (progress) => {
			document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.width = progress + "%"
		})

		this.dropzone.on("sending", (file) => {
			document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.opacity = "1"
		})

		this.dropzone.on("queuecomplete", (progress) => {
			// document.querySelector(`#${dropzoneComponent.id} + .total-progress .progress`).style.opacity = "0"
		})

        this.$emit('dropzone', this.dropzone)

    },
    props: ['name', 'config', 'id'],
    computed: {
        configDropzone() {
            let config = {
                thumbnailWidth: 80,
                thumbnailHeight: 80,
                parallelUploads: 1,
                autoQueue: false,
                clickable: [`#${ this.id } .content`],
                previewTemplate: document.querySelector(`.${this.id}__preview`).innerHTML,
                previewsContainer: `.${this.id}__preview__container`
            }
            config = Object.assign(config, this.config)
            return config
        }
    },
    methods: {
        upload() {
			this.dropzone.enqueueFiles(this.dropzone.getFilesWithStatus(Dropzone.ADDED));

        }
    }

}