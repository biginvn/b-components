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
    props : [ 'checkEdit','id', 'label', 'name', 'disabled', 'class-name', 'content', 'tiny-config', 'single-image', 'multiple-image', 'width', 'height', 'images_upload_url', 'images_upload_base_path', 'template'],
    beforeDestroy(){
        try{
            if(tinymce.get(this.id) != null && tinymce.get(this.id) != undefined){
                tinymce.get(this.id).destroy()
            }
        }catch(ex){}
    },
    mounted(){
        this.initTinyMCE();
        $(document).on('focusin', function(e) {
          if ($(e.target).closest(".mce-window").length) {
            e.stopImmediatePropagation();
          }
        }); //charm for tiny mce in modal :))
        $.widget("ui.dialog", $.ui.dialog, {
            _allowInteraction: function(event) {
                return !!$(event.target).closest(".mce-container").length || this._super( event );
            }
        });//charm for tiny mce in modal :))
    },
    watch:{
        value(newVal){
            let self = this;
            this.$nextTick(()=>{
                self.callbackUpdateContent(()=>{
                    self.initTinyMCE();
                });
            })
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

        initTinyEditor(){
            var self = this
            var readonly = this.checkDisabled()
            var height = (this.height == null || this.height == undefined) ? "500" : this.height
            if( readonly == 1 )
                var toolbar1 = false
            else
                var toolbar1 = 'formatselect | bold italic strikethrough forecolor backcolor | link image| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent lineheightselect | removeformat';
            tinymce.init(
                Object.assign({},{
                    selector: '#' + self.id,
                    readonly : readonly,
                    height : height,
                    lineheight_formats:'Single=75% 1.5=150% Double=200%',
                    theme: 'modern',
                    plugins: "advlist autolink autoresize autosave bbcode charmap code codesample colorpicker contextmenu directionality emoticons fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern toc visualblocks visualchars wordcount",
                    toolbar1: toolbar1,
                    templates: (self.template == null || self.template == undefined) ? [] : self.template,
                    content_css: [
                        'https://fonts.googleapis.com/css?family=Montserrat',
                        '//www.tinymce.com/css/codepen.min.css'
                    ],
                    // images_upload_url: self.images_upload_url,
                    // images_upload_base_path: self.images_upload_base_path,
                    // target_list: [
                    //     {title: 'None', value: ''},
                    //     {title: 'Same page', value: '_self'},
                    //     {title: 'New page', value: '_blank'},
                    //     {title: 'LIghtbox', value: '_lightbox'}
                    // ],
                    default_link_target: "_blank",
                    force_br_newlines : true,
                    force_p_newlines : true,
                    convert_urls : true,
                    remove_script_host : false,
                    relative_urls : false,
                    automatic_uploads : false,
                    image_title: true, 
                    file_picker_types: 'image',
                    images_upload_handler: function (blobInfo, success, failure) {
                        // hook Tiny after select file in upload image implement upload file server side todo...
                        // remove tiny basic loading when upload request. that real: we must be change css in class "mce-throbber" to another svf
                        $(".mce-throbber").remove();
                        var svgLogo = '<div class="logo-loader"><svg viewBox="0 0 400 400"><path class="path-1" d="M76.78,283.74v3.13H78.7c-.65-1-1.29-2.08-1.92-3.13Z" /><path class="path-2" d="M78.16,286.87h.55c-.66-1-1.3-2.1-1.93-3.15v1c.45.74.91,1.46,1.38,2.19Z" /><path class="path-2" d="M80.63,289.78H80.1a151.82,151.82,0,0,0,45.7,43.7,150,150,0,0,1-45.17-43.7Z" /><path class="path-2" d="M215.05,270.53h3.33l8.41,19.25h-3.46l-1.84-4.34h-9.71l-1.84,4.34h-3.38l8.49-19.25Zm25.69,0h15.43v2.91h-6.11v16.34h-3.24V273.44h-6.08v-2.91Zm39.19-154.79c1.81,1.72,4.74,2,5.91,4.61.22.49,1.08.69,1.64,1,.18-.56.34-1.13.53-1.68.59-1.64,1.12-3.3,1.8-4.89s1.65-3.13,2.3-4.76c.47-1.16,1-1.81,2.35-1.56,2.55.47,4.52-.6,6.27-2.37s4-.38,5.9-.07c2.26.36,3.38-.13,3.37-2.14a2.61,2.61,0,0,0-.56-1.54c-1.2-1.5-2.05-3-1.61-5.08.16-.75-.89-1.76-1.61-3.06a12.51,12.51,0,0,1,1.35.89,148.38,148.38,0,0,1,29.15,37.29c.7,1.28.46,3.08,1.15,4.37,1.6,3,1.38,6.94,4.73,9,.39.24.56,1,.68,1.53.35,1.7.59,3.42,1,5.11.23,1,.81,1.76-.31,3-.85.92-.6,2.9-.79,4.42s-.89,1.37-2.05.54c.12.72.2,1.23.29,1.77h-2.55c2.65,3.64,5.07,7.05,4.25,11.74-1.43-.48-2.84-1-4.29-1.42s-2.16.39-2,1.9c.28,2.3.22,4.64.39,7,.13,1.87.4,3.73.63,5.6,0,.15.26.3.43.41l3.31,2.12,2.43-.63c1-.27,2-3.08,1.89-4.66a11.15,11.15,0,0,1,.21-3.31c.37-1.65.93-3.25,1.44-5l1.07.71c.31-.46.63-.95,1-1.43a61,61,0,0,1,5.21,15.17,150.72,150.72,0,1,0-281.24,88.9v-1.17c-2.14-3.92-4.15-8-6-12.13-27.18-62.43-8.83-132.6,38.58-173.29l-2,2.35,1.21.69c-2.88,2.45-5.84,4.77-8.57,7.34a10.64,10.64,0,0,0-3.53,7.4c0,.58.74,1.19,1.29,2-2.3,4.29-7.53,6.39-10,10.78l.68.65c2.82-2.29,5.74-4.49,8.43-6.92,3.12-2.79,6-5.81,9-8.73.16-.14.35-.37.52-.36,3.19.21,5.17-2.56,8-3.25,3.46-.84,6.38.74,7.36,4.19.33,1.12,1.32,2,1.73,3.16a20.06,20.06,0,0,1,.73,3.64c.59,3.5,1.22,7,1.69,10.5.27,2,.25,4.08.34,6.12a11.33,11.33,0,0,0-.12,1.27c.89,4.79-.49,9.41-1.43,14-.7,3.38-2.74,6.47-4,9.74a50.94,50.94,0,0,0-1.58,5.46c-.11.41.06.92-.12,1.27-1.94,3.86-.59,7.51.64,11.18a2.74,2.74,0,0,1,.09,1.27,14,14,0,0,0,.85,7.92,3.75,3.75,0,0,0,1.5,1.76c3,1.57,5.14,3.63,5.3,7.26a3.75,3.75,0,0,0,.66,2,12.54,12.54,0,0,0,1.92,1.78l1.67-2.09c1.56,0,1.95,1.4,1.91,2.49-.09,2.42,1.13,4.21,2.29,6.06,1,1.57,2,3,3.07,4.56.08.12.28.21.29.31.07,3.39,3,5,4.63,7.34,1.79,2.67,3.38,5.31,2.34,8.88-.29,1,.69,2.87,1.65,3.65,4.73,3.86,10.34,6.22,15.9,8.6a6.66,6.66,0,0,0,5.36,0,4,4,0,0,1,3.14.68c1.44,1,2.59,2.41,4,3.55a5.35,5.35,0,0,0,1.92.88c2.49.75,5.26,1,7.41,2.29a12.84,12.84,0,0,1,4.29,5.2,4.64,4.64,0,0,0,2.63,2.7c.83.32,1.44,1.22,2.18,1.81.52.41,1.13,1.09,1.64,1a6.91,6.91,0,0,1,4.87,1.59c1.68,1.23,2.08.9,2.75-1.09a10,10,0,0,1,1.71-2.31c.49.35,1.12.56,1.33,1,1.76,3.42,3.51,7,2.57,10.88a8.92,8.92,0,0,1-5.15,5.91c-.87.37-2,.46-1.41,2.05.21.57-.39,1.56-.82,2.23-1.54,2.38-1.27,3.54,1.25,4.85-2.93,1.88-3.41,2.93-2.79,6.42a1.32,1.32,0,0,0,.79.88c3.48.76,4.15,4,5.83,6.41,2.62,3.69,5.1,7.49,7.91,11,.89,1.11,2.67,1.51,4,2.25,1.85,1,3.72,2,5.51,3.1a2.15,2.15,0,0,1,.93,1.54c-.21,4.85-.54,9.68-.83,14.53a58.63,58.63,0,0,1-.44,6.5c-.38,2.18-1.21,4.28-1.79,6.43a11.14,11.14,0,0,0-.35,2.23,6.27,6.27,0,0,0,.13,1.94c.23.8.47,2,1,2.22,1.77.72,1.44,2.05,1,3.16-1.13,3-.42,4.92,2.42,5.89,3.06-.38,6.08-.86,9.08-1.42-.59-.21-1.24-.53-1.93-.74,1.53-1.17,2.71-2,3.81-3,.09-.08-.38-.81-.08-1.09.46-1.64.93-3.27,1.42-5a23.85,23.85,0,0,0,2.47-.15c.54-.08,1.41-.29,1.51-.63,1-3.32,4.23-2.58,6.46-3.5,2.06-.84,3.55-1.89,4-4.17a1.82,1.82,0,0,1,1.29-1.13c3.51-.33,5.05-3,6.86-5.47a13.69,13.69,0,0,1,3.17-3.14c2.05-1.41,3.91-2.74,4.11-5.58a4.55,4.55,0,0,1,1.6-2.77,64.07,64.07,0,0,1,6.21-4.49,4.8,4.8,0,0,1,2.95-1c2.26.44,3.37-1.09,4.31-2.39a33,33,0,0,0,5.43-12.59c.57-2.63,2.94-4.91,4.62-7.26.9-1.27,2.12-2.31,3.08-3.55,1.63-2.09,1.59-4.47.73-6.83-.14-.4-1-.54-1.52-.8-1.17-.56-2.35-1.1-3.52-1.67s-2.41-1.59-3.71-1.77a68.16,68.16,0,0,0-7.16-.22,4.34,4.34,0,0,1-1-.16v15.58h-3.25V273a30,30,0,0,1-5.29-2.44c-1.21-.75-1.64-2.78-2.38-4.25-.41-.82-.75-1.68-1.12-2.52-1.8-4-4.74-5.82-9.1-5.29-2.9.35-4.9-.85-6.53-3.06a3.42,3.42,0,0,0-.89-.89c-2.26-1.43-4.53-2.84-6.8-4.25-.36-.23-.91-.35-1.06-.67-.88-1.87-2.34-1.43-3.62-.81-1.46.69-2.61,1.22-4.31.23-1-.59-2.62-.11-4-.11-1.79-3.89-5.07-1.33-7.9-1.68l.81-2.09c-1.2.07-2.49-.25-3,.23-1.63,1.62-3.76,1.46-5.63,2.17a8.71,8.71,0,0,0-3.1,2.61c-1.07,1.21-1.93,2.61-3,4.09-2.8-3.31-5.6-3.22-8.73-1.53a3.91,3.91,0,0,1-2.5-.24c-2.56-.79-4.21-4.31-3.5-6.87.59-2.1,1-4.27,1.37-6.41.21-1.16-1.7-2.53-3.8-2.6-2.82-.09-5.65,0-8.31,0,.15-1.44.26-2.59.38-3.75,0-.14,0-.37.05-.41,2.74-1.67,1.64-5.06,3.23-7.26a8,8,0,0,0,.71-2.72,8.11,8.11,0,0,0-2.29-.43,23.89,23.89,0,0,0-5.41.89c-.74.24-1.18,1.47-1.72,2.28-.82,1.26-1.33,2.89-2.46,3.73-2.64,2-8,1.49-9.9-1.13s-4.6-5.53-3.3-9.59c.71-2.19,1.16-4.46,1.68-6.71a6,6,0,0,0,0-1.69c-.24-3.73,1.13-5.72,4.66-6.8a4.51,4.51,0,0,0,1.36-.6c2.89-2.24,5.67-1.65,8.7-.13,1.34.68,3.14.45,5,.67-.26-.61-.37-.92-.51-1.19-.83-1.62-.26-2.67,1.53-2.68s3.4.11,5.11.16a.78.78,0,0,1,.21,0c1.79.64,3.35,2.76,5.55.93.73,1.29,2.08,2.59,2.06,3.87-.06,3.42,1.76,6,3.09,8.88.11.23,2.08.11,2.34-.34a6.48,6.48,0,0,0,.81-5.64,39.62,39.62,0,0,1-1.46-9.17c-.17-2.73,2.24-3.68,4.15-4.89.81-.51,1.55-1.13,2.33-1.68,1.9-1.35,3.9-2.57,5.67-4.08a7,7,0,0,0,2.32-3.29c.41-1.59.25-3.09,1.47-4.69,2.06-2.7,3.24-6.07,5.09-9,.56-.9,2-1.37,3.18-1.69,1.42-.39,3-.34,4.42-.64a9.82,9.82,0,0,0,2.23-1.18c-2.57-1.11-1.57-2.57-.92-3.79a4.06,4.06,0,0,1,1.89-1.65c2.78-1.2,5.62-2.25,8.51-3.38-.45.57-1.2,1.11-1.22,1.69a4,4,0,0,0,.71,2.74,2.53,2.53,0,0,0,2.46-.35c1.32-1.61,3.12-1.94,4.89-2.6a72.85,72.85,0,0,0,6.64-3.15l-2.4-3.43a16.91,16.91,0,0,1-.94,2.07c-1.07,1.7-2.72,1.42-4.17.83-2.09-.86-2.84-2.5-2.28-4.38a10.76,10.76,0,0,1,.86-2.14c1-1.88.17-3.47-2-3.5a25.45,25.45,0,0,0-3.2.31,3.37,3.37,0,0,1,4.18-2.76c2.31.32,4.59,1,6.91,1.16s5,.55,6.89-1.78c.55-.66,1.82-.73,3-1.16a45.18,45.18,0,0,1-2.28,5.29,46.85,46.85,0,0,1-3.47,4.46c1.51.2,2.88.28,4.19.58s2.47,1,3.74,1.18a7.29,7.29,0,0,0,2.36-.38,8.85,8.85,0,0,0,.66,2.08c.22.41.89.57,1.36.85.08-.55.37-1.16.21-1.61-.38-1-1.21-1.85-1.44-2.86a12,12,0,0,1,.12-3.16l-3.55-.42.36-.45-1.5-2.55a5.79,5.79,0,0,1,.87-1.11c2.23-2.06,1.47-4.77,1.58-7.26,0-.46-.72-1-1.16-1.43-.29-.29-1-.47-1-.71-.1-3.87-4.3-4-5.9-6.58-.63-1-2.13-1.37-1-3.08.37-.55-.25-1.86-.57-2.76-1-2.86-2.08-5.7-3.19-8.53a6,6,0,0,0-1.06-1.35,21.69,21.69,0,0,1-2.76,4,7,7,0,0,1-3.83,2c-1.12.08-2.41-3.29-2.11-4.69.23-1,.53-2,.88-3.41-3-.4-4-3.29-6.06-4.58-2.28-1.44-5.4-1.53-8.18-2.1a1.46,1.46,0,0,0-1.16.8,18.46,18.46,0,0,0-.94,4.81c0,1.36.13,2.47-1.13,3.35a5.3,5.3,0,0,0-1.74,1.85,2.49,2.49,0,0,0-.07,2.08c3,4.51,1.93,7.78-3.37,9.47a13.25,13.25,0,0,0-2.24.68,1.78,1.78,0,0,0-.81,1.27c0,2.37.36,4.78.05,7.1-.13.93-1.63,1.68-2.53,2.55l-2-3a3.42,3.42,0,0,1-.53-3.71,18.58,18.58,0,0,0,1.09-4.51c.05-.4-.51-.94-.88-1.33-.15-.17-.54-.15-.82-.15-3.9-.09-6.43-2.46-9-5a7.87,7.87,0,0,0-7.14-2.47v-5.37c-.74-.13-1.42-.24-2.55-.41.74-1.6,1.11-3.29,2.11-4.42,2.79-3.08,5.65-6.15,10-7.26,1.18-.3,2.14-1.49,3.19-2.28.28-.22.58-.72.78-.67,3.61.82,5.28-2,7.44-3.92.07-.07.25,0,.92,0l-2.9,4.59c.49.65,1.06,1.38,1.84,2.4a25.28,25.28,0,0,0,2.63-1.5c1.27-.91,2.22-1.21,3.31.39a1.69,1.69,0,0,0,2.72.4c-1-1.38-2.09-2.64-3-4s-3.39-1.81-2.54-4.47a10.07,10.07,0,0,0,7.38-.54c2.37-1,2.23-2.1,1.45-3.82,2.83-1.61,3-2.09,1.07-4.7l7.73.83c.29.66.88,2,1.37,3.07a40.51,40.51,0,0,1,3.88,3.87,1.61,1.61,0,0,1-.81,2.72,6.83,6.83,0,0,0-2,1.23,10.1,10.1,0,0,0-1.31,1.7c.12.28.23.56.35.85a35.26,35.26,0,0,0-5.08-.51A6.73,6.73,0,0,0,231.53,96c-.21.11-.3,1-.19,1a8,8,0,0,0,2.44,1,20.16,20.16,0,0,0,3.3,0,5.2,5.2,0,0,1,4.4,3.64c.08.46.07,1.14.36,1.32,2.56,1.61,5.17,3.13,7.79,4.65.2.12.52,0,1.27,0l-3.47-4.78.24-.34,5,3.16c1.66-1.59,1.47-3.5-.45-5.67A16.33,16.33,0,0,1,250,96.87a1.53,1.53,0,0,1,2.16-1.73,21.17,21.17,0,0,1,2,2.61c.61.8,1.26,1.56,2.23,2.76.31-1.23.46-1.8.65-2.53.31,0,.79.08,1.09-.11a21.42,21.42,0,0,0,1.89-1.56c-.43-.49-.83-1-1.3-1.44-1.94-1.87-3.95-3.67-5.81-5.63a2,2,0,0,1,0-1.95c1.77-1.64.47-2.94-.63-3.68-1.42-1-3-1.58-3.65-3.33a1.14,1.14,0,0,0-.83-.61c-2.68-.19-3.75-2.67-4.06-4.32-.61-3.28-3.2-2.9-5.09-3.64-1.54-.61-3.36-.43-5-.77-.63-.14-1.11-.91-1.75-1.15-3.14-1.15-8.27.66-10.05,3.47-1.61,2.54-1,4.24,1.81,5.28.54.2,1.42.84,1.35,1.1a5.1,5.1,0,0,1-1.21,2.55,44.47,44.47,0,0,1-4.36,3.27,5.49,5.49,0,0,1,.16-2A2.31,2.31,0,0,0,218.26,80a7.3,7.3,0,0,1-1.57-1.19V72.1c1.08-.54,2-1.36,3.91-1.15,1.57.18,3.34-1.44,5-2.27,0-.28-.05-.56-.08-.84-2.34-.3-4.9-1.33-7-.7s-3.38,3-5.3,4.76c.56-1.84,1-3.32,1.48-4.82-4.07-1.41-5.4-1.07-5.56,1.59-.13,0-.27.15-.39.13-.94-.19-1.87-.4-2.82-.6.42.83.82,1.67,1.25,2.5.34.68.72,1.34,1.13,2.11l3.08-.74a39.62,39.62,0,0,0-2.93,4.64c-.21.44.78,1.44,1.31,2.33-1.77,3.26-1.77,3.26-4.4,2.14l3.29-.66-1.9-3.63L202.72,79l.69.88a9.58,9.58,0,0,0-1.58.75,7.62,7.62,0,0,1-9.35-.73c-.15-.15-.34-.36-.33-.53.16-2.29-1.42-2-2.91-1.87l.12-.72c1,.16,2.09.26,3.11.51a36.32,36.32,0,0,0,4,1.11c.48.06,1.05-.87,1.63-1.27a4.16,4.16,0,0,1,1.37-.67,19.73,19.73,0,0,1,2.33-.3c-1.14-1.62-1.95-2.76-2.7-3.81a21.12,21.12,0,0,1,2.5-4,16.67,16.67,0,0,1,3.63-2.21c-.07-.27-.14-.54-.22-.81-1.9.2-4,0-5.68.7a14.61,14.61,0,0,0-3.78,3.14c0,.28,0,.56,0,.84l-.55-.3c.2-.17.4-.35.59-.54l.12-2.57-2,.57c-.45-.28-1.16-1-1.9-1.07-1.15,0-1.4-.64-1.39-1.47,0-1.46-.71-1.8-2-1.81s-2.46-.43-3.7-.45c-4.78-.06-7.93,3.85-12.2,4.81.08,1,.14,1.74.22,2.86l7.07-1.92c-.29.7,0,2.11-1.46,2.58.32.43.59,1.15,1,1.21,1.18.19,2.41.1,3.61.19.79.06,1.57.25,2.36.38l-.06.61c-1.53-.11-3.06-.23-4.59-.33a2.88,2.88,0,0,0-1.06,0c-1.1.43-2.17.94-3.25,1.42L179,77c-.16.83.22,1.67,1.95,1.4,2.12-.32,4.25-.5,6-.69-.61.92-1.43,2.17-2.38,3.63-1.27-1.78-2.73-1.92-4.57-1.41a16.49,16.49,0,0,1-4.22.07V79.4a4.25,4.25,0,0,0,1.2-.22,13.73,13.73,0,0,0,1.59-1.06c-.56-.63-1.08-1.75-1.7-1.81a11.88,11.88,0,0,1-6.1-2.5c-1.38-1-3.68-.84-5.76-1.22V71.11c-.29-.06-.55-.2-.69-.13-3,1.64-6.54,1.43-9.71,2.58a49.26,49.26,0,0,1-6.3,1.49c-4.83-2.4-9.9-2.71-15.67-1.52,32.48-17.43,66.35-22.43,102-15.41-.32.05-.73,0-.94.17-.48.42-1.08.9-1.2,1.46-.07.32.61,1,1.08,1.21a22.22,22.22,0,0,0,2.85.81c-.77,1.46-2.63,2-5.26,1.36-1.61-.39-3.17-1-4.77-1.47-.89-.27-1.81-.42-2.73-.63-.12.31-.25.61-.38.9l3.26,1.79-1.38,2.52a22,22,0,0,0,3,1.3c3,.84,6.15,1.51,9.2,2.35a5,5,0,0,0,4.91-1.25c-3.39-3.4-8.58-1.32-12.12-4.39a15.78,15.78,0,0,1,2.77.21c3.29.83,6.53,1.84,9.83,2.58.71.15,1.65-.52,2.42-.92.47-.25.82-1,1.25-1,4.72-.19,9.52-1.31,14.07,1a7.69,7.69,0,0,1,2.67,1.8l-8.52-1.78-.18.5c.22.23.4.59.66.66,1.41.42,2.46.93,2.1,2.79-.09.44.65,1.34,1.2,1.56,3.1,1.28,6.36,2.23,9.36,3.71,1.15.56,1.95,2.11,2.58,3.38,1,2,2.2,3.82,2,6.35-.16,1.7.18,3.46-.14,5.26a2.16,2.16,0,0,0,2.19,2.4,3.64,3.64,0,0,1,2,1.29c-2.67,0-5,3.12-3.91,5.63,1.55,3.59,3.42,7,5,10.61.47,1,.34,2.38.77,3.47a6.59,6.59,0,0,0,1.7,2Z" /><path class="path-2" d="M332.27,147.88c.26.93.62,2.16.92,3.41a10.86,10.86,0,0,0,.45,2.13,1.71,1.71,0,0,0,1.53-.1,5.64,5.64,0,0,0,.79-2.27,29.84,29.84,0,0,0,.14-3h0c-.75-.71-1.48-1.42-2.1-2l-1.73,1.83Z" /><path class="path-2" d="M336.13,148.08v0h0l0,0Z" /><path class="path-2" d="M321.21,120.91a6.62,6.62,0,0,0-.46-2.2c-1.69-2.71-4.07-3.32-7.61-1.74a43.53,43.53,0,0,0,5,4.12c.73.44,2.05-.09,3.1-.18Z" /><path class="path-2" d="M338.26,151.52c-.41,1.86-.75,3.34.81,4.63l-1,1.79,4.52.27c-.45-1.43-.9-2.66-1.22-3.92-.93-3.71-4-6.46-4.42-10.49-.13-1.39-1.52-2.65-2.34-4a2.79,2.79,0,0,0-.55.13c.21,1.1.36,2.24.65,3.34.42,1.6.94,3.18,1.4,4.76a2.79,2.79,0,0,1,2.14,3.46Z" /><path class="path-2" d="M344.21,262.43a150.27,150.27,0,0,0,11.29-57.31c0-1.82-.05-3.64-.11-5.45-.05.81-.11,1.62-.2,2.44-.5-3.65-3.47-6-2.7-9.69.15-.75-.78-2.43-1.3-2.47-1.58-.12-3.56-.14-4.74.7-2.22,1.6-3,1.92-4.76.56a40.09,40.09,0,0,0-3.08,5,13.43,13.43,0,0,0-1,4.86,7.08,7.08,0,0,1-2.78,5.64,11.41,11.41,0,0,0-2.87,4.05,55.67,55.67,0,0,0-3.42,8.91c-.45,1.72.31,3.72.15,5.55-.22,2.59-.78,5.16-1.19,7.73s-.86,4.82,1.33,7.09c1.25,1.29,1.33,3.69,2.07,5.53a28.63,28.63,0,0,0,1.8,3.36c.09.18.35.25.48.4.86.93,1.57,2.39,2.58,2.62.83.19,1.92-1.42,3-1.63,2.67-.5,4.19-2.38,5.88-4.13a7.16,7.16,0,0,1,1.53-.91c.1,1,.17,1.73.26,2.64l1.95-.79c-.52,1.94-1,3.49-1.35,5.06-.87,3.44-1.73,6.88-2.8,10.25Z" /><path class="path-2" d="M125.8,333.48c.89.55,1.79,1.1,2.68,1.63-.9-.53-1.79-1.09-2.68-1.63Z" /><path class="path-2" d="M215.43,225.73a11,11,0,0,0-1.42-.95c-3-1.39-6.09-2.68-9.09-4.13-1.91-.93-3.7-2.14-6-1.94-.05,0-.11-.09-.17-.12-2-.85-5.33,0-7.09,2.06,1.33-.18,2.65,0,3.5-.56,1.58-1,2.1.79,2.93.82,4.11.1,7.11,2.61,10.53,4.4-.36.45-.73.91-1.46,1.8,3-.18,5.47-.35,8-.51.1-.29.19-.57.28-.87Z" /><path class="path-2" d="M251.74,147.4c.19-.31.37-.61.55-.93l-4.71-2.69-.48.81,4.64,2.81Z" /><path class="path-2" d="M239.74,87.27c-2.19-.75-3-.37-3.56,1.68,2.36,1.07,3.33.61,3.56-1.68Z" /><path class="path-2" d="M205.42,231.51l4.83.64.12-1.2-4.81-.53c-.05.36-.09.73-.14,1.09Z" /><path class="path-2" d="M229.11,230a10.66,10.66,0,0,0-10.41-2.8c.1.83.24,1.83.4,3h-4.37c0,.16-.06.32-.08.49l6.15,1.24,8.31-1.94Z" /><polygon class="path-2" points="216.62 274 212.99 282.55 220.25 282.55 216.62 274 216.62 274" /><path class="path-3" d="M146,273.36a6.82,6.82,0,1,0,6.85,6.79,6.84,6.84,0,0,0-6.85-6.79Z" /><path class="path-3" d="M352.92,289.78h-3.19L339.47,276v13.81h-3.25V270.53h3.19l10.32,13.83V270.53h3.19v19.25Zm-45.93.14a9.85,9.85,0,0,1-10.2-9.77c0-5.52,4.45-9.7,10.2-9.7s10.2,4.2,10.2,9.7a9.85,9.85,0,0,1-10.2,9.77Zm-29.23-.14h-3.25V270.53h3.25v19.25Zm-21.59-16.34h-6.11v16.34h-3.24V273.44h-6.08v-2.91h15.43v2.91Zm-32.84,16.34-1.84-4.34h-9.71l-1.84,4.34h-3.38l8.49-19.25h3.33l8.41,19.25Zm-40.46.14a9.77,9.77,0,0,1-10-9.79c0-5.48,4.43-9.68,10.13-9.68a10.58,10.58,0,0,1,7.31,3l-1.9,2.36a7.53,7.53,0,0,0-5.36-2.45,6.78,6.78,0,1,0,0,13.56,8,8,0,0,0,5.36-2.28l1.93,2.14a10.91,10.91,0,0,1-7.46,3.17Zm1.27-77h12.13c12.87,0,18.33,5.21,21.67,20.67,2.48,11,4.64,17.91,6.37,23.5l.51,1.64H184.14V212.94Zm0-57.64a78.84,78.84,0,0,1,14.09-1.05c15,0,23.94,7.54,23.94,20.19,0,12.39-9.61,20.73-23.91,20.73H184.14V155.3ZM146,289.92a9.86,9.86,0,0,1-10.21-9.77c0-5.52,4.46-9.7,10.21-9.7s10.2,4.2,10.2,9.7a9.86,9.86,0,0,1-10.2,9.77ZM63.09,258.75l9.49-31.36H111l10,31.36Zm55.62,31H107.14V270.53h3.24v16.31h8.33v2.94Zm-31.1,0H73.53V270.53H87.28v2.91H76.78v5.23h9.4v2.89h-9.4v5.31H87.61v2.91Zm-37.32,0L46.77,284a8.34,8.34,0,0,1-.88,0H41.33v5.8H38.08V270.53h7.81c4.92,0,7.76,2.39,7.76,6.57,0,3.08-1.43,5.25-4,6.24L54,289.78ZM85.64,180.27c1.1-3.66,2.1-7.83,3.06-11.86.93-3.88,1.81-7.55,2.68-10.39h.05c.81,2.63,1.67,6,2.57,9.47,1.11,4.31,2.26,8.77,3.53,12.78L107,209.62H76.33l9.31-29.35Zm266.6,78.48a5.66,5.66,0,0,0,.47-.6,2.77,2.77,0,0,1,.6-.67l.14-.07L349.75,239l-.25.11c-5.63,2.64-14.88,4.27-24.14,4.27-26.07,0-42.27-16.8-42.27-43.83,0-27.57,16.27-44.69,42.45-44.69a58.9,58.9,0,0,1,23.78,4.66l.23.1,5-18.14-.16-.08c-4.83-2.52-15.52-5.46-29.75-5.46-18.39,0-35,6.26-46.67,17.64-12.19,11.87-18.64,28.41-18.64,47.85,0,27.13,12.9,48.47,34.57,57.33H248.17c-2.26-5.69-5.49-18.33-8.89-31.89-3.32-12.74-9.56-21.43-17.57-24.51v-.25c10.48-3.82,22.64-14.13,22.64-30.7,0-10.45-3.55-19-10.26-24.58-7.83-6.6-20.49-9.81-38.71-9.81a229.79,229.79,0,0,0-34.62,2.53l-.17,0V258.75H145.24l-38.67-118.5H77.87L39.73,258.75H19v40.89H372V258.75Z" /><path class="path-3" d="M307,273.36a6.82,6.82,0,1,0,6.84,6.79,6.83,6.83,0,0,0-6.84-6.79Z" /><path class="path-3" d="M45.89,273.44H41.33v7.62h4.56c3,0,4.68-1.26,4.68-3.88s-1.71-3.74-4.68-3.74Z" /><polygon class="path-3" points="212.99 282.55 220.25 282.55 216.62 274 212.99 282.55 212.99 282.55" /></svg></div>';
                        var elLoading = "<div class=\"mce-throbber page-loader arc-auto arc-loading-plugin\"> " + svgLogo + " </div>";
                        if($('.mce-container.mce-panel.mce-floatpanel.mce-window.mce-in'))        
                            $('.mce-container.mce-panel.mce-floatpanel.mce-window.mce-in').append(elLoading);
                        // remove tiny basic loading when upload request. that real: we must be change css in class 
                        setTimeout(function() {
                            var xhr, formData;
                            xhr = new XMLHttpRequest();
                            xhr.withCredentials = false;
                            xhr.open('POST', self.images_upload_url);
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
                                $(".mce-throbber").remove();
                                // $("#mce-modal-block").remove();
                            };
                            formData = new FormData();
                            formData.append('file', blobInfo.blob(), blobInfo.filename());
                            xhr.send(formData);
                        }, 1000); // must be settimeout function to has loading.https://www.tiny.cloud/docs/demo/local-upload/
                    },
                    file_picker_callback : function(cb, value, meta) {
                        // hook Tiny after select file in upload image implement upload file base64 todo...
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
                                console.log(file.name)
                                console.log(blobInfo.blobUri())
                                // call the callback and populate the Title field with the file name
                                cb(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    },
                    //Upload Fucntion & param
                    init_instance_callback: function (editor) {
                        // hook Tiny after init object and implement todo...
                        if(self.checkEdit != undefined)
                        {
                            tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                            tinymce.activeEditor.getBody().style.padding = "10px 0px 0px 0px";
                        }
                        $('tr.mceFirst').css('z-index','1000')

                        let content = self.value;

                        if(content != null || content != undefined)
                            this.setContent(content)
                        editor.on('keyup', function (e) {
                            if(e.which == 13){
                                self.$emit('event',e.which)
                            }
                            if(this.getContent() != ""){
                                if( self.classLabel != "active" )
                                    self.classLabel = "active"
                            }else{
                                self.classLabel != ""
                            }
                        })
                        
                        editor.on('change', function (e) {
                          
                            self.range = this.selection.getRng().startOffset;     // get range

                            self.$emit('range',self.range)
                           
                            this.contentOutPut = this.getContent()
                            self.update(this.getContent())
                        })

                        editor.on('focus', function (e) {
                            self.$emit('focus')
                        })

                        $('#open').click(function() {
                            $("#dialog").dialog({
                                width: 800,
                                modal: true
                            });
                        });

                    },
                    setup: function (editor) { // add attributes for tag a in editor viewmode to locate link after click
                        // editor.on('PreInit', function () {
                        //     editor.parser.addNodeFilter('a', (nodes) => nodes.forEach(node => node.attr('target', '_blank')));
                        // });
                        // hook Tiny after setup config and implement todo...

                    }
                }, this.tinyConfig ? this.tinyConfig : {})
            )
        },

        initTinyMCE(){
            try{
                if(tinymce.get(this.id) != null && tinymce.get(this.id) != undefined){
                    tinymce.get(this.id).destroy()
                }
            }catch(ex){}
            this.loadingContent();
            this.$nextTick(()=>{
                let self = this;
                setTimeout(()=>{
                    self.initTinyEditor()
                    self.$nextTick(()=>{
                        self.loadingContent(false);
                    })
                },100)
            })
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
        loadingContent(isLoad = true){
            let options = { element : `.loading-tiny` };
            if ("undefined" !== typeof ARCLoading) {
                isLoad ? ARCLoading.open(options) : ARCLoading.close(options);
            }
        }
    }
}