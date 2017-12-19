import baseComponent from '../mixins/base-mixins'

export default {
    data() {
        return {
        	width : null,
        	height: null,
  			items: []
        }
    },

    components: {

    },

    props : [ 'id', 'label', 'name', 'disabled', 'list', 'alt', 'class-name'],

    mixins: [baseComponent],

    mounted() {
    	this.prepareItems(this.list)
        this.updateUiByModel()
    	this.update()
    },

    computed: {
    },

    watch:{
        value() {
            this.updateUiByModel()
        }
    },

    methods: {
        updateUiByModel(){
            if (this.value != undefined || this.value == null)
                this.items = this.value
        },

    	update() {
			this.$emit('input', this.items)
		},

    	prepareItems(list) {
			if (list == undefined || list == null || list.length == 0){
				if (this.default != undefined && this.default != null ){
					this.items = [this.default]
					return [this.default];
				}
				return [{ id : '', path : '' }];
			}

			let items = [];
			for(let i=0; i < list.length; i++){
				let listItem = list[i];   
                let className 
                if( listItem.className != null || listItem.className != undefined )
                    className = listItem.className
                else
                    className = this.getClassByPath(listItem.path)
                let name = this.getNameByPath(listItem.path)
				let item = {
                    id         : listItem.id, 
                    path       : listItem.path,
                    name       : name,
					path       : listItem.path,
                    className  : className,
				}
				items.push(item);
			}
			this.items = items
			return this.items
		},

        checkTypeFile(path){
            var pathEx = path.split('.').pop()
            return pathEx
        },

        getClassByPath(path){
            var fileEx = this.checkTypeFile(path)
            var itemClass = "preview"
            if (fileEx == "jpg" || fileEx == "jpeg" || fileEx == "png" ||  fileEx == "gif" ||  fileEx == "bmp"){
                return itemClass = itemClass + " dz-image-preview"
            }
            return itemClass
        },

        getNameByPath(path){
            var name = path.split('/').pop()
            return name = name.split('.').shift()
        },

        deleteThisImage(id){
        	for(var i = 0; i < this.items.length; i++){
        		if( this.items[i].id  == id ){
        			this.items[i].show = false
        			this.items.splice(i, 1)
        		}
        	}
        	this.update()
        },

        deleteAllImage(){
            for(var i = 0; i < this.items.length; i++){
                this.items[i].show = false
                this.items.splice(i, 1)
            }
        },
    }

}