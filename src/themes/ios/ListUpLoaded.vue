<!-- Author: Make By Thien Nguyen Developer -->
<!-- Contacts: thien.nguyen@bigin.vn -->
<!-- Date: 31/10/2017 -->
<!-- Component: ImageGallery -->

<template>
	<div class="b__components b__uploaded">
		<div class="b__components b__upload">
			<div class="uploadTest__preview__container">
				<div v-for= "item in items" :class="item.className">
					<div class="dz-thumb" style="animation: fadeOut;">
						<img v-if="item.className != 'preview'" data-dz-thumbnail="" :src="item.path">
						<img v-else data-dz-thumbnail="">
					</div> 
					<a :href="item.path"><span data-dz-name="" class="dz-name">{{ item.name }}</span></a>
					<a data-dz-remove="" class="remove-archive" @click="deleteThisImage(item.id)"><i class="fa fa-trash-o"></i></a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import ListUpLoaded from './../../components/ListUpLoaded'
	export default ListUpLoaded
</script>
