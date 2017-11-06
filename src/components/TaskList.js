export default {
	props : ['value'],
	data () {
		return {
			task : null
		}
	},

	watch :{
		value(){
			if (this.value == undefined || this.value == null || this.value.length == 0){
				console.log('Array is NULL');
			}; 
		}
	},

	mounted(){
		this.task = this.value
	},

	methods : {
		haveButton(button){
			if(button == true){
				for (var i = 0; i < this.task.length; i++) {}
					return '<div class="task-btn-group"><button type="button" class="btn btn-primary btn-rounded" data-toggle="modal" data-target="#modal-task-' + i + '">Edit Condition</button></div>'
				
			}
		},
		addTask(button){
			var html = this.haveButton(button);
			this.task = this.task ? this.task : [];
			this.task.push({
				title : 'Condition' ,
				content : 'Your Condition',
				button : button,
				html : html
			})
			this.$emit('input', this.task);
		},
		deleteTask(){
			var self = this;
			// console.log(JSON.stringify(self.task));
			document.querySelector('.task:last-child').style.animation = "vanishOut";
			document.querySelector('.task:last-child').style.animationDuration = "0.5s";

			setTimeout(function () {
				self.task.pop();
			}, 500);
			this.$emit('input', this.task);
		},
		emptyTask(){
			this.task = [];
			this.$emit('input', this.task);
		}
	}
}