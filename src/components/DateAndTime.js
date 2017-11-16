import baseComponent from '../mixins/text-field-mixins'
import jQuery from 'jquery'
import moment from 'moment'

export default {
    mixins: [baseComponent],
    data() {
        return {
            input : {
                time : null,
                defaultClassInput : ""
            }
        }
    },

    components: {

    },

    props : [ 'id', 'label', 'name', 'disabled', 'placeholder', 'class-name', 'datetimepicker-type', 'time-format'],

    created() {
        this.initData();
    },

    mounted() {
        this.initDateTimePicker()
    },

    computed: {
    },

    watch:{
        value(){
            this.setDate(this.value)
        },
    },

    methods: {
        initDateTimePicker(){
            var Vue = this
            var timeFormat = 'MM-DD-YYYY hh:mm A'
            if( Vue.timeFormat != null || Vue.timeFormat != undefined || Vue.timeFormat != "")
                timeFormat = Vue.timeFormat
            if( Vue.value == null || Vue.value == undefined || Vue.value == ""){
                $("#" + Vue.id).datetimepicker({
                    format: timeFormat,
                    showTodayButton: true,
                    keyBinds : {
                        left: null,
                        right: null  
                    }
                })
            }else{
                $("#" + Vue.id).datetimepicker({
                    format: timeFormat,
                    showTodayButton: true,
                    date: Vue.value,
                    keyBinds : {
                        left: null,
                        right: null  
                    }
                })
            }
            
            $("#" + Vue.id).on("dp.change", function(ev) {
                if( (Vue.value != null) && (Vue.value != undefined) && (Vue.value.split(" ")[0] != $("#" + Vue.id).val().split(" ")[0]) )
                    $(document).find('.picker-switch a[data-action="togglePicker"]').click()
                Vue.input.time = $("#" + Vue.id).val()
                Vue.updateDateModel(Vue.input.time)
            })

            $("#" + Vue.id).datetimepicker().on('dp.changeDate', function(e){
                alert("sdsds")
            })  
        },

        updateDateModel(data){
            this.$emit('input', data)
        },

        setDate(date){
            $("#" + this.id).data("DateTimePicker").date(date)
        },

        checkInputInvalid(time){
            if( this.validationDateTime(time) == false ){
                this.classLabel = "active hasError"
                document.querySelector('.b__input').style.borderColor   = "#f04134"
                // this.classes    = this.input.defaultClassInput + " hasError" //because Variable this.classes can'nt change therefore I must be Hard Code
            }else{
                this.classLabel = "active"
                document.querySelector('.b__input').style.borderColor   = ""
                // this.classes    = this.input.defaultClassInput     
            }
        },

        validationDateTime(time){
            var arrayTime = time.split(" ")
            var time = {
                date : arrayTime[0],
                time : arrayTime[1],
                session : arrayTime[2] 
                // zone    : arrayTime[3]
            }
            if( this.regularExpression(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/, time.date) == false)
                return false
            if( this.regularExpression(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, time.time) == false)
                return false
            if( this.checkAMPM(time.session) == false)
                return false
            // if( this.regularExpression(/^(Z|[+-](?:2[0-3]|[01]?[0-9])(?::?(?:[0-5]?[0-9]))?)$/, time.zone) == false)
            //     return false
            return true
        },

        checkAMPM(value){
            if( value == "AM" || value == "PM" || value == "am" || value == "pm" )
                return true
            return false
        },

        regularExpression(regex, value){
            var reg = regex
            if (!reg.test(value)) {
                return false;
            }
            return true
        },

        change (value) {
            this.updateFloatLabel(value)
        },

        initData(){
            this.input.defaultClassInput = this.classes
        }
    }

}