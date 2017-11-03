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

    props : [ 'id', 'label', 'name', 'disabled', 'class-name', 'content'],

    mixins: [baseComponent],

    mounted() {
        this.initSumerNote(this.content)
        this.updateFloatLabel(null)
        // this.tinymce.on("change", (event) => {
        //     alert("sdsd")
        // })
    },

    computed: {
        classes () {
            return (this.className?this.className:'') + " b__input 2"
        },
    },

    watch:{
        value(){
            this.updateTiniMCE(this.value)
        },
    },
 
    methods: {  
        initSumerNote(content){
            this.tinymce = tinymce.init({
                selector: '#mytextarea',
                init_instance_callback: function (editor) {
                    this.setContent(content)
                    editor.on('keyup', function (e) {
                        if(this.getContent() != ""){
                            document.querySelector('#label-tinyMCE').className = "active"
                        }else{
                            document.querySelector('#label-tinyMCE').className = ""
                        }
                    })

                    editor.on('change', function (e) {
                        this.contentOutPut = this.getContent()
                    })
                }
            });
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

        updateTiniMCE(content){
            tinymce.activeEditor.remove('#mytextarea')
            this.initSumerNote(content)
        },

        update() {
            alert("sdsdsd")
            //this.value = this.getContentOutput()
            this.$emit('input', this.getContentOutput() )
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