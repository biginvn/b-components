import baseComponent from '../mixins/text-field-mixins'

export default {
    data(){
        return {
            text : ''
        }
    },
    mixins : [baseComponent],
    props : {
        cols: {},
        rows: {},
        isViewMode: {
            // type: Boolean,
            default: false
        },
        hasPreView: {
            // type: Boolean,
            default: false
        },
        nullPrePlaceholder: {
            default: "-"
        }
    },
    watch : {
        value (val) {
            this.updateText(this.value)

        }
    },
    computed: {
        isViewPre() {
            if (this.isViewMode && this.hasPreView)
                return true;
            return false
        },
        contentPreview() {
            if (this.value == null || this.value == '')
                return this.nullPrePlaceholder;
            return this.value;
        }
    },
    methods : {
        change (value) {
            this.updateFloatLabel(value)
            this.updateText(value)
            this.$emit('input', value)
        },
        updateText (value) {
            this.text = value || '';
            if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {//IF IE > 10 
                console.log("You're using IE browser !");
                this.$el.querySelector('textarea').value=this.text
                if (value == undefined || value == null)
                    this.$el.querySelector('textarea').value=''
            }
            else{
                document.querySelector('textarea').value=this.text
                if (value == undefined || value == null)
                    document.querySelector('textarea').value=this.text
            }
        }
    }
}
