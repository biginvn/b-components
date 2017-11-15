import baseComponent from '../mixins/text-field-mixins'
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

export default {
	data () {
		return {
			isExpanding  : false,
			searchList   : [],
			searchMode   : 'default', 
			searchTimeOut: '1000',
			searchRangeKeywords : '4',
			searchRequestMethod : 'get',
			searchRequestUrl    : '#',
			pointerIndex : null, // Selecting index of list
			hoverIndex   : null, // Position of cursor is hovering select item
			searchKeyword : ''
		}
	},

	mixins: [baseComponent],

	created () {
		this.setVariableDefault()
	},

	watch:{
		value(){
		}
	},

	props : ['list', 'value', 'disabled', 'single-dropdown', 'disable-icon', 'mode', 'request-url', 'request-method', 'request-timeout', 'range-keywords'],

	computed : {
		selected () { // Convert v-model to [] if it's null
			return this.value ? this.value : (this.isSingle ? null : [])
		},
		isSingle(){
			return this.singleDropdown === "true" ? true : false
		},
		listClasses () {
			return (this.isExpanding ? "active" : "") + " b__multi__select__list"
		}
	},

	methods : {

		setVariableDefault(){
			this.searchList = this.list

			if(this.mode != null || this.mode != undefined || this.mode != '')
				this.searchMode = this.mode

			if( this.requestTimeout != null || this.requestTimeout != undefined || this.requestTimeout != '' )
				this.searchTimeOut = this.requestTimeout

			if( this.rangeKeywords != null || this.rangeKeywords != undefined || this.rangeKeywords != '' )
				this.searchRangeKeywords = this.rangeKeywords

			if( this.requestMethod != null || this.requestMethod != undefined || this.requestMethod != '' )
				this.searchRequestMethod = this.requestMethod

			if( this.requestUrl != null || this.requestUrl != undefined )
				this.searchRequestUrl = this.requestUrl

			return
		},

		getSingleSelected(){
			let listSelected = this.searchList.filter( (item) => {
				return item.id == this.selected
			})

			if (listSelected.length > 0)
				return listSelected[0]
			return null
		},

		getSelectedList () { // Get selected with full information [ { id : .. , html : ... } ] 
			if (this.isSingle) return
			let selected = []
			this.selected.forEach( (id, index) => {
				let item = this.searchList.find((value) => value.id == id)
				if (item != undefined)
					selected.push(item)
			})
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

		virtualDataRequestToTest(){
			let dataRespone = [
				{
					id: 23,
		            html: '<p>Fednaldo Torres</p><p class="club">Chelsea</p><p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>',
		            keywords: 'Fednaldo Torres',
		            thumbHtml: 'Torres',
		            icon: 'https://i.imgur.com/fCOeXej.jpg'
				},
				{
					id: 16,
		            html: '<p>Davil Silva</p><p class="club">Manchester City</p><p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>',
		            keywords: 'Davil Silva',
		            thumbHtml: 'Silva',
		            icon: 'https://as01.epimg.net/img/comunes/fotos/fichas/deportistas/x/xab/large/900.png'
				},
				{
					id: 12,
		            html: '<p>Davil Degea</p><p class="club">DortMun</p><p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>',
		            keywords: 'Davil Degea',
		            thumbHtml: 'Degea',
		            icon: 'https://i.imgur.com/fCOeXej.jpg'
				},
				{
					id: 56,
		            html: '<p>Alexander Pato</p><p class="club">Acmilan</p><p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>',
		            keywords: 'Alexander Pato',
		            thumbHtml: 'Pato',
		            icon: 'https://as01.epimg.net/img/comunes/fotos/fichas/deportistas/x/xab/large/900.png'
				},
			]
			return dataRespone
		},

		toggleItem(id){
			this.updateFloatLabel("true")
			if (!this.isSingle){
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
			} else {
				let selectList = this.value == null ? [] : [this.value];
				if (selectList.includes(id)){
					selectList.splice(selectList.indexOf(id), 1)
					this.$emit('input', null)
					this.$el.querySelector('input.input-control').focus()
				}
				else{
					selectList = [id]
					this.$emit('input', id)
				}

				this.switchList(true)

				// Reset search keyword at input field
				this.searchKeyword = ''
				this.focusInputAction('')

			}
		},

		hoverItem(index){ // Hover on item at (index) in searchList
			// this
		},

		addDataSearchList(data){
			this.searchList = []
			let dataLength = data.length
			for( let i = 0; i < dataLength; i++){
				this.searchList.push(data[i])
			}
			// this.$emit('input', this.searchList)
		},

		searchAction (keyword) {
			// if( this.searchMode != 'default'){
			// 	if( keyword.length >= this.searchRangeKeywords ){
			// 		switch ( this.searchRequestMethod ) {
			// 			case 'get' :
			// 				this.$http.get(this.searchRequestUrl, { params: { data:keyword } })
			// 				.then( (success) => {
			// 					let data = this.virtualDataRequestToTest()
			// 					success.body = data
			// 					this.addDataSearchList(success.body)
			// 				}, (error) => {
			// 					console.log(error)
			// 				})
			// 				break
			// 			case 'post':
			// 				this.$http.post(this.searchRequestUrl, { data:  keyword })
			// 				.then( (success) => {
			// 					let data = this.virtualDataRequestToTest()
			// 					success.body = data
			// 					this.addDataSearchList(success.body)
			// 				}, (error) => {
			// 					console.log(error)
			// 				})
			// 				break
			// 			default:
			// 				this.$http.get(this.searchRequestUrl, { params:  {data:keyword} })
			// 				.then( (success) => {
			// 					let data = this.virtualDataRequestToTest()
			// 					success.body = data
			// 					this.addDataSearchList(success.body)
			// 				}, (error) => {
			// 					console.log(error)
			// 				})
			// 		}
			// 	}
			// }

			this.searchList = this.searchList.filter( (item, position) => {
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
		},

		keypressAction (keyName){
			let pointerIndex = this.pointerIndex
			switch (keyName) {
				case 'ArrowDown':
				if (this.pointerIndex == null || this.pointerIndex >= this.searchList.length - 1){
					pointerIndex = 0
					break
				}

				pointerIndex++
				break
				case 'ArrowUp':
				if (this.pointerIndex == null || this.pointerIndex == 0){
					pointerIndex = this.searchList.length-1
					break
				}

				pointerIndex--
				break
				case 'BackSpace':
				pointerIndex = null
				if (this.value != null && this.value.length > 0 && this.searchKeyword.length == 0)
					this.value.splice(this.value.length-1,1)
			}

			this.hoverItem(pointerIndex)
			this.pointerIndex = pointerIndex
		}
	}
}