<template>
	<button :style="{ border: border }" @click="update">Button {{ MSG }}</button>
</template>

<script setup="props, { emit }" lang="ts">
// PER SINTASSI SFC SETUP + TS VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#with-typescript
declare const props: {
	msg: string;
	val?: number;
	color?: string;
	background?: string;
};
declare function emit(event: "onUpd"): void;
declare function emit(event: "num", n: number): void;

// EQUIVALE A VECCHIO computed
import { computed } from "vue";
export const MSG = computed(() => props.msg.toUpperCase() + ` ${props.val?.toFixed(2) ?? "--"}`);
export const border = computed(() => (!props?.background ? "1px solid black" : "none"));
// EQUIVALE A VECCHIO methods
export const update = () => (props.val ? emit("num", props.val) : emit("onUpd")); //NOTARE TYPESAFE IN BASE A CHIAVE PROVARE: emit("num","123"); OPPURE emit("num",props.val);

// USATO PER DEFINIRE ULTERIRORI ATTRIBUTI default VEDI:  https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md#declaring-props-or-additional-options
export default { inheritAttrs: true };
</script>

<style scoped vars="{ color, background }">
/* PER SINTASSI SFC + style VARS VEDI: https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md */
button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
button {
	background: var(--background, none);
	color: var(--color, black);
	/* border: none; */
	border-radius: 5px;
	padding: 10px 25px;
	font-size: 16px;
	cursor: pointer;
}
button:hover {
	filter: brightness(150%);
}
</style>
