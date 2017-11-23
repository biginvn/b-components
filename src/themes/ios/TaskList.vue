<template>
	<div class="b__components b-task">
		<div class="task-toolbar">
			<button type="button" class="btn btn-default btn-rounded" @click="addTask(true)">Add Condition</button>
			<!-- <button type="button" class="btn btn-default btn-rounded" @click="changeStatusModal">Send Email Action</button> -->

			<!-- <button type="button" class="btn btn-default btn-rounded">Update Field Value Action</button>
			<button type="button" class="btn btn-default btn-rounded">Create Activity Value Action</button>
			<button type="button" class="btn btn-default btn-rounded">Wait Action</button> -->
			<!-- <button type="button" class="btn btn-default btn-rounded" @click="addTask(false)">Add (No action)</button> -->
			<!-- <button type="button" class="btn btn-default btn-rounded" @click="deleteTask">Delete</button>
			<button type="button" class="btn btn-default btn-rounded" @click="emptyTask">Empty</button> -->
		</div>
		<b-modal v-if="showModal" v-model="showModal"></b-modal>
		<div v-for="(item, index) in task" :class="'task-el-' + index">
			<div class="task">
				<div class="task-title"> {{ item.title }}</div>
				<div class="task-content">
					<div v-html="item.content"></div>
					<!-- {{ item.content }} -->
					<!-- <b>{{ '[' + index + ']'}}</b> -->
					<div class="task-btn-group" v-html="item.html"></div>
				</div>
				<div class="task-remove" @click="deleteTask(index)">
					<span><i class="fa fa-remove"></i></span>
				</div>
			</div>
			<div class="task-arrow" style="text-align: center;" v-if = "index < task.length - 1 ">
				<svg data-name="svg-task-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 80" style="height:60px;">
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