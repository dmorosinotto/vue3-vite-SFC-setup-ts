<template>
	<h3>Hello and welcome to Vue Router</h3>
	<nav>
		<router-link to="/">Root</router-link>
		<router-link to="/hello">Hello</router-link>
		<router-link to="/posts">Posts</router-link>
		<router-link to="/post/3">Direct Post</router-link>
		<router-link to="/post/pippo">Pippo Post</router-link>
		<a href="/#/about">About</a>
		<router-link to="NOTEXIST">Not exist</router-link>
	</nav>
	<router-view></router-view>
</template>

<script setup lang="ts">
export default {};
</script>

<style scoped>
nav > *::after {
	content: "|";
	padding: 10px;
}
</style>