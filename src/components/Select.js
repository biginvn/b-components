import baseComponent from '../mixins/base-mixins'

export default {
    data () {
        return {
            isActive : false
        }
    },
    mixins: [baseComponent],
    watch : {
        list(newValue){
            this.float()
        }
    },
    mounted () {
        this.float()
    },
    // props: [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-text', 'item-val', 'item-url', 'class-name', 'placeholder'],
    props : {  // [ 'id', 'default', 'label', 'name', 'disabled', 'list', 'item-text', 'item-val', 'item-url', 'class-name', 'placeholder'],
        id: {},
        default: {},
        label: {},
        name: {},
        hasAllDefault: {
            type: Boolean,
            default: false
        },
        allDefault: {
            type: Object/Array,
            default: function () {
                return {
                    "value": "All",
                    "id"   : ""
                }
            }
        },
        disabled: {},
        list: {
            type: Object/Array,
            default: function () {
                return [];
            }
        },
        itemText: {},
        itemVal: {},
        itemUrl: {
            default: 'url'
        },
        className: {},
        placeholder: {},
        targetBlank: {
            default: true
        },
        isHyperLinkView: {
            default: false
        },
    },
    computed : {
        selected : {
            get () {
                this.float()
                return this.value;
            },
            set(newValue) {
            }
        },
        listItems() {
            let listItems = JSON.parse(JSON.stringify(this.list));
            if (this.hasAllDefault) {
                listItems.unshift(this.allDefault);
            }
            return listItems;
        },
        items() {
            if (this.listItems == undefined || this.listItems == null || this.listItems.length == 0){
                if (this.default != undefined && this.default != null ){
                    return [this.default];
                }
                return [{ value : '', name : '' }];
            }

            let items = [];
            for(let i=0; i< this.listItems.length; i++){
                let listItem = this.listItems[i];
                let item = {
                    value : listItem[this.itemVal],
                    name : listItem[this.itemText],
                }
                items.push(item);
            }

            return items;
        },
        externalName() {
            if (this.isHyperLinkView && (this.value !== undefined || this.value !== null)) {
                let value = this.value;
                let selectItem = this.list.filter( item => item.id.toString() === value.toString());
                if (selectItem.length > 0)
                    return selectItem[0][this.itemText];
                else return selectItem[this.itemText];
            }
            return '';
        },
        externalLink() {
            if (this.isHyperLinkView && (this.itemUrl !== undefined || this.itemUrl !== null) && (this.value !== undefined || this.value !== null)) {
                let value = this.value;
                let selectItem = this.list.filter( item => item.id.toString() === value.toString());
                if (selectItem.length > 0)
                    return selectItem[0][this.itemUrl];
                return '';
            }
            return '';
        }
    },
    methods : {
        update(val) {
            this.$emit('input', val)
            this.float()
        },
        float() {
            if (this.$el== undefined) {
                this.isActive = false;
                return;
            }

            if (!this.hasAllDefault) {
                if (this.value == null || this.value.length == 0) {
                    this.isActive = false;
                    return;
                }
            }
            else {
                if (this.value == null || this.value.length == 0) {
                    this.isActive = true;
                    return;
                }
            }

            if (this.isModelInList()){
                this.isActive = true;
                return;
            }
            this.isActive = false;
        },
        isModelInList() {
            var found = false;
            for (var i =0; i < this.items.length; i++){
                var item = this.items[i]
                if (item.value!=null && item.value.toString() == this.value.toString()){
                    found = true;
                    break;
                }
            }
            return found;
        }
    }

}