import baseComponent from '../mixins/base-mixins'

export default {
	data () {
		return {
			isExpanding : false,
		}
	},
	mixins: [baseComponent],
	mounted () {
	},
	props : ['list', 'value'],
	computed : {
		selected : {
			get () {
				var selected = this.list.filter( (item, position) => {
                	return this.value.includes(item.id)
            	});
            	return selected
			},
			set(newValue) {
			}
		},
		listClasses : {
			get () {
				return (this.isExpanding ? "active" : "") + " b__multi__select__list"
			}
		}
	},
	methods : {
		toggleList () {
			this.switchList(!this.isExpanding)
		},
		switchList (on = true) {
			if (on)
				this.isExpanding = true
			else 
				this.isExpanding = false
		},
		toggleItem(id){
			let selectList = this.value;
			if (this.value.includes(id))
				selectList.splice(selectList.indexOf(id), 1)
			else
				selectList.push(id)

			this.switchList(true)

			this.$emit('input', selectList)
		}
	}

}