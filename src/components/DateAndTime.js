import baseComponent from '../mixins/text-field-mixins'
import jQuery from 'jquery'
import moment from 'moment'

export default {
    mixins: [baseComponent],
    data() {
        return {
            input : {
                time : null
            }
        }
    },

    components: {

    },

    props : [ 'id', 'label', 'name', 'disabled', 'placeholder', 'class-name', 'datetimepicker-type'],

    mounted() {
        this.initDateTimePicker()
    },

    computed: {
    },

    watch:{
        value(){
        },
    },

    methods: {
        initDateTimePicker(){
            this.disabled = "disabled"
            var Vue = this
            $("#datetimepicker4").datetimepicker({
                format: 'MM-DD-YYYY hh:mm A Z'
            })
            $("#datetimepicker4").on("dp.change", function(e) {
                Vue.input.time = $("#datetimepicker4").val()
                Vue.updateDateModel(Vue.input.time)
            })
        },

        updateDateModel(data){
            this.$emit('input', data)
        },

        change (value) {
            this.updateFloatLabel(value)
        },
    }

}