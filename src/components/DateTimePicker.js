import MaterialDateTimePicker from 'material-datetime-picker';
import baseComponent from '../mixins/text-field-mixins'
import jQuery from 'jquery';
import moment from 'moment';

export default {
	mixins: [baseComponent],
	data() {
		return {
			dateTimePicker : null,
			model : null,
			mask : null
		}
	},
	props: ['value', 'format'],
    created() {
    	this.initComponent()
    },
    watch : {
    	value(newValue) {
    		if(newValue!=null && this.validate(newValue))
    			this.initComponent()
    		else{
    			this.$emit('input', null)
    			this.$refs.bInput.value = null
    		}

    	}
    },
    computed: {
    	formated () {
    		return this.format ? this.format : 'DD/MM/YY'
    	}
    },
    methods : {
    	initComponent () {
    		this.mask = this.formated
    		if (this.$refs.bInput!=undefined)
	    		this.$refs.bInput.value = this.value
    		this.dateTimePicker = new MaterialDateTimePicker({
    			format : this.formated,
    			default : this.value ? this.value : Date.now()
    		})
            .on('submit', (val) => this.onSubmit(val))
            .on('open', () => this.onOpened())
            .on('close', () => this.onClosed());
            this.updateFloatLabel(this.value)
    	},
    	togglePicker () {
    		this.dateTimePicker.open()
    	},
    	onSubmit(value){
    		this.model = value.format(this.formated)
    		this.$emit('input', value.format(this.formated))
    		this.$emit('submit', value.format(this.formated))
    	},
    	onOpened(){
    		this.$emit('opened')
    	},
    	onClosed(){
    		this.$emit('closed')
    	},
    	validate(value){
    		return moment(value, this.formated, true).isValid()
    	},
    	onBlur(){
    		if(this.validate(this.$refs.bInput.value)){
    			this.$emit('input', this.$refs.bInput.value)
    		} else {
    			this.$emit('input', null)
    		}
    	},
    	change (value) {
			this.updateFloatLabel(value)
		}
    }
}