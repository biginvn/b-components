import baseComponent from '../mixins/loading-remote-data-mixins'
export default {
	data () {
		return {
			isShowingTag : false,
			_changeInterval : 0,
			searchKeyword : '',
			timer : null,
			searchList:[],
			list:[]
		}
	},
	mixins: [baseComponent],
	
	props : ['value','disable-icon','single-dropdown','url'],
	computed:{
		selected () { // Convert v-model to [] if it's null
			return this.value ? this.value : (this.isSingle ? null : [])
		},
		listClasses () {
			return (this.searchList.length == 0 ? "" : "active") + " b__multi__select__list"
		},
		isSingle(){
			return this.singleDropdown === "true" ? true : false 
		}
	},
	
	methods : {
		
		toggleItem(id){
			for(var i =0; i < this.searchList.length;i++){
				if(id == this.searchList[i].id){
					this.list.push(this.searchList[i]);
					this.isShowingTag = true
					this.value = this.list
					this.$emit('input',this.list);
				}
			}
			this.searchKeyword = "";
			this.searchList = [];
		},
		remove(index){
			this.list.splice(index,1);
					

			this.$emit('input', this.list)
		},
		change(){
			
			clearInterval(this.timer);
			var pointer = this;
			this._changeInterval = 0
			this.timer = setInterval(function() {
					pointer._changeInterval = pointer._changeInterval + 1;
					if(pointer._changeInterval == 5){
						pointer.callAjax(pointer.searchKeyword);
						clearInterval(pointer.timer);
						
					}
			}, 1000);
			
		},
		callAjax(value){
			
	       		this.$http.post(this.url,{'name':value},  { timeout: 10000 }).then(function(response){
	        		this.searchList = response.body;
	        	});
        	 	this.searchList = [{
		            id: 1,
		            html: '<p>Anh Duan Nguyen</p><p class="club">Bayern Munich</p><p><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star" aria-hidden="true"></i></p>',
		            keywords: 'Anh Duan Nguyen',
		            thumbHtml: 'Anh Duan Nguyen',
		            icon: 'https://as01.epimg.net/img/comunes/fotos/fichas/deportistas/x/xab/large/900.png'
		        }]
        },
        removeLastTag () {
	      	this.list.pop();
	        this.$emit('input', this.list)
	        
     	 }
	}
		

}