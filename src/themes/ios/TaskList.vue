<template>
	<div class="b__components b-task">
		<div class="task-toolbar">
			<button type="button" class="btn btn-secondary" @click="addTask(true)">Condition</button>
			<button type="button" class="btn btn-secondary">Send Email Action</button>
			<button type="button" class="btn btn-secondary">Update Field Value Action</button>
			<button type="button" class="btn btn-secondary">Create Activity Value Action</button>
			<button type="button" class="btn btn-secondary">Wait Action</button>
			<!-- <button type="button" class="btn btn-secondary" @click="addTask(false)">Add (No action)</button> -->
			<button type="button" class="btn btn-secondary" @click="deleteTask">Delete</button>
			<button type="button" class="btn btn-secondary" @click="emptyTask">Empty</button>
		</div>
		<div v-for="(item, index) in task" :class="'task-el-' + index">
			<div class="task">
				<div class="task-title"> {{ item.title }}</div>
				<div class="task-content">
					{{ item.content }}
					<b>{{ '[' + index + ']'}}</b>
					<div v-html="item.html"></div>
				</div>
			</div>
			<div class="task-arrow" style="text-align: center;" v-if = "index < task.length - 1 ">
				<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 80" style="height:60px;">
					<title>arrow</title>
					<line x1="30" y1="1.21" x2="30" y2="78.79" fill="none" stroke="#374250" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
					<line x1="30" y1="78.79" x2="17.45" y2="66.23" fill="none" stroke="#374250" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
					<line x1="30" y1="78.79" x2="42.55" y2="66.23" fill="none" stroke="#374250" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
					<line x1="30" y1="1.21" x2="30" y2="78.79" fill="none" stroke="#374250" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" />
				</svg>
			</div>
		</div>
	</div>
</template>
<script>
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
</script>
<style type="text/css">
.task{
	display: block;
	width: 300px;
	border: 1px solid #DDDDDD;
	border-radius: 5px;
	text-align: center;
	margin: 0 auto;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	transition: .3s;
	-webkit-animation: fadeIn;
	animation: fadeIn;
	animation-duration: .5s;
	background: #fff;
}
.task:hover{
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.task-title{
	padding: 5px 0;
	background: #F0F0F0;
	font-weight: 600;
}
.task-content{
	padding: 20px;
}
.task-btn-group{
	margin-top: 20px;
}
.task-toolbar{
	margin: 30px auto;
	text-align: center;
}
.task-arrow{
	position: relative;
	-webkit-animation: movingTopToBottom;
	animation: movingTopToBottom;
	animation-duration: .5s;
}
</style>