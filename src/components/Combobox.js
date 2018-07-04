import baseComponent from '../mixins/base-mixins'

export default {
    data () {
        return {
            isExpanding : false,
            isFocused : false,
            searchKeyword : '',
            pointerIndex: 0,
            selectedValue: null,
            searchList: [],
            searchListTotal: [],
            selectedPointerIndex: null,
            showResult: false,
            itemResult : {
                id: null,
                html: null,
                title: null,
                icon: null
            }
            // value: null,
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
            required: false,
            // I don't know validation for what? Current because this line make error, so i comment it
            // validator: function (value) {
            //     return value == null;
            // }
        },
        defaultValue: {
            default: null
        },
        disabled: {
            type: Boolean
        },
        disableIcon: {
            type: Boolean
        },
        styleDefault: {
            type: Boolean,
            default: false
        },
        inputPlacehoder: {
            type: String
        },
        label:{
            type: String
        },
        ajaxSearchUrl: {
            type: String,
            default: null
        },
        startLengthKey: {
            type: Number,
            default: 0
        },
        formatList: {
            type: Object,
            default: null
        },
        dataPrefix: {
            type: String,
            default: null
        },
        keyNameSearch: {
            type: String,
            default: "key"
        },
        orgPlaceholder: {
            type: String,
            default: "-"
        },
        nullPlaceholder: {
            type: String,
            default: "-"
        },
        paramAjaxSearch: {
            type: Object,
            default: null
        },
        isShowHtmlResult: {
            type: Boolean,
            default: false
        }
    },
    mixins: [baseComponent],
    created () {
        if (this.ajaxSearchUrl !== null && this.ajaxSearchUrl !== "") {
            this.searchListTotal = [];
            this.searchList = JSON.parse(JSON.stringify(this.searchListTotal));
        }
        else {
            this.searchList = JSON.parse(JSON.stringify(this.list));
            this.searchListTotal = JSON.parse(JSON.stringify(this.list));
        }

        if (this.defaultValue !== null) {
            let value = this.defaultValue;
            let selectItem = this.searchListTotal.filter( item => item.id.toString() === value.toString());
            if (selectItem.length > 0){
                this.searchKeyword = selectItem[0].title;
                this.selectedValue = value;
            }
            this.pointerIndex = this.searchListTotal.indexOf(selectItem[0])
        }
    },
    watch: {
        searchListTotal(){
            this.searchList = JSON.parse(JSON.stringify(this.searchListTotal));
            if (this.ajaxSearchUrl === null || this.ajaxSearchUrl === "") {
                this.switchList(false);
            }
        },
        list() {
            this.searchListTotal = JSON.parse(JSON.stringify(this.list));
            if (this.ajaxSearchUrl === null || this.ajaxSearchUrl === "") {
                this.switchList(false);
            }
        },
        value(newValue){ // When model is updated we will update search keywords
            if(newValue == null){
                // this.searchKeyword = '';
                if (this.ajaxSearchUrl !== null && this.ajaxSearchUrl !== "") this.searchListTotal = [];
                return;
            }
            let newId = newValue ? newValue : '';
            let selectItem = this.searchListTotal.filter( item => item.id.toString() === newValue.toString());
            if (selectItem.length > 0){
                this.searchKeyword = selectItem[0].title;
            }
        },
        defaultValue(value) {
            if (value !== null) {
                let selectItem = this.searchListTotal.filter( item => item.id.toString() === value.toString());
                if (selectItem.length > 0){
                    this.searchKeyword = selectItem[0].title;
                    this.selectedValue = value;
                }
                this.pointerIndex = this.searchListTotal.indexOf(selectItem[0])
            }
        },
        selectedValue(val) {
            this.itemResult = Object.assign({}, this.searchList[this.pointerIndex]);
            if (val === null) this.showResult = false
            else {
                this.showResult = true
            }
            this.selectedPointerIndex = val
            this.$emit("input", val);
        }
    },
    computed : {
        showInputSearchCombobox() {
            if (!this.isShowHtmlResult) return true
            if (!this.showResult && this.isShowHtmlResult) return true
            return false
        },
        isActive(){
            return (this.value != null || (this.searchKeyword !== null && this.searchKeyword !== ''));
        },
        placeholderEmpty()
        {
            if(this.searchKeyword.length >= this.startLengthKey)
                return 'Not Found';

            if(this.searchList.length == 0)
                return 'Please type at least ' + this.startLengthKey + ' characters to search';
        }
    },
    methods : {
        showInputSearch() {
            this.showResult = false
            this.switchList(true)
            let ref = 'input-search-' + this.id
            this.$nextTick(() => this.$refs[ref].focus())

        },
        focusCombobox(event){
            this.switchList(true);
            $(event.target).select();
        },
        blurCombobox(event){
            // When blur outside input, always emit the selected value to model.
            // If user CLICK on ITEM, the click event will update again new value to model.
            // Close LIST after 500ms (waiting for CLICK event was handled)
            setTimeout( () => {
                this.switchList(false);
                if(this.selectedValue == null){
                    this.searchList = JSON.parse(JSON.stringify(this.searchListTotal));
                    this.searchKeyword = ''
                    this.showResult = false
                }
                else this.showResult = true
                // this.pointerIndex = this.selectedPointerIndex;

            },500);
            this.$emit("input", this.selectedValue);

        },
        switchList(openList = false){
            if (!this.disabled) {
                this.isExpanding = openList;
                this.isFocused = openList;
                let val = this.selectedPointerIndex
                if (openList && val !== null) {
                    let selectItem = this.searchList.filter( item => item.id.toString() === val.toString());
                    this.pointerIndex = this.searchList.indexOf(selectItem[0])
                }
            }
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
            // this.selectedPointerIndex = index;
            this.switchList(false); // Close list
            this.searchKeyword = this.searchList[index].title;
            // this.showResult = true
        },
        hoverItem(index){ // Hover on item at (index) in searchList
            // this
        },
        searchAction (event) {
            let self = this;
            this.selectedValue = null;
            this.searchKeyword = event.target.value ? event.target.value : '';
            this.switchList(true); // Open dropdown list
            this.pointerIndex = null;
            this.$emit('search-keywords', this.searchKeyword);
            let searchKey = this.searchKeyword.trim();
            if (this.ajaxSearchUrl !== null && this.ajaxSearchUrl !== "" && searchKey.length >= this.startLengthKey) {
                let urlSearch = this.ajaxSearchUrl + "?" + this.keyNameSearch + "=" + searchKey;
                this.$http.get(urlSearch, { params : this.paramAjaxSearch}).then(
                    (success) => {
                        this.pointerIndex = null;
                        let dataList = success.body[this.dataPrefix];
                        this.searchListTotal = [];
                        dataList.map(data => {
                            let tmp = {
                                id: self.formatListHtml(self.formatList.id, data),
                                html: self.formatListHtml(self.formatList.html, data),
                                title: self.formatListHtml(self.formatList.title, data),
                                icon: self.formatListHtml(self.formatList.icon, data)
                            }
                            this.searchListTotal.push(tmp);
                        });
                        // this.searchList = JSON.parse(JSON.stringify(this.searchListTotal));
                    },
                    (response) => {

                    }
                )
            }
            else {
                this.searchList = this.searchListTotal.filter( item => {
                    return item.title != undefined && item.title != null ? item.title.toUpperCase().match(new RegExp('.*' + this.searchKeyword.toUpperCase() + '.*')) : false;
                });
            }
        },

        resolve(obj, path){
            path = path.split('.');
            let current = obj;
            while(path.length) {
                if(typeof current !== 'object') return undefined;
                current = current[path.shift()];
            }
            return current;
        },

        formatListHtml (str, data) {
            if (str !== null && str !== '') {
                let result = '';
                let preStr = str.split("{{");
                if (preStr.length > 0) {
                    let afterStr = preStr[1].split("}}");
                    let dataObj = this.resolve(data, afterStr[0]);
                    result = preStr[0] + dataObj + afterStr[1];
                }
                else result = eval(preStr);
                return result;
            }
            return str;
        },

        keypressAction (keyName, event){
            let pointerIndex = this.pointerIndex;
            // this.selectedValue = null;
            switch (keyName) {
                case 'ArrowDown':
                    if (this.pointerIndex == null || this.pointerIndex >= this.searchList.length - 1){
                        pointerIndex = 0;
                    } else {
                        pointerIndex++;
                    }
                    // this.selectedValue = this.searchList[pointerIndex].id;
                    // this.switchList(true);
                    break;
                case 'ArrowUp':
                    if (this.pointerIndex == null || this.pointerIndex == 0){
                        pointerIndex = this.searchList.length-1;
                    } else {
                        pointerIndex--;
                    }
                    // this.selectedValue = this.searchList[pointerIndex].id;
                    // this.switchList(true);
                    break;
                case 'Enter':
                    // this.selectedValue = this.searchList[pointerIndex].id;
                    this.switchList(false);
                    this.selectItem(pointerIndex);
                    break;
                default:
                    pointerIndex = null;
                    this.selectedValue = null;
            }
            this.pointerIndex = pointerIndex;
            if(event!= null){
                event.target.selectionStart = event.target.selectionEnd = event.target.value.length;
            }
        }
    },

}
