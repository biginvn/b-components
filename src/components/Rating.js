import baseComponent from '../mixins/base-mixins'
export default {
	mixins : [baseComponent],
	props : [ 'disabled', 'name', 'id', 'label', 'class-name', 'rate-max','class-disabled' ],
	computed : {
		listRate () {
			if (this.rateMax == undefined || this.rateMax == null)
				return [1,2,3,4,5]

			let list = []
			for(let i=1; i <= parseInt(this.rateMax); i++)
				list.push(i)
			return list
		},
		rate () {
			if (this.value == undefined || this.value == null)
				return 0;
			else return parseInt(this.value)
		},
		classes () {
			let classStar = (this.className ? this.className : '')
			classStar += this.rate >= this.listRate.length ? ' full' : ''
			return classStar + ' rating__input'
		},
		classDis (){
			let disabled = (this.classDisabled ? this.classDisabled : '')
			disabled += this.rate >= this.listRate.length ? ' full' : ''
			return disabled
		}
	},
	methods : {
		update(rate) {
			if (this.disabled != 'disabled')
				this.$emit('input', rate)
		}
	}

}