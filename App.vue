<template>
	<label class="inline">
		Search tag: <input type="text" :value="S.currHashtag" @input="S.setHashtag($event.target.value)" /> 🔍
	</label>
	<div class="posts">
		<MyCard v-for="post in S.filterPosts" :key="post.id" w="50%">
			<template v-slot:head>{{ post.title }}</template>
			{{ post.body }}
			<template v-slot:foot>
				<!-- GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App -->
				<!-- <PostCtrl :info="post.info" @setHashtag="filterByTag" /> -->
				<PostCtrl :info="post.info" @like="S.incrementLike($event, post.id)" />
			</template>
		</MyCard>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
export { default as MyCard } from "./MyCard.vue";
export { default as PostCtrl } from "./PostCtrl.vue";
import { store, Info } from "./store";
export const S = ref(store); //REFACTOR ESPONGO LO store AL <template> PER INVOCARE DIRETTAMENTE GETTERS/METODI

// GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App + HO currHashtag LOCALE
// export const currHashtag = ref("");
// export function filterByTag(tag: string) {
//   console.log("FILTER by TAG -> ", tag);
//   currHashtag.value = tag;
// }

/* REFACTOR SPOSTATA TUTTA LA LOGICA NELLO STORE QUERY -> GETTERS / COMMAND -> METODI MANIPOLAZIONE
//GESTIONE FILTRO CON INPUT MANUALE
export const currHashtag = computed(() => store.state.currHashtag);
export function setHashtag(evt) {
	store.setHashtag(evt.target.value);
}

export const filterPosts = computed(() => {
	// const tag = currHashtag.value; // GESTIONE CLASSICA setHashtag FATTA CON EVENTI + currHashtag LOCALE
	const tag = store.state.currHashtag;
	return tag ? store.state.posts.filter((p) => p.info.hashtags.some((t) => t.includes(tag))) : store.state.posts;
});

// GESTIONE CLASSICA like FATTA CON EVENTI child => parent => App store
export function likeIt(info: Info, postId: number) {
	//IN VERITA' BASTA PASSARE ANCHE SOLO info GRAZIE AL Reactivity System di VUE CON Proxy CHE MONITORA ref INTERNE
	store.incrementLike(info, postId);
}
*/

export default {};
</script>

<style scoped>
.posts {
	display: flex;
	flex-wrap: wrap;
}
.inline {
	display: flex;
	font-size: 18px;
	padding: 10px;
}
.inline > input {
	width: 80%;
	margin-left: 30px;
	height: 24px;
	font-size: inherit;
	border: none;
	border-bottom: 1px solid grey;
	outline: none;
}
</style>
