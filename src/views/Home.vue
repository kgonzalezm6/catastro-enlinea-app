<template>
	<div>
		<v-app>
			<Sidebar></Sidebar>
			<v-container class="home-bk ml-0 pl-0 pr-0 mr-0 pt-0" fluid>
				<router-view></router-view>
			</v-container>
		</v-app>
	</div>
</template>

<script>

	import Sidebar from '@/components/Home/Sidebar'

	export default {
		name: 'Home',
		components: {
			Sidebar
		},
	}
</script>

<style>

	.home-bk{
		background-color: #f5f5f5;
		flex: 1 1 auto
	}
</style>
