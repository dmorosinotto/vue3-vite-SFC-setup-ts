<template>
	<p>Hello World</p>
	<label>Hello World</label>
	<MyInput name="Name" />
	<MyButton msg="opacity=" :val="ok" @onUpd="rnd" />
</template>

<script setup>
// PER SINTASSI VEDI SFC setup + COMP VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#exposing-components
export { default as MyButton } from "./MyButton.vue";
export { default as MyInput } from "./MyInput.vue";
// EQUIVALE A VECCHIO data()
import { ref } from "vue";
export const ok = ref(0.5);
// EQUIVALE A VECCHIO methods
export function rnd() {
	ok.value = Math.random();
}
</script>

<style scoped vars="{ok}">
/* PER SINTASSI SFC + style VARS VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md */
label {
	display: block;
	opacity: var(--ok);
}
</style>
