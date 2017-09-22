import baseComponent from '../mixins/base-mixins'

export default {
	data () {
		return {
			isExpanding : false,
			searchList : [],
			searchKeyword : ''
		}
	},
	mixins: [baseComponent],
	created () {
		this.searchList = this.list
	},
	props : ['list', 'value'],
	computed : {
		selected () { // Convert v-model to [] if it's null
			return this.value ? this.value : []
		},
		listClasses () {
			return (this.isExpanding ? "active" : "") + " b__multi__select__list"
		}
	},
	methods : {
		getSelectedList () { // Get selected with full information [ { id : .. , html : ... } ] 
			var selected = this.list.filter( (item, position) => {
					if (this.value == null)
						return false
            	return this.value.includes(item.id)
        	});
        	return selected
		},
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
			let selectList = this.value == null ? [] : this.value;
			if (selectList.includes(id))
				selectList.splice(selectList.indexOf(id), 1)
			else
				selectList.push(id)

			this.switchList(true)

			// Reset search keyword at input field
			this.searchKeyword = ''
			this.$el.querySelector('input.input-control').focus()
			this.focusInputAction('')

			this.$emit('input', selectList)
		},
		searchAction (keyword) {

			this.searchList = this.list.filter( (item, position) => {
				if (item.keywords == undefined || item.keywords == null)
					return false
				let regex = new RegExp('.*' + keyword.toLowerCase() +'.*')
				return item.keywords.toLowerCase().match(regex) 
			})
			this.searchKeyword = keyword
			this.switchList(true)
		},
		focusInputAction (keyword) {
			this.searchAction(keyword)
			this.switchList(true)
		}
	}

}