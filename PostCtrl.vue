<template>
	<button @click="incLike">❤️ {{ info.likes }}</button><br />
	<!-- GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App -->
	<!-- <span v-for="tag in info.hashtags" @click="setHashtag(tag)">{{ tag }}</span> -->

	<!-- GESTIONE setHashtag FATTA TRAMITE Store (currHashtag SHARED STATE) PER EVITARE BUBBLE UP -->
	<hashtag v-for="tag in info.hashtags" :key="tag" :tag="tag" />
</template>

<script setup="props, { emit }" lang="ts">
import type { Info } from "./local-infos";
export { default as hashtag } from "./hashtag.vue";

declare const props: { info: Info };
// GESTIONE CLASSICA setHashtag FATTA CON EVENTI child => parent => App
// declare function emit(event: "setHashtag", payload: string): void;
// export function setHashtag(tag: string) {
//   emit("setHashtag", tag);
// }

// GESTIONE CLASSICA like FATTA CON EVENTI child => parent => App store
declare function emit(event: "like", payload: Info): void;
export function incLike(tag: string) {
	emit("like", props.info);
}

export default { inheritAttrs: true };
</script>
