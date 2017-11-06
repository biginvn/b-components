import baseComponent from '../mixins/text-field-mixins'

export default {
    data() {
        return {
            tinymce : null,
            contentOutPut : "",
        }
    },

    components: {

    },

    props : [ 'id', 'label', 'name', 'disabled', 'class-name', 'content', 'mode'],

    mixins: [baseComponent],

    mounted() {
        this.initSumerNote(this.content)
        this.updateFloatLabel(null)
    },

    computed: {
        classes () {
            return (this.className?this.className:'') + " b__input 2"
        },
    },

    watch:{
        value(){
            this.updateContent(this.value)
        },
    },
 
    methods: {  

        initTinyMCEBasicMode(content){
            var vm = this
            var readonly = this.checkDisabled()
            this.tinymce = tinymce.init({
                selector: '#mytextarea',
                readonly : readonly,
                plugins: [
                    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                ],
                toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
                init_instance_callback: function (editor) {
                    this.setContent(content)
                    editor.on('keyup', function (e) {
                        if(this.getContent() != ""){
                            if( document.querySelector('#label-tinyMCE').className != "active" )
                                document.querySelector('#label-tinyMCE').className = "active"
                        }else{
                            document.querySelector('#label-tinyMCE').className = ""
                        }
                    })
                    editor.on('blur', function (e) {
                        this.contentOutPut = this.getContent()
                        vm.update(this.getContent())
                    })
                }
            });
        },

        initTinyMCEAdvanceMode(content){
            var vm = this
            var readonly = this.checkDisabled()
            this.tinymce = tinymce.init({
                selector: '#mytextarea',
                readonly : readonly,
                plugins: [
                    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                ],

                toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
                toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
                toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",
                content_css: [
                        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                        '//www.tinymce.com/css/codepen.min.css'],

                menubar: false,
                toolbar_items_size: 'small',

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
                    this.setContent(content)
                    editor.on('keyup', function (e) {
                        if(this.getContent() != ""){
                            if( document.querySelector('#label-tinyMCE').className != "active" )
                                document.querySelector('#label-tinyMCE').className = "active"
                        }else{
                            document.querySelector('#label-tinyMCE').className = ""
                        }
                    })
                    editor.on('blur', function (e) {
                        this.contentOutPut = this.getContent()
                        vm.update(this.getContent())
                    })
                }
            });
        },

        initSumerNote(content){
            if( this.mode == "advance" )
                this.initTinyMCEAdvanceMode(content)
            else
                this.initTinyMCEBasicMode(content)
        },

        getContentOutput(){
            tinymce.init({
                selector: '#mytextarea',
                init_instance_callback: function (editor) {
                    this.contentOutPut = this.getContent()
                }
            })
            return this.contentOutPut
        },

        updateContent(data){
            tinymce.activeEditor.setContent(data);
            return this.$emit('input', data)
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