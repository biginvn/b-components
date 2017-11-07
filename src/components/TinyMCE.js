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

    props : [ 'id', 'label', 'name', 'disabled', 'class-name', 'content', 'mode', 'tiny-config'],

    mixins: [baseComponent],

    mounted() {
        this.initTinyMCE(this.value)
        this.updateFloatLabel(null)
    },

    computed: {
    },

    watch:{
        value(){
            this.updateContent(this.value)
        },
    },
 
    methods: {  

        initTinyMCEBasicMode(content){
            var Vue = this
            var readonly = this.checkDisabled()
            Vue.tinymce = tinymce.init(
                Object.assign({},
                    {
                        selector: '#' + Vue.id,
                        readonly : readonly,
                        plugins: [
                            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
                            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                        ],
                        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",

                        init_instance_callback: function (editor) {
                            $('tr.mceFirst').css('z-index','1000')
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
                        }
                    },
                    this.tinyConfig ? this.tinyConfig : {}
                )
            )
        },

        initTinyMCEAdvanceMode(content){
            var Vue = this
            var readonly = this.checkDisabled()
            Vue.tinymce = tinymce.init({
                selector: '#' + Vue.id,
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
                }
            });
        },

        initTinyMCE(content){
            if( this.mode == "advance" )
                return this.initTinyMCEAdvanceMode(content)
            else
                return this.initTinyMCEBasicMode(content)
        },

        getContentOutput(){
            return this.contentOutPut = tinymce.get(this.id).getContent(data)
        },

        updateContent(data){
            tinymce.get(this.id).setContent(data)
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