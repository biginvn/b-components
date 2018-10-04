import baseComponent from '../mixins/text-field-mixins'

export default {
	mixins : [baseComponent],
	props	: ['type', 'min', 'maxlength', 'classParent', 'regex'],
	computed : {
		classes () {
			return (this.className?this.className:'') + " b__input 2"
		},
		typeComponent () {
			if (this.type == undefined || this.type== null || this.type.length == 0)
				return 'text'
			return this.type
		},
		classesParent() {
 		 	 return (this.classParent?this.classParent:'')
 			}
		},
	methods : {
		change (value) {
			this.updateFloatLabel(value);
			this.$emit('input', value);
		},
		blur() {
			this.$emit('blur')
		},
		focus() {
			this.$emit('focus')
		},
		// keyup(value){
		// 	this.$emit('keyup', value)
		// },
		maxLength(){
		   if (this.maxlength == undefined || this.maxlength== null)
		    return
		   return this.maxlength
		},
		keyupEnter: function(e) {
			 var keyCode = e.keyCode || e.which;
     		  //if (keyCode === 13 || keyCode === 45) {
             if (keyCode === 13) {
     		   e.preventDefault();
     		   return false;
     		 }   
   		},
        keyDownRegex: function (e) {
			let keyCode = e.keyCode || e.which;
			// alert(keyCode);
            // Don't validate the input if below arrow, delete and backspace keys were pressed
            if(keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 46 && keyCode != 8) { // Left / Up / Right / Down Arrow, Delete keys;
                let keyCharacter = e.key;
                let pattern = new RegExp(this.regex);
                if (this.regex !== undefined && this.regex !== null && this.regex !== '') {
                    let res = pattern.test(keyCharacter);
                    if (!res) {
                        e.preventDefault();
                        return false;
                    }
                }
            }
        }
	}
}