import dropzoneUpload from './DropzoneUpload.js'
import BRadio from '../themes/ios/Radio.vue'
import BCheckbox from '../themes/ios/CheckBox.vue'
export default {
  components: { BRadio, BCheckbox },
  mixins: [dropzoneUpload],
  watch: {
    items: {
      handler: function (val, oldVal) {
        var vm = this
        if (Array.isArray(val)) {
          val.forEach((item, index) => {
            if (!item.isProcess) item.exportType = 'docx'
            vm.value.list[index].isProcess = item.isProcess
            vm.value.list[index].isInvoiceDocument = item.isInvoiceDocument
            vm.value.list[index].exportType = item.exportType
          })
        }
      },
      deep: true,
    },
  },
  created() {
    /* add prefix support adhoc docx */
    this.fileTypes.others.docx = ' dz-doc show-option-document'
  },
  methods: {
    prepareItems(files) {
      let items = []
      let _this = this
      let className,
        fileSize,
        fileName,
        typeProcess,
        isProcess,
        isInvoiceDocument,
        isSupportSignature
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
        typeProcess = file.exportType
          ? file.exportType
          : file.type_process
          ? file.type_process
          : 'docx'
        isProcess = file.isProcess
          ? file.isProcess
          : file.is_process
          ? file.is_process
          : false
        isInvoiceDocument = file.isInvoiceDocument
          ? file.isInvoiceDocument
          : file.is_invoice_document
          ? file.is_invoice_document
          : false
        isSupportSignature =
          this.signatureSupportFileType.indexOf(this.getExtension(fileName)) >=
          0
        items.push({
          id: file.id,
          filesize: fileSize,
          path: file.path,
          name: fileName,
          className: className,
          exportType: typeProcess,
          isProcess: isProcess,
          isInvoiceDocument: isInvoiceDocument,
          media_id: file.media_id,
          signature: file.signature ? file.signature : {},
          isSupportSignature: isSupportSignature,
        })
      })
      this.items = items
      return this.items
    },
    afterAddedFile(file) {
      file.uuid = this.uuidv4()
      let elementSignature = ''
      var fileEx = this.getExtension(file.name)
      /* handle append export type after added file */
      var idExportTypeElement = Math.floor(Math.random() * 100000) // Create the remove button
      const supportSignature =
        this.signatureSupportFileType.indexOf(fileEx) >= 0
      if (supportSignature) {
        elementSignature = `<div class="setup-signature new-setup-signature" id="signature-${file.uuid}" style="display:none;">
                              <span class="signature-completed fas fa-check-circle fa-lg" style="color: mediumseagreen; display:none;"></span>
                              Set up for signature
                            </div>`
      }

      var exportTypeElement = Dropzone.createElement(
        `<div>
          <div class="form-group document-type export-type-upload">
              <div class="b__components b-checkbox">
                <input name="is-process-${idExportTypeElement}" type="checkbox" class="checkbox__input"> 
                <span class="checkbox__checkmark"></span> 
                <label>Document Process</label>
              </div>
              <div class="document-type-option">
                <div class="b__components b-radio" style="display:none;">
                  <input checked name="export-type-${idExportTypeElement}" value="docx" type="radio" class="radio__input"> 
                  <span class="radio__checkmark"></span> 
                  <label>Docx</label>
                </div> 
                <div class="b__components b-radio" style="display:none;">
                  <input name="export-type-${idExportTypeElement}" type="radio" class="radio__input" value="pdf">
                  <span class="radio__checkmark"></span> 
                  <label>Pdf</label>
                </div>
              </div>
              <div class="invoice-document b__components b-checkbox">
                <input name="is-invoice-document-${idExportTypeElement}" type="checkbox" class="invoice-document checkbox__input"> 
                <span class="checkbox__checkmark"></span> 
                <label>Invoice Document</label>
              </div>
          </div>
          ${elementSignature}
        </div>`
      )
      file.previewElement.appendChild(exportTypeElement)
      /* register event js for review document */
      $(`input[name="is-process-${idExportTypeElement}"]`).change(function () {
        if ($(this).is(':checked') == true) {
          $(this).parent().siblings().children('.b-radio').css('display', '')
        } else {
          $(this)
            .parent()
            .siblings()
            .children('.b-radio')
            .css('display', 'none')
        }
      })

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
      this.isInvoicingMail
        ? $('.invoice-document').show()
        : $('.invoice-document').hide()

      /* end register event js for review document */
      if (fileEx != 'docx') {
        let element = $(`input[name="is-process-${idExportTypeElement}"]`)
        element
          .closest('.preview')
          .find('.export-type-upload')
          .css('display', 'none')
        element
          .closest('.preview')
          .find('.dz-size')
          .removeClass('dz-document-bonus')
          .addClass('dz-document-none')
      }
    },
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
  },
}
