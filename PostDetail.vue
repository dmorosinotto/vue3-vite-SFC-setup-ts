<template>
	<hr />
	<button @click="goBack">Back</button>
	THIS IS THE POST DETAIL:
	<h3>{{ currPost.title }}</h3>
	<p>{{ currPost.body }}</p>
</template>

<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
import fakePosts from "./FAKE.js";

const route = useRoute();
const router = useRouter();
console.log("PARAMS", route.params, "ROUTER", router);

export const currPost = computed(() => {
	const posts = fakePosts.posts;
	return fakePosts.posts.find(p => String(p.id) === route.params.id);
});
export function goBack() {
	router.back();
}
//ESEMPIO DI WATCHER PER CONTROLLARE CAMBIO URL E FARE CARICAMENTO DATI...
watchEffect(() => {
	console.log("CAMBIO PARAMS", route.params);
	//this.fetchData(route.params.id)
});
//ESEMPIO ROUTEGARD PER CONTROLARE USCITA
onBeforeRouteLeave((to, from, next) => {
	const answer = window.confirm(`Sicuro di voler navigare verso ${to.fullPath} ?`);
	if (!answer) return false; //TORNANDO NULLA ANNULLO LA NAVIGAZIONE!
	next();
});
//ESEMPIO ROUTEGARD PER CONTROLLARE RICRICAMENTO / RIUTILIZZO ROUTE (CAMBIO params)
onBeforeRouteUpdate((to, from) => {
	//ACCETTO SOLO id NUMERICI
	if (isNaN(parseInt(String(to.params.id), 10))) {
		console.error("ACCETTO SOLO id NUMERICI", to.params.id, "NON VALIDO!");
		return false;
	} else console.warn("OK params VALIDI (RIUTILIZZO COMP) X NAV:", from, "->", to);
});
</script>