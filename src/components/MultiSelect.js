import baseComponent from '../mixins/base-mixins'

export default {
    data () {
        return {
            isExpanding : false,
            searchList : [],
            pointerIndex : null, // Selecting index of list
            hoverIndex : null, // Position of cursor is hovering select item
            searchKeyword : '',
            isActive : false,
        }
    },
    mixins: [baseComponent],
    created () {
        this.searchList = this.list
        this.setStatus();
    },
    watch:{
        list(newList) {
            this.searchList = JSON.parse(JSON.stringify(newList))
        },
        resetSearchKeyWord() {
            if (this.resetSearchKeyWord) {
                this.searchKeyword = ''
                this.$emit('search-keywords', '');
            }
        },
        value(val){
            if(val != "" && val != null)
                this.isActive = true
            else this.isActive = false
        }

    },
    props: {
        list: {

        },
        value:null ,
        name : null,
        disabled: {

        },
        singleDropdown: {

        },
        disableIcon: {

        },
        placeholder: {

        },
        label:{

        },
        id:{

        },
        resetSearchKeyWord: {
            type: Boolean,
            default: false
        },
        hasSelectAll: false,
        selectAllId: {
            type: Number
        }
    },
    computed : {
        selected () { // Convert v-model to [] if it's null
            let selected = this.value ? this.value : (this.isSingle ? null : [])

            if (Array.isArray(selected)) {

                selected = selected.filter( el => {
                    return !!el || parseInt(el) === 0;
                })

                selected = selected.map( el => {
                    return parseInt(el)
                })
            }
            return selected
        },
        isSingle(){
            return this.singleDropdown === "true" ? true : false
        },
        listClasses () {
            return (this.isExpanding ? "active" : "")
        }
    },
    methods : {
        setStatus(){
            if(this.value != "" && this.value != null)
                this.isActive = true
            else {
                this.isActive = false
            }
        },
        editQuery()
        {
            let self = this;
            var getValue = this.value
            this.list.filter(function(index) {
                if (index.id == getValue) {
                    return self.searchKeyword = index.thumbHtml
                }
            })

            this.$emit('input', null)
            this.$nextTick(()=>{
                if(this.$refs.inputSearch)
                    this.$refs.inputSearch.focus();
            })
        },

        filterQuerylist(){
            this.list.filter(function(index, data) {
                if (data.id == this.value)
                    return data.thumbHtml
            })
        },

        closeDropdow(event){
            this.switchList(false);
            if(!this.value)
                this.searchKeyword = null
            if(this.searchList.length == 0){
                this.isExpanding = false
            }
        },

        blurSearch(){
            if(this.searchList.length == 0){
                this.searchKeyword = ""
            }
        },

        getSingleSelected(){

            if(this.list == undefined || this.list == null)
                return;
            if(Array.isArray(this.list))
            {
                let listSelected = this.list.filter( (item) => {
                    return item.id == this.selected
                })

                if (listSelected.length > 0)
                    return listSelected[0]
            }
            return;
        },

        getSelectedList () { // Get selected with full information [ { id : .. , html : ... } ]
            if (this.isSingle) return
            let selected = []
            // console.log('aa', this.selected)
            this.selected.forEach( (id, index) => {
                let item = this.list.find((value) => value.id == id)
                item.id = parseInt(item.id)
                if (item != undefined)
                    selected.push(item)
            })
            // console.log(selected)
            // selected = selected.map(elem => parseInt(elem.id))
            // console.log(selected)
            return selected
        },

        toggleList (e) {
            e.stopPropagation();
            this.switchList(!this.isExpanding);
        },

        switchList (on = true) {
            if (on)
                this.isExpanding = true
            else
                this.isExpanding = false
        },

        toggleItem(id){

            const itemSelected = this.searchList.find(item => item.id == id)

            if (itemSelected && itemSelected.disabled){
                return
            }

            if (!this.isSingle){
                id = parseInt(id)
                let selectList = [];

                if(this.value){
                    if(Array.isArray(this.value))
                        selectList = this.value.map(item => parseInt(item))
                }

                if (itemSelected && this.selectAllId && itemSelected.id == this.selectAllId){
                    selectList = selectList.filter(item => item == this.selectAllId || item == 0)
                }

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
                    if(this.$el.querySelector('input.input-control') != null){
                        this.$el.querySelector('input.input-control').focus()
                    }
                }
                else{
                    selectList = [id]
                    this.$emit('input', id)
                }

                // Reset search keyword at input field
                this.searchKeyword = ''
                this.focusInputAction('')

                this.$nextTick(()=>{
                    this.switchList(false)
                })
            }
        },
        hoverItem(index){ // Hover on item at (index) in searchList
            // this
        },

        searchAction (keyword) {
            this.searchKeyword = keyword
            this.switchList(true)
            this.$emit('search-keywords', keyword);
            if(keyword == undefined && keyword == null || keyword.length == 0) {
                this.searchList = JSON.parse(JSON.stringify(this.list))
                return
            }
            this.searchList = this.list.filter( (item, position) => {
                if (item.keywords == undefined || item.keywords == null)
                    return false
                let regex = new RegExp('.*' + keyword.toLowerCase() +'.*')
                return item.keywords.toLowerCase().match(regex)
            })
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
        },
        selectAll(){
            let list = this.searchList.map(elem => parseInt(elem.id))
            this.searchKeyword = ''
            this.$el.querySelector('input.input-control').focus()
            this.focusInputAction('')
            this.$emit('input', list)
        }
    }

}