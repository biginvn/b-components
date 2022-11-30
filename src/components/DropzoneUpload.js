import baseComponent from '../mixins/base-mixins'
import { Props, Variables, FileTypes } from '../props/dropzone'

export default {
  mixins: [baseComponent],
  data() {
    return {
      ...JSON.parse(JSON.stringify(Variables)),
    }
  },
  props: {
    ...JSON.parse(JSON.stringify(Props)),
    disabled: {
      type: Boolean,
      default: false,
    },
    supportFileType: {
      type: Object / Array,
      default: function () {
        return FileTypes
      },
    },
    adhocDocuments: {
      type: Object / Array,
      default: function () {
        return []
      },
    },
    dropzoneContent: {
      type: String,
      default:
        'Attach file by dropping here or <span class="uk-link">selecting one</span>',
    },
    maxSizePerFile: {
      type: Number,
      default: 10240,
    },
    unitBytes: {
      type: Number,
      default: 1000,
    },
    clickView: {
      type: Function,
      default: function () {
        return
      },
    },
    isRequestSignature: {
      type: Boolean,
      default: false,
    },
    isInvoicingMail: {
      type: Boolean,
      default: false,
    },
    signatureSupportFileType: {
      type: Object / Array,
      default: function () {
        return []
      },
    },
  },
  mounted() {
    this.initDropzone()
  },
  computed: {
    supportTypes() {
      return [...this.supportFileType]
    },
    totalFileSize() {
      if (this.maxFile) return parseInt(this.maxFile) > this.totalFiles()
      if (this.maxSize)
        return !(
          parseInt(this.getCurrentFileSize() / this.unitBytes) >= this.maxSize
        )
      return true
    },
  },
  watch: {
    'dropzone.files'(value) {
      this.value.dropzone = this.dropzone
      this.$emit('input', this.value)
    },
    'value.list': {
      handler: function (files) {
        if (Array.isArray(files)) return this.prepareItems(files)
        return this.prepareItems([])
      },
      deep: true,
    },
    disabled(value) {
      this.setStyleRemoveArchive()
    },
  },
  methods: {
    /**
     * @inheritDoc
     */
    setStyleRemoveArchive() {
      this.$nextTick(() => {
        var style = { display: this.disabled ? 'none' : '' }
        $(`.${this.id}__preview__container .preview .remove-archive`).css(style)
      })
    },
    /**
     * [totalFiles description]
     * @return {[type]} [description]
     */
    totalFiles() {
      var total = 0
      if (this.dropzone) total += parseInt(this.dropzone.files.length)
      if (Array.isArray(this.items)) total += parseInt(this.items.length)
      return total
    },
    /**
     * Render html icon for file by extension
     * @param  {[type]} fileEx [extionsion]
     * @return {[type]}        [description]
     */
    renderHTMLFileType(fileEx) {
      let formated = this.fileTypes.others[fileEx]
      return formated ? formated : this.fileTypes.default
    },
    /**
     * Helper notification
     * @param  {[type]} messageType   [description]
     * @param  {[type]} message       [description]
     * @param  {[type]} messageHeader [description]
     * @return {[type]}               [description]
     */
    handleNotification(messageType, message, messageHeader) {
      if (typeof toastr === 'object') {
        toastr.clear()
        toastr.options = {
          closeButton: true,
          positionClass: 'toast-top-right',
          onclick: null,
          showDuration: 1000,
          hideDuration: 1000,
          timeOut: 10000,
          extendedTimeOut: 1000,
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
        }
        toastr[messageType](message, messageHeader)
      }
    },
    /**
     * Remove file(s)
     * @param  {Boolean} files [description]
     * @return {[type]}        [description]
     */
    dropzoneRemoveFile(files = false) {
      if (!files) return this.dropzone.removeAllFiles(true)
      if (Array.isArray(files))
        for (let i = 0; i < files.length; i++) {
          this.dropzone.removeFile(files[i])
        }
    },
    /**
     * [clearDropzone description]
     * @return {[type]} [description]
     */
    clearDropzone() {
      if (this.dropzone) this.dropzoneRemoveFile()
      this.value.list = this.items = []
      this.value.removeIds = []
      this.$emit('input', this.value)
    },
    /**
     * Init dropzone object
     * @return {[type]} [description]
     */
    initDropzone() {
      if (this.dropzone) return this.dropzoneRemoveFile()
      this.configDropzone()
      this.dropzone = new Dropzone(`#${this.id}`, this.completedConfig)
      this.dropzone.on('sending', file => {
        document.querySelector(
          `#${this.id} + .total-progress .progress`
        ).style.opacity = '1'
      })
      this.dropzone.on('queuecomplete', progress => {})
      this.dropzone.on('addedfile', (file, xhr, formData) => {
        var parent = document.querySelectorAll(
          '.' + this.id + '__preview__container .preview:not(stuff)'
        )
        for (var i = 0; i < parent.length; i++) {
          var item = parent[i].querySelector('.dz-thumb')
          parent[i].querySelector('.dz-thumb').style.animation = 'fadeOut'
          let size = parent[i].querySelector('.dz-size').innerHTML
          size = size.replace('null', 'B')
          parent[i].querySelector('.dz-size').innerHTML = size

          parent[i]
            .querySelector('.dz-thumb')
            .addEventListener('click', event => {
              this.clickView(event.path[0].alt)
            })
        }
        var fileEx = this.getExtension(file.name)
        if (this.supportTypes.indexOf(`.${fileEx}`) === -1) {
          this.dropzone.removeFile(file)
          this.$emit('validation-file-type', this.supportTypes.join(', '))
          return this.handleNotification(
            'error',
            `${this.messages.supportTypes.content} ${this.supportTypes.join(
              ','
            )}`,
            this.messages.supportTypes.title
          )
        }
        if (this.maxFileSizeExceeded(file) !== true) return

        item.className += this.renderHTMLFileType(fileEx)
        this.afterAddedFile(file)
      })
      this.$emit('dropzone', this.dropzone)
      if (this.value && Array.isArray(this.value.list))
        this.prepareItems(this.value.list)
    },
    /**
     * [afterAddedFile description]
     * @param  {[type]} file [description]
     * @return {[type]}      [description]
     */
    afterAddedFile(file) {
      const supportSignature =
        this.signatureSupportFileType.indexOf(this.getExtension(file.name)) >= 0
      let elementSignature = ''
      if (supportSignature) {
        file.uuid = this.uuidv4()
        elementSignature = `<div class="setup-signature new-setup-signature" id="signature-${file.uuid}" style="display:none;">
                              <span class="signature-completed fas fa-check-circle fa-lg" style="color: mediumseagreen; display:none;"></span>
                              Set up for signature
                            </div>`
      }

      var exportTypeElement = Dropzone.createElement(
        `<div class="new-attachment-dropzone">
          ${elementSignature}
        </div>`
      )
      file.previewElement.appendChild(exportTypeElement)
      if (supportSignature) {
        if (this.isRequestSignature) {
          $('.setup-signature').show()
        } else {
          $('.setup-signature').hide()
        }
        $(`#signature-${file.uuid}`).click(() => {
          this.$emit('setup-signature', file)
        })
      }
    },
    /**
     * Set base config dropzone
     * @return {[type]} [description]
     */
    configDropzone() {
      let acceptedFiles = this.supportTypes.join(',')
      let _this = this
      let config = {
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        parallelUploads: 1,
        acceptedFiles: acceptedFiles ? acceptedFiles : null,
        autoQueue: false,
        clickable: [`#${this.id} .content`],
        accept: (file, done) => {
          done()
        },
        previewTemplate: document.querySelector(`.${this.id}__preview`)
          .innerHTML,
        previewsContainer: `.${this.id}__preview__container`,
        maxFiles: this.maxFile == undefined ? null : this.maxFile,
        maxfilesexceeded: function (file) {
          this.removeAllFiles()
          this.addFile(file)
          _this.$emit('validation-file-number', file)
          _this.handleNotification(
            'error',
            `${this.messages.maxFile.content} ${this.maxFile} file(s)`,
            this.messages.maxFile.title
          )
        },
      }
      this.completedConfig = Object.assign(config, this.config)
    },
    /**
     * Parse old file to dropzone items
     * @param  {[type]} files [description]
     * @return {[type]}       [description]
     */
    prepareItems(files) {
      let items = []
      let _this = this
      let className, fileSize, fileName
      files.forEach((file, index) => {
        className = file.className
          ? file.className
          : _this.getClassByPath(file.real_filename)
        fileSize = file.filesize.replace(' ', '')
        fileName = file.filename
          ? file.filename
          : file.name
          ? file.name
          : _this.getNameByPath(file.path)
        items.push({
          id: file.id,
          filesize: fileSize,
          path: file.path,
          name: fileName,
          className: className,
          media_id: file.media_id,
        })
      })
      this.items = items
      return this.items
    },
    /**
     * Get extension of file path
     * @param  {[string]} path [description]
     * @return {[string]}      [description]
     */
    getExtension(path) {
      return path.split('.').pop().toLowerCase()
    },
    /**
     * Get full class for item dropzone ui
     * @param  {[string]} path [description]
     * @return {[string]}      [description]
     */
    getClassByPath(path) {
      var formated = 'dz-thumb'
      var fileEx = this.getExtension(path)
      return (formated += this.renderHTMLFileType(fileEx))
    },
    /**
     * Helper parse filename default wit file path
     * @param  {[string]} path [description]
     * @return {[string]}      [description]
     */
    getNameByPath(path) {
      var name = path.split('/').pop()
      return (name = name.split('.').shift())
    },
    /**
     * Delete old value items
     * @param  {[integer]} id [description]
     * @return {[integer]}    [description]
     */
    deleteThisItem(id) {
      this.items = this.items.filter(function (item) {
        return item.id !== id
      })
      this.value.list = this.items
      if (Array.isArray(this.value.removeIds)) {
        this.value.removeIds.push(id)
      }
      this.$emit('input', this.value)
    },
    /**
     * Helper parse filesize
     * @param  {[type]}  bytes   [description]
     * @param  {Boolean} si      [description]
     * @param  {Number}  tofixed [description]
     * @return {[object]}          [description]
     */
    humanFileSize(bytes, si = false, tofixed = 1) {
      var thresh = si ? this.unitBytes : 1024
      if (Math.abs(bytes) < thresh) {
        return {
          value: bytes,
          unit: 'B',
        }
      }
      var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      var u = -1
      do {
        bytes /= thresh
        ++u
      } while (Math.abs(bytes) >= thresh && u < units.length - 1)

      return {
        value: bytes.toFixed(tofixed),
        unit: units[u],
      }
    },
    /**
     * Helper render filesize
     * @param  {[type]} size [description]
     * @return {[type]}      [description]
     */
    renderFileSize(size) {
      let formated = this.humanFileSize(size, true)
      const unit = formated.unit === null ? '' : formated.unit
      return `${formated.value} ${unit}`
    },
    /**
     * Validation filesize per file and total current files
     * @param  {[dropzone]} file
     * @author  TrinhLe
     * @return {[boolean]}
     */
    maxFileSizeExceeded(file) {
      if (parseInt(file.size / this.unitBytes) > this.maxSizePerFile) {
        this.handleNotification(
          'error',
          `${this.messages.maxSize.content} ${this.renderFileSize(
            this.maxSizePerFile * 1000
          )}`,
          this.messages.maxSize.title
        )
        this.$emit('validate-file-size', file.name)
        this.dropzone.removeFile(file)
        return false
      }

      if (
        parseInt(this.getCurrentFileSize() / this.unitBytes) > 6000 &&
        this.showFileSizeWarning
      ) {
        this.$emit('warning-total-file-size', file.name)
        this.showFileSizeWarning = false
      }

      if (this.maxSize) {
        if (
          parseInt(this.getCurrentFileSize() / this.unitBytes) >
          parseInt(this.maxSize)
        ) {
          this.handleNotification(
            'error',
            `${this.messages.maxTotalSize.content} ${this.renderFileSize(
              this.maxSize * 1000
            )}`,
            this.messages.maxTotalSize.title
          )
          this.$emit('validation-file-size', file.name)
          this.dropzone.removeFile(file)
          return false
        }
      }
      return true
    },
    /**
     * Helper get total current filesize (Bytes)
     * @return {[type]} [description]
     */
    getCurrentFileSize() {
      let currentFileSize = 0.0
      if (Array.isArray(this.items))
        this.items.forEach(item => {
          currentFileSize += parseInt(item.filesize)
        })
      if (this.dropzone && Array.isArray(this.dropzone.files)) {
        this.dropzone.files.forEach(file => {
          currentFileSize += parseInt(file.size)
        })
      }

      if (this.adhocDocuments && Array.isArray(this.adhocDocuments)) {
        this.adhocDocuments.forEach(adhoc => {
          currentFileSize += parseInt(adhoc.filesize)
        })
      }
      return currentFileSize
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
  },
}
