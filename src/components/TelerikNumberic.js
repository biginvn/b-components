import baseMixins from '../mixins/text-field-mixins'
export default{
	data () {
		return {
			valueTemp        : "",
			inputValue       : "",
			inputAffix	     : "",
			inputType	     : "suffix",
			inputTail        : "",
			inputInterrupt   : "",
			inputTypeOutput  : "default"
		}
	},

	mixins: [baseMixins],

	props: ['affix', 'type', 'tail', 'interrupt', 'type-output'],

	created(){
		this.initComponentData()
	},

	mounted(){
		this.watchDataValue(this.value)
	},

	watch: {
		value(){
			this.watchDataValue(this.value)
		},
		affix(){
			if(this.affix != null || this.affix != undefined){
				this.inputAffix = this.affix
				this.eventBlur(this.value)
			}
		},
		type(){
			if(this.type != null || this.type != undefined){
				this.inputType = this.type
				this.eventBlur(this.value)
			}
		},
		tail(){
			if(this.tail != null || this.tail != undefined){
				this.inputTail = this.tail
				this.eventBlur(this.value)
			}
		},
		interrupt(){
			if(this.interrupt != null || this.interrupt != undefined){
				this.inputInterrupt = this.interrupt
				this.eventBlur(this.value)
			}
		},
		typeOutput(){
			if(this.typeOutput != null || this.typeOutput != undefined){
				this.inputTypeOutput = this.typeOutput
				this.eventBlur(this.value)
			}
		},
	},

	methods: {

		watchDataValue(value){
			if( value != null || value != undefined){
				this.valueTemp  = value
				this.inputValue = value
				this.affixInput(value)
			}else{
				this.valueTemp  = ""
				this.inputValue = ""
			}
		},

		initComponentData(){
			if(this.affix != null || this.affix != undefined)
				this.inputAffix = this.affix
			if(this.type != null || this.type != undefined)
				this.inputType = this.type
			if(this.tail != null || this.tail != undefined)
				this.inputTail = this.tail
			if(this.interrupt != null || this.interrupt != undefined)
				this.inputInterrupt = this.interrupt
			if(this.typeOutput != null || this.typeOutput != undefined)
				this.inputTypeOutput = this.typeOutput
		},

		checkIsNumber(number){
			let reg = new RegExp('^[0-9]$')
			if(!reg.test(number))
				return false
			return true
		},

		checkInputInvalid(string){
			let arrayNumber = string.split("")
			let lengthArr = arrayNumber.length
			for( let i = 0; i < lengthArr; i++){
				if( this.checkIsNumber(arrayNumber[i]) == false)
					return false
			}
			return true
		},

		eventInput(string){	
			if( string == "" || string == null ){
				this.valueTemp  = ""
			}
			this.inputValue = string
			if( this.checkInputInvalid(string) == false ){
				this.inputValue = this.valueTemp
				// document.querySelector('#' + this.id).value = this.valueTemp
			}else{
				this.valueTemp = string
				this.updateFloatLabel(string)
			}
		},

		eventBlur(string){
			if(string != "")
				this.affixInput(string)
			if( this.inputTypeOutput == "default")
				this.$emit("input", this.valueTemp)
			// if( this.inputTypeOutput == "full" )
			// 	this.$emit("input", this.inputValue)
			// if( this.inputTypeOutput == "only-affix" ){
			// 	let output = (this.inputType == "prefix") ? (this.inputAffix + this.interruptInput(this.valueTemp)) : (this.interruptInput(this.valueTemp) + this.inputAffix)
			// 	this.$emit("input", output)
			// }
			// if( this.inputTypeOutput == "only-tail" )
			// 	this.$emit("input", (this.interruptInput(this.valueTemp) + this.inputTail) )
			// if( this.inputTypeOutput == "only-interrupt" )
			// 	this.$emit("input", this.interruptInput(this.valueTemp))
		},

		interruptInput(string){
			if(string == "" || string == null || undefined)
				return ""
			string = parseInt(string)
			string = String(string)
			let strResult = ""
			let strSub    = ""
			let loop = parseInt(string.length/3)
			if( loop < 1 )
				return string
			for( let i = 1; i <= loop; i++){	
				if( string.slice(0, (string.length -3)) == "" ){
					strSub = string.slice((string.length -3),string.length)
					string = string.slice(0, (string.length -3))
				}else{
					strSub = this.inputInterrupt + string.slice((string.length -3),string.length)
					string = string.slice(0, (string.length -3))
				}
				strResult = strSub + strResult
			}
			return string + strResult
		},

		affixInput(string){
			if(string == "" || string == null || string == undefined)
				return this.inputValue = ""
			if( this.inputType == "prefix"){
				this.inputValue = this.inputAffix + this.interruptInput(this.valueTemp) + this.inputTail
			}else{
				this.inputValue = this.interruptInput(this.valueTemp) + this.inputTail + this.inputAffix
			}
			// document.querySelector('#' + this.id).value = this.inputValue 				
		},	

		eventForcus(string){
			this.inputValue = this.valueTemp
			// document.querySelector('#' + this.id).value = this.valueTemp
		},

	}
}