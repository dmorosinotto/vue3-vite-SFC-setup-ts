<template>
	<p>LIST POSTS: <button @click="goNext()">NEXT</button></p>
	<ul>
		<li v-for="p in posts" :key="p.id" :class="{ active: p.id === currId }">
			<router-link :to="`/posts/${p.id}`">{{ p.title }}</router-link>
		</li>
	</ul>
	<router-view></router-view>
</template>

<script lang="ts">
import fakePosts from "./FAKE.js";
//FATTO CON COMPOSITION API
//import { ref, computed } from "vue";
//export const posts = ref(fakePosts.posts);
//export currId = computed(()=>return useRoute().params.id)
//FATTO CON OPTIONS API + ACCESSO A this.$router / this.$route
export default {
	data() {
		return {
			posts: fakePosts.posts
		};
	},
	computed: {
		currId() {
			return +this.$route.params.id;
		}
	},
	methods: {
		goNext() {
			let id = 1 + ((this.currId || 0) % this.posts.length);
			this.$router.push({ name: "nested-detail", params: { id } });
			//EQUIVALE A this.$router.push(`/posts/${id}`);
		}
	},
	//ESEMPIO DI WATCHER PER CONTROLLARE CAMBIO URL E FARE PRELOAD DATI...
	watch: {
		$route: {
			handler: (val, oldVal) => {
				console.log(`NAVIGATE from: `, oldVal, "-> to:", val);
				//this.fetchData(val.params.id)
			},
			immediate: true
		}
	},
	//ESEMPIO DI ROUTE GUARDS PER CONTROLLO ACCESSO
	beforeRouteEnter(to, from, next) {
		console.log("GUARD :", to, from);
		if (from.fullPath === "/about" || to.fullPath === "/about") {
			//NON CONSENTO DI NAVIGARE DA/A About
			next("/home"); //REDIRECT TO HOME (O LOGIN!)
		} else next(); //QUANDO CHIAMO next LA NAVIGAZIONE E' CONSENTITA
	}
};
</script>

<style scoped>
.active {
	background-color: red;
}
</style>