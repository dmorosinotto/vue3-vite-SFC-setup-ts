<template>
	<article class="card">
		<header><slot name="head" /></header>
		<div class="content">
			<slot></slot>
		</div>
		<footer><slot name="foot" /></footer>
	</article>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
	border: 1px solid silver;
	border-radius: 8px;
	max-width: 200px;
	margin: 0 5px;
	cursor: pointer;
	box-shadow: 0px 1px 3px darkgrey;
	transition: 0.2s;
}
.card:hover {
	transition: 0.2s;
	box-shadow: 0px 1px 9px darkgrey;
}

article > * {
	padding: 16px;
	text-transform: capitalize;
	text-align: center;
}

header {
	font-size: 1.5em;
	border-bottom: 1px solid silver;
}

footer {
	border-top: 1px solid silver;
}
</style>
