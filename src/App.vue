<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>

export default {
	name: 'App',
	components: {
		
	}
}
</script>

<style lang="scss" >
.el-scrollbar {
  >.el-scrollbar__bar {
    opacity: 1 !important;
  }
}
</style>
