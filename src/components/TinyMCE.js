import baseComponent from '../mixins/text-field-mixins'
import { Props, Variables, SvgLogo, TinyConfig } from '../props/tinymce';

export default {
    mixins: [baseComponent],
    data() {
        return {
            ...JSON.parse(JSON.stringify(Variables))
        }
    },
    props: [...JSON.parse(JSON.stringify(Props))],
    computed: {
        isDisabled(){ return (this.disabled == "disabled") ? 1 : 0 },
        isReadOnly(){ return ((this.checkEdit != undefined) && (!this.checkEdit || this.disabled == "disabled")) ? 1 : 0 }
    },
    beforeDestroy(){
        try{
            if(tinymce.get(this.id) != null && tinymce.get(this.id) != undefined){
                tinymce.get(this.id).destroy()
            }
        }catch(ex){}
    },
    mounted(){
        var _this = this;
        $(document).ready(function () {
            _this.registerTinymce();
            _this.eventListener();
        });
    },
    watch:{
        value(newContent){
            var _tiny = tinymce.get(this.id);
            if(_tiny){
                this.contentTinyMCE  = _tiny.getContent()
                if(this.contentTinyMCE != newContent)
                    _tiny.setContent(newContent);
            }
            return this.$emit('input', newContent)
        },
        checkEdit(isEdit){
            tinymce.get(this.id).setMode('code')
            // $('.tox-menubar').removeClass('d-none');
            // $('.tox-toolbar').removeClass('d-none');
            if(isEdit == false) {
                tinymce.get(this.id).setMode('readonly');
                // $('.tox-menubar').addClass('d-none');
                // $('.tox-toolbar').addClass('d-none');
            }
            this.$nextTick(function(){
                tinymce.get(this.id).getBody().style.padding = "25px";
            })
        }
    },
    methods: {
        /**
         * [validateTinymce check validation exists lib]
         * @auhor TrinhLe
         * @return {[boolean]} [description]
         */
        validateTinymce(){},
        /**
         * Register event listener
         * @author TrinhLe
         * @return {[type]} [description]
         */
        eventListener(){
            $(document).on('focusin', function(e) {
                if ($(e.target).closest(".tox-dialog").length) {
                    e.stopImmediatePropagation();
                }
                $('.tox-dropzone button input').attr({'accept':'image/jpg,image/png,image/jpeg'})
            });

            $.widget("ui.dialog", $.ui.dialog, {
                _allowInteraction: function(event) {
                    return !!$(event.target).closest(".tox-editor-container").length || this._super( event );
                }
            });
        },
        /**
         * Register new instance tinymce
         * @author TrinhLe
         * @return {[type]} [description]
         */
        registerTinymce()
        {   
            /**
             * Remove old instance
             */
            try{
                if(tinymce.get(this.id)){
                    tinymce.get(this.id).destroy()
                }
            }catch(ex){}

            this.loadingContent();
            this.initTinyEditor().then(async ()=> {
                this.loadingContent(false);
                await this.$nextTick();
                this.updateFloatLabel(this.value);
            });
        },
        /**
         * Register hook action after init instance
         * @param  {[type]} editor [description]
         * @return {[type]}        [description]
         */
        init_instance_callback(editor){
            var _this = this;
            editor.getBody().setAttribute('class', "arc-custom-editor-body");
            editor.getBody().setAttribute('style', "overflow-y: scroll !important; font-family: 'Open Sans',sans-serif !important; font-size: 15px !important; padding: 0.5em;");

            if(this.checkEdit){
                editor.getBody().setAttribute('contenteditable', false);
                editor.getBody().style.padding = "25px";
            }
            $('tr.mceFirst').css('z-index','1000')
            editor.setContent(this.value ? this.value : '');
            editor.on('keyup', function (e) {
                if(e.which == 13)
                    _this.$emit('event',e.which)

                if(this.getContent() != ""){
                    if( _this.classLabel != "active" )
                        _this.classLabel = "active";
                    return;
                }
                return _this.classLabel = "";
            })

            editor.on('change', function (e) {
                _this.range = this.selection.getRng().startOffset;     // get range
                _this.$emit('range',_this.range)
                this.contentOutPut = this.getContent()
                _this.$emit('input', this.getContent());
            })

            editor.on('focus', function (e) {
                _this.$emit('focus')
            })

            $('#open').click(function() {
                $("#dialog").dialog({
                    width: 800,
                    modal: true
                });
            });
        },
        /**
         * Register hook action custom file picker to those dialogs
         * @param  {Function} callback [description]
         * @param  {[type]}   value    [description]
         * @param  {[type]}   meta     [description]
         * @return {[type]}            [description]
         */
        file_picker_callback(callback, value, meta)
        {
            var _this = this;
            $('.tox-dropzone .tox-button ').trigger('click')
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/jpg,image/png,image/jpeg');
            input.onchange = function() {
                $(".tox-dialog__busy-spinner").remove();
                var elLoading = "<div class=\"tox-dialog__busy-spinner page-loader arc-auto arc-loading-plugin\"> " + SvgLogo + " </div>";
                if($('.tox-dialog'))
                    $('.tox-dialog').append(elLoading);
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function () {
                    var xhr, formData;
                    xhr = new XMLHttpRequest();
                    xhr.withCredentials = false;
                    xhr.open('POST', _this.images_upload_url);
                    var json;
                    xhr.onload = function() {
                        if (xhr.status != 200) {
                            failure('HTTP Error: ' + xhr.status);
                            return;
                        }
                        json = JSON.parse(xhr.responseText);
                        if (!json || typeof json.location != 'string') {
                            failure('Invalid JSON: ' + xhr.responseText);
                            return;
                        }
                        $(".tox-dialog__busy-spinner").remove();
                    };
                    formData = new FormData();
                    formData.append('file',file, file.name);
                    xhr.send(formData);
                    callback(json.location);
                };
                reader.readAsDataURL(file);
            };
            input.click();
        },
        /**
         * Custom upload handle
         * @param  {[type]} blobInfo [description]
         * @param  {[type]} success  [description]
         * @param  {[type]} failure  [description]
         * @return {[type]}          [description]
         */
        images_upload_handler(blobInfo, success, failure)
        {
            if(blobInfo.blob().type == 'image/gif'){
                $('.tox-dialog__busy-spinner').remove();
                return;
            }
            var _this = this;
            setTimeout(function() {
                var xhr, formData;
                xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', _this.images_upload_url);
                xhr.onload = function() {
                    var json;
                    if (xhr.status != 200) {
                        failure('HTTP Error: ' + xhr.status);
                        return;
                    }
                    json = JSON.parse(xhr.responseText);
                    if (!json || typeof json.location != 'string') {
                        failure('Invalid JSON: ' + xhr.responseText);
                        return;
                    }
                    success(json.location);
                };
                formData = new FormData();
                formData.append('file', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            }, 1000);
        },
        /**
         * [insertSpecialContent description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        insertSpecialContent(value){
            tinymce.get(this.id).execCommand('mceInsertContent', false, value);
        },
        /**
         * [initTinyEditor description]
         * @return {[type]} [description]
         */
        initTinyEditor()
        {
            var _this = this
            tinymce.init(
                Object.assign({},{
                    ...JSON.parse(JSON.stringify(TinyConfig)),
                    selector: `#${this.id}`,
                    templates: this.template ? this.template : [],
                    toolbar1: this.isDisabled ? false : this.toolbar1,
                    images_upload_handler: this.images_upload_handler,
                    file_picker_callback : this.file_picker_callback,
                    init_instance_callback: this.init_instance_callback,
                    readonly : this.isReadOnly,
                }, this.tinyConfig ? this.tinyConfig : {})
            );
            return new Promise((resolve) => resolve());
        },
        /**
         * [updateFloatLabel description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        updateFloatLabel(value) {
            var isEmpty = value == undefined || value == null || value == 0 || value == '' ? true : false;
            if (!isEmpty)
                return this.classLabel = 'active';
            return this.classLabel = '';
        },
        /**
         * [loadingContent description]
         * @param  {Boolean} isLoad [description]
         * @return {[type]}         [description]
         */
        loadingContent(isLoad = true){
            let options = { element : `.loading-tiny` };
            if ("undefined" !== typeof ARCLoading) {
                isLoad ? ARCLoading.open(options) : ARCLoading.close(options);
            }
        }
    }
}