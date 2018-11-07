import baseComponent from '../mixins/text-field-mixins'
export default {
    mixins: [baseComponent],
    data() {
        return {
            contentOutPut : "",
            range:null,
            contentTinyMCE : "",
        }
    },
    props : [ 'checkEdit','id', 'label', 'name', 'disabled', 'class-name', 'content', 'mode', 'tiny-config', 'single-image', 'multiple-image', 'width', 'height', 'images_upload_url', 'images_upload_base_path'],
    beforeDestroy(){
        try{
            if(tinymce.get(this.id) != null && tinymce.get(this.id) != undefined){
                tinymce.get(this.id).destroy()
            }
        }catch(ex){
            console.log(ex)
        }
    },
    created(){
        this.initTinyMCE();
    },
    watch:{
        value(newVal){
            this.callbackUpdateContent(()=>{
                this.initTinyMCE();
            });
        },
        checkEdit(abc){
            if(abc == false){
                tinymce.get(this.id).getBody().setAttribute('contenteditable', false)
            }
            else {
                tinymce.get(this.id).getBody().setAttribute('contenteditable', true)
            }
        }
    },

    methods: { 
        callbackUpdateContent(callback)
        {
            let _tiny = tinymce.get(this.id);
            if(_tiny)
            {
                this.contentTinyMCE  = _tiny.getContent()
                if(this.contentTinyMCE != this.value)
                    _tiny.setContent(this.value)
            }
            else   callback();

            return this.$emit('input', this.value)
        },
        insertSpecialContent(value)
        {
            tinymce.activeEditor.execCommand('mceInsertContent', false, value);
        },
        initTinyMCEBasicMode(){
            var Vue = this
            var readonly = this.checkDisabled()
            var height = (this.height == null || this.height == undefined) ? "300" : this.height
            if( readonly == 1 )
                var toolbar = false
            else
                var toolbar = "cut copy paste | searchreplace | newdocument fullpage | bold italic underline strikethrough | table | alignleft aligncenter alignright alignjustify |  outdent indent blockquote | undo redo | link unlink image code | preview | forecolor backcolor | pagebreak | lineheightselect"
            tinymce.init(
                Object.assign({},
                    {
                        selector: '#' + Vue.id,
                        readonly : readonly,
                        height : height,
                        //custom value of lineheight
                        lineheight_formats:'Single=120% 1.5=180% Double=240%',
                        plugins: [
                            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                            "table",
                            // "autoresize",
                            "image code",
                            "lineheight"
                        ],
                        // autoresize_on_init: false,
                        // autoresize_max_height: 300,
                        force_br_newlines : true,
                        force_p_newlines : true,
                        forced_root_block : '',
                        toolbar: toolbar,
                        menubar: false,
                        convert_urls : true,
                        remove_script_host : false,
                        relative_urls : false,

                        //Upload Fucntion & param
                            toolbar_items_size: 'small',

                            images_upload_url: Vue.images_upload_url,
                            images_upload_base_path: Vue.images_upload_base_path,
                            // images_upload_credentials: true,
                            image_title: true, 
                            // enable automatic uploads of images represented by blob or data URIs
                            automatic_uploads: false,
                            // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                            // images_upload_url: 'postAcceptor.php',
                            // here we add custom filepicker only to Image dialog
                            file_picker_types: 'image', 
                            // and here's our custom image picker
                            file_picker_callback : function(cb, value, meta) {
                                if( Vue.images_upload_url == undefined || Vue.images_upload_url == null){
                                    var input = document.createElement('input');
                                    input.setAttribute('type', 'file');
                                    input.setAttribute('accept', 'image/*');

                                    // Note: In modern browsers input[type="file"] is functional without 
                                    // even adding it to the DOM, but that might not be the case in some older
                                    // or quirky browsers like IE, so you might want to add it to the DOM
                                    // just in case, and visually hide it. And do not forget do remove it
                                    // once you do not need it anymore.

                                    input.onchange = function() {
                                        var file = this.files[0];
                                      
                                        var reader = new FileReader();
                                        reader.onload = function () {
                                            // Note: Now we need to register the blob in TinyMCEs image blob
                                            // registry. In the next release this part hopefully won't be
                                            // necessary, as we are looking to handle it internally.
                                            var id = 'blobid' + (new Date()).getTime();
                                            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                            var base64 = reader.result.split(',')[1];
                                            var blobInfo = blobCache.create(id, file, base64);
                                            blobCache.add(blobInfo);

                                            // call the callback and populate the Title field with the file name
                                            cb(blobInfo.blobUri(), { title: file.name });
                                        };
                                        reader.readAsDataURL(file);
                                    };
                                    input.click();
                                }else
                                    return false
                            },
                        //Upload Fucntion & param

                        init_instance_callback: function (editor) {
                            if(Vue.checkEdit != undefined)
                            {
                                tinymce.activeEditor.getBody().setAttribute('contenteditable', false)
                            }
                            $('tr.mceFirst').css('z-index','1000')

                            let content = Vue.value;

                            if(content != null || content != undefined)
                                this.setContent(content)
                            editor.on('keyup', function (e) {
                                if(e.which == 13){
                                    Vue.$emit('event',e.which)
                                }
                                if(this.getContent() != ""){
                                    if( Vue.classLabel != "active" )
                                        Vue.classLabel = "active"
                                }else{
                                    Vue.classLabel != ""
                                }
                            })
                            
                            editor.on('change', function (e) {
                              
                                Vue.range = this.selection.getRng().startOffset;     // get range

                                Vue.$emit('range',Vue.range)
                               
                                this.contentOutPut = this.getContent()
                                Vue.update(this.getContent())
                            })

                            editor.on('focus', function (e) {
                                
                                Vue.$emit('focus')
                            })
                        }
                    },
                    this.tinyConfig ? this.tinyConfig : {}
                )
            )
        },
        initTinyMCEAdvanceMode(){
            var Vue = this
            var readonly = this.checkDisabled()
            tinymce.init(
                Object.assign({},
                    {
                        selector: '#' + Vue.id,
                        readonly : readonly,
                        plugins: [
                            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                            "table",
                            // "autoresize",
                            "image code",
                        ],
                        // autoresize_on_init: false,
                        // autoresize_max_height: 300,
                        toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | table",
                        // toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
                        toolbar3: "hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
                        content_css: [
                                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                                '//www.tinymce.com/css/codepen.min.css'],

                        menubar: true,
                        toolbar_items_size: 'small',

                        images_upload_url: Vue.images_upload_url,
                        images_upload_base_path: Vue.images_upload_base_path,
                        // images_upload_credentials: true,
                        image_title: true, 
                        // enable automatic uploads of images represented by blob or data URIs
                        automatic_uploads: true,
                        // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
                        // images_upload_url: 'postAcceptor.php',
                        // here we add custom filepicker only to Image dialog
                        file_picker_types: 'image', 
                        // and here's our custom image picker
                        file_picker_callback: function(cb, value, meta) {
                            var input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');

                            // Note: In modern browsers input[type="file"] is functional without 
                            // even adding it to the DOM, but that might not be the case in some older
                            // or quirky browsers like IE, so you might want to add it to the DOM
                            // just in case, and visually hide it. And do not forget do remove it
                            // once you do not need it anymore.

                            input.onchange = function() {
                                var file = this.files[0];
                              
                                var reader = new FileReader();
                                reader.onload = function () {
                                    // Note: Now we need to register the blob in TinyMCEs image blob
                                    // registry. In the next release this part hopefully won't be
                                    // necessary, as we are looking to handle it internally.
                                    var id = 'blobid' + (new Date()).getTime();
                                    var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                    var base64 = reader.result.split(',')[1];
                                    var blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);

                                    // call the callback and populate the Title field with the file name
                                    cb(blobInfo.blobUri(), { title: file.name });
                                };
                                reader.readAsDataURL(file);
                            };

                            input.click();
                        },
                        table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                        style_formats: [{
                            title: 'Bold text',
                            inline: 'b'
                            }, {
                            title: 'Red text',
                            inline: 'span',
                            styles: {
                                color: '#ff0000'
                                }
                            }, {
                            title: 'Red header',
                            block: 'h1',
                            styles: {
                              color: '#ff0000'
                            }
                            }, {
                            title: 'Example 1',
                            inline: 'span',
                            classes: 'example1'
                            }, {
                            title: 'Example 2',
                            inline: 'span',
                            classes: 'example2'
                            }, {
                            title: 'Table styles'
                            }, {
                            title: 'Table row 1',
                            selector: 'tr',
                            classes: 'tablerow1'
                            }],

                        templates: [{
                            title: 'Test template 1',
                            content: 'Test 1'
                            }, {
                            title: 'Test template 2',
                            content: 'Test 2'
                            }],
                        init_instance_callback: function (editor) {
                            if(Vue.checkEdit != undefined)
                            {
                                tinymce.activeEditor.getBody().setAttribute('contenteditable', false)
                            }
                            $('tr.mceFirst').css('z-index','1000')

                            let content = Vue.value;
                            if(content != null || content != undefined)
                                this.setContent(content)
                            editor.on('keyup', function (e) {
                                if(this.getContent() != ""){
                                    if( Vue.classLabel != "active" )
                                        Vue.classLabel = "active"
                                }else{
                                    Vue.classLabel != ""
                                }
                            })
                            editor.on('blur', function (e) {
                                this.contentOutPut = this.getContent()

                                Vue.update(this.getContent())
                            })

                            editor.on('focus', function (e) {
                                Vue.$emit('focus')
                            })
                        }
                     },
                    this.tinyConfig ? this.tinyConfig : {}
                )
            )
        },
        initTinyMCE(){
            try{
                if(tinymce.get(this.id) != null && tinymce.get(this.id) != undefined){
                    tinymce.get(this.id).destroy()
                }
            }catch(ex){
                console.log(ex)
            }

            if( this.mode == "advance" )
                this.initTinyMCEAdvanceMode()
            else
                this.initTinyMCEBasicMode()

            /* nextTick loaded event */
            this.updateFloatLabel(this.value)
        },
        checkDisabled(){
            if(this.disabled == "disabled")
                return 1
            else
                return 0
        },
        update(data) {
            this.$emit('input', data)
        },
        updateFloatLabel(value) {
            var isEmpty = value == undefined || value == null || value == 0 || value == '' ? true : false;
            if (!isEmpty) {
                this.classLabel = 'active'
            } else
                this.classLabel = ''
        },
    }
}