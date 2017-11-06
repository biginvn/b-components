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
        },
    },
 
    methods: {  

        initSumerNote(content){
            var vm = this
            this.tinymce = tinymce.init({
                selector: '#mytextarea',
                init_instance_callback: function (editor) {
                    this.setContent(content)
                    editor.on('keyup', function (e) {
                        if(this.getContent() != ""){
                            document.querySelector('#label-tinyMCE').className = "active"
                            vm.update(this.getContent())
                        }else{
                            document.querySelector('#label-tinyMCE').className = ""
                            vm.update(this.getContent())
                        }
                    })

                    editor.on('change', function (e) {
                        this.contentOutPut = this.getContent()
                        vm.update(this.getContent())
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