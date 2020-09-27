<template>
	<span @click="setHashtag">#{{ tag }}</span>
</template>
<script>
import { store } from "./store";
export default {
	props: { tag: { type: String } },
	methods: {
		//GESTIONE setHashtag FATTA TRAMITE Store (currHashtag SHARED STATE) PER EVITARE BUBBLE UP EVENTI, COMUNICAZIONE: hashtag => store => App
		setHashtag() {
			store.setHashtag(this.tag);
		}
	}
};
</script>
<style scoped>
span {
	padding: 5px;
	text-decoration: underline;
}
span:hover {
	color: green;
}
</style>
