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
					<!-- <b>{{ '[' + index + ']'}}</b> -->
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
import TaskList from './../../components/TaskList'
export default TaskList
</script>