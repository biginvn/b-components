import baseComponent from '../mixins/base-mixins'

export default {
	data () {
		return {
			isExpanding : false,
			searchKeyword : '',
			pointerIndex: 0,
			selectedValue: null,
			searchList: []
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
		this.searchList = JSON.parse(JSON.stringify(this.list));
	},
	watch: {
		list(newList){
			this.searchList = JSON.parse(JSON.stringify(this.list));
			this.searchKeyword = '';
			this.selectedValue = null;
			this.pointerIndex = 0;
			this.switchList(false);
		},
        value(newValue){ // When model is updated we will update search keywords
			if(newValue == null){
				this.searchKeyword = '';
				return;
			}
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
        }
	},
	methods : {
		focusCombobox(event){
			this.switchList(true);
			$(event.target).select();
		},
		blurCombobox(event){
			// When blur outside input, always emit the selected value to model.
			// If user CLICK on ITEM, the click event will update again new value to model.
			// Close LIST after 500ms (waiting for CLICK event was handled)
			this.$emit("input", this.selectedValue);
			setTimeout( () => {
				this.switchList(false);
				if(this.selectedValue == null){
					this.searchList = JSON.parse(JSON.stringify(this.list));
				}
			},500);

		},
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
			this.selectedValue = id;
			this.searchKeyword = this.searchList[index].title;
		},
		toggleItem(id, index){
			this.selectedValue = id;
            this.switchList(false); // Close list
			this.$emit("input", this.selectedValue);
			this.searchKeyword = this.searchList[index].title;
		},
		hoverItem(index){ // Hover on item at (index) in searchList
			// this
		},
		searchAction (event) {
			this.selectedValue = null;
			this.searchKeyword = event.target.value ? event.target.value : '';
			this.switchList(true); // Open dropdown list
			this.$emit('search-keywords', this.searchKeyword);
			this.searchList = this.list.filter( item => {
                return item.title != undefined && item.title != null ? item.title.toUpperCase().match(new RegExp('.*' + this.searchKeyword.toUpperCase() + '.*')) : false;
            });
		},

		keypressAction (keyName, event){
			let pointerIndex = this.pointerIndex;
			this.selectedValue = null;
			switch (keyName) {
				case 'ArrowDown':
					if (this.pointerIndex == null || this.pointerIndex >= this.searchList.length - 1){
						pointerIndex = 0;
					} else {
						pointerIndex++;
					}
					this.selectedValue = this.searchList[pointerIndex].id;
					this.switchList(true);
					break;
				case 'ArrowUp':
					if (this.pointerIndex == null || this.pointerIndex == 0){
						pointerIndex = this.searchList.length-1;
					} else {
						pointerIndex--;
					}
					this.selectedValue = this.searchList[pointerIndex].id;
					this.switchList(true);
					break;
				case 'Enter':
					this.switchList(false);
					break;
				default:
					pointerIndex = null;
					this.selectedValue = null;
			}

			this.pointerIndex = pointerIndex;
			this.selectItem(pointerIndex);
			if(event!= null){
				event.target.selectionStart = event.target.selectionEnd = event.target.value.length;
			}
		}
	}

}
