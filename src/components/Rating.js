import baseComponent from '../mixins/base-mixins'

export default {
	mixins: [baseComponent],
	props: ['disabled', 'name', 'id', 'label', 'class-name', 'rate-max', 'class-disabled'],
	computed: {
		/**
		 * get list rate
		 * @return {[]|number[]}
		 */
		listRate() {
			if (this.rateMax == undefined || this.rateMax == null)
				return [1, 2, 3, 4, 5]

			let list = []
			for (let i = 1; i <= parseInt(this.rateMax); i++)
				list.push(i)
			return list
		},
		/**
		 * get rating value
		 * @return {number}
		 */
		rate() {
			if (this.value == undefined || this.value == null)
				return 0;
			else return Math.round(this.value * 2) / 2;
		},
		/**
		 * get class config
		 * @return {string}
		 */
		classes() {
			let classStar = this.className ? this.className : ''
			return classStar + ' rating__input'
		},
		/**
		 * get class when disabled
		 * @return {computed.classDisabled|string}
		 */
		classDis() {
			let disabled = this.classDisabled ? this.classDisabled : ''
			disabled += this.isDisabled ? ' disabled-rating' : ''
			return disabled
		},
		/**
		 * check is disabled
		 * @return {boolean}
		 */
		isDisabled() {
			return this.disabled == 'disabled'
		}
	},
	methods: {
		/**
		 * function update rating when filled
		 * @param rate
		 */
		update(rate) {
			if (!this.isDisabled)
				this.$emit('input', rate)
		},
		/**
		 * get icon class star base on number star
		 * @param item
		 * @return {string}
		 */
		classStar(item) {
			if (Math.ceil(this.rate) == item && this.isFloat(this.rate)) {
				return 'fa fa-star-half-alt';
			}
			return item > this.rate ? 'far fa-star' : 'fas fa-star'
		},
		/**
		 * check number is float
		 * @param number
		 * @return {boolean}
		 */
		isFloat(number) {
			return Number(number) !== parseInt(number);
		}
	}

}