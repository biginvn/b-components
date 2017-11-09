import baseComponent from '../mixins/base-mixins'
var Events = new Vue({})
export default {
	mixins : [baseComponent],
	props:{
		showModal:{
			type:Boolean,
			default:false
		}
	},
	data(){
		return{
			list: [
		        { code: '1', name: 'template 1' },
		        { code: '2', name: 'template 2' },
		        { code: '3', name: 'template 3' }
	        ],
	        select: null,
		}
	},
	
	methods:{
		changeStatus(){
			
			this.$emit('input',this.showModal);
		}
	}
}	