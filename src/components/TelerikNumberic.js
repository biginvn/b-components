import baseMixins from '../mixins/text-field-mixins'
export default{
    data () {
        return {
            valueTemp          : "",
            inputValue         : "",
            inputAffix	       : "",
            inputType	       : "suffix",
            inputInterrupt     : ",",
            inputTypeOutput    : "default",
            inputRoundDecimal  : 0,
            inputMaxLength     : 15,
        }
    },

    mixins: [baseMixins],

    computed : {
        maxIntNumber () { // length int number
            if (this.isDecimalNumber)
                return this.inputMaxLength - this.decimalNumbers - 1;
            return parseInt(this.inputMaxLength);
        },
    },

    props : {
        affix: {},
        type: {},
        interrupt: {},
        typeOutput: {},
        maxLength: {
            type: Number,
            default: 15
        },
        roundingDecimal: {},
        isDecimalNumber : {
            type: Boolean,
            default: false
        },
        regex: {
            type: String,
            default: "[0-9.]",
        },
        decimalNumbers: {
            type: Number,
            default: 2
        }
    },
    // props: ['affix', 'type', 'interrupt', 'type-output','rounding-decimal', 'max-length'],

    created(){
        if( parseInt(this.maxLength) != null && parseInt(this.maxLength) != undefined && parseInt(this.maxLength) <= this.inputMaxLength )
            this.inputMaxLength = parseInt(this.maxLength)
        if(parseInt(this.maxLength) <= this.inputMaxLength)
            console.log("Exeption: Components Telerik Numerik props max-length must be <= 15 (interger format).")
        this.initComponentData()
    },

    mounted(){
        if (this.value !== null)
            this.watchDataValue(this.value.toString())
        else
            this.watchDataValue("")
    },

    watch: {
        value(){
            if (this.value !== null)
                this.watchDataValue(this.value.toString())
            else
                this.watchDataValue("")
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
        roundingDecimal(){
            if(this.roundingDecimal != null || this.roundingDecimal != undefined){
                this.inputRoundDecimal = this.roundingDecimal
                this.eventBlur(this.value)
            }
        }
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
            if(this.interrupt != null || this.interrupt != undefined)
                this.inputInterrupt = this.interrupt
            if(this.typeOutput != null || this.typeOutput != undefined)
                this.inputTypeOutput = this.typeOutput
            if(this.roundingDecimal != null || this.roundingDecimal != undefined)
                this.inputRoundDecimal = this.roundingDecimal
        },

        checkIsNumber(number){
            let reg = new RegExp(/^[\d.]+$/)
            if(!reg.test(number))
                return false
            return true
        },

        checkInputInvalid(string){
            let arrayNumber = string.split("")
            let lengthArr = arrayNumber.length
            if( lengthArr > this.inputMaxLength )
                return false
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
            }else{
                this.valueTemp = this.checkValidateString(string)
                this.updateFloatLabel(string)
            }
        },

        eventBlur(string){
            if(string != "" || string != null || string != undefined)
                this.affixInput(string)
            if( this.inputTypeOutput == "default")
                this.$emit("input", this.valueTemp)
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

        checkValidateString(string){
            if( string.split(".").length > 2)
                return string.split(".")[0] +"."+ string.split(".")[1]
            if(string.split(".").length == 2){
                let number = "0";
                let decimal = null;
                if(string.split(".")[0] == null || string.split(".")[0] == undefined || string.split(".")[0] == "")
                    number = "0";
                else
                    number = string.split(".")[0];
                if(string.split(".")[1] == null || string.split(".")[1] == undefined || string.split(".")[1] == "")
                    decimal = null;
                else decimal = string.split(".")[1];
                if (decimal !== null)
                    return number + "." + decimal
                else
                    return number;
            }
            return string
        },

        affixInput(string){
            if(string == "" || string == null || string == undefined){
                this.inputValue = ""
                return this.valueTemp  = ""
            }
            string = this.checkValidateString(string)
            // string      	 = parseFloat(string).toFixed(this.inputRoundDecimal)
            let beginString  = (string.split(".")[0] == null || string.split(".")[0] == undefined) ? "" : string.split(".")[0]
            let endString    = (string.split(".")[1] == null || string.split(".")[1] == undefined) ? "" : string.split(".")[1]
            let decimalPoint = (endString == "" || endString == null || endString == undefined) ? "" : "."
            if(string == "" || string == null || string == undefined)
                return this.inputValue = ""
            if( this.inputType == "prefix"){
                this.inputValue = this.inputAffix + this.interruptInput(this.valueTemp) + decimalPoint + endString
            }else{
                this.inputValue = this.interruptInput(this.valueTemp) + decimalPoint + endString + this.inputAffix
            }
        },

        eventForcus(string){
            this.inputValue = this.valueTemp
        },

        keyDownRegex: function (e) {
            if (this.isDecimalNumber) {
                // e.preventDefault();
                let keyCode = e.keyCode || e.which;
                // Don't validate the input if below arrow, delete and backspace keys were pressed
                if(keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 8) { // Left / Up / Right / Down Arrow, Delete keys
                    let keyCharacter = e.key;
                    let pattern = new RegExp(this.regex);
                    if (this.regex !== undefined && this.regex !== null && this.regex !== '') {
                        let res = pattern.test(keyCharacter);
                        if (res) {
                            if (this.inputValue !== "" && this.inputValue !== null && this.inputValue.includes(".")) {
                                if (keyCode == 190) {// Check if input "."
                                    e.preventDefault();
                                    return false;
                                }
                                let arrayValue = this.inputValue.split(".");
                                let stringDecimal = arrayValue[1];
                                if (stringDecimal.length >= this.decimalNumbers) {
                                    e.preventDefault();
                                    return false;
                                }
                            }
                            else {
                                if (this.inputValue.length >= this.maxIntNumber) {
                                    if (keyCode != 190) {// Check if input "."
                                        e.preventDefault();
                                        return false;
                                    }
                                }
                            }
                        }
                        else {
                            e.preventDefault();
                            return false;
                        }
                    }
                }
            }
        }

    }
}