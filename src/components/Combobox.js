import baseComponent from '../mixins/base-mixins'

export default {
	data () {
		return {
			isExpanding : false,
			searchKeyword : '',
			pointerIndex: 0
		}
	},
    props: {
        list: {
            required: true
        },
        id: {
            required: true
        },
        value: {
            required: true,
            validator: function (value) {
                return value == null || value instanceof String || !isNaN(value);
            }
        },
        disabled: {
            type: Boolean
        },
        disableIcon: {
            type: Boolean
        },
        placeholder: {
            type: String
        },
        label:{
            type: String,
            required: true
        }
    },
	mixins: [baseComponent],
	created () {
	},
	watch: {
        value(newValue){ // When model is updated we will update search keywords
            let newId = newValue ? newValue : '';
            let selectItem = this.list.filter( item => item.id.toString() === newValue.toString());
            if (selectItem.length > 0){
                this.searchKeyword = selectItem[0].title;
            }
        }
	},
	computed : {
        isActive(){
            return this.value != null;
        },
		searchList(){
            return this.list.filter( item => {
                return item.title != undefined && item.title != null ? item.title.toUpperCase().match(new RegExp('.*' + this.searchKeyword.toUpperCase() + '.*')) : false;
            });
        }
	},
	methods : {
        switchList(openList = false){
            this.isExpanding = openList;
        },
		selectItem(index){ // index item of searchList
			if(index == undefined || index == null){
				return;
			}

			if(index >= this.searchList.length){
				return;
			}

			this.pointerIndex = index;
			let id = this.searchList[index].id;
			this.$emit("input", id);
		},
		toggleItem(id){
			this.$emit("input", id);
            this.switchList(); // Close list
		},
		hoverItem(index){ // Hover on item at (index) in searchList
			// this
		},
		searchAction (event) {
			this.searchKeyword = event.target.value ? event.target.value : '';
			this.switchList(true); // Open dropdown list
			this.$emit('search-keywords', this.searchKeyword);
		},

		keypressAction (keyName){
			let pointerIndex = this.pointerIndex
			switch (keyName) {
				case 'ArrowDown':
				if (this.pointerIndex == null || this.pointerIndex >= this.searchList.length - 1){
					pointerIndex = 0;
					break;
				}

				pointerIndex++;
				break;
				case 'ArrowUp':
				if (this.pointerIndex == null || this.pointerIndex == 0){
					pointerIndex = this.searchList.length-1;
					break;
				}

				pointerIndex--;
				break;
				case 'BackSpace':
				pointerIndex = null
				if (this.value != null && this.value.length > 0 && this.searchKeyword.length == 0)
					this.value.splice(this.value.length-1,1)
			}

			this.pointerIndex = pointerIndex
		}
	}

}
