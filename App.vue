<template>
	<label>Hello World</label>
	<my-button msg="'genera rnd'" @onUpd="rnd" color="white" background="darkblue"></my-button>
	<MyButton msg="ciao" :val="ok" disabled @num="alert" />
</template>

<script>
// ESEMPIO CLASSISCO SFC CON CLASSICHE option-api
import MyButton from "./MyButton.vue";
export default {
	components: { MyButton },
	data() {
		return {
			ok: Math.random()
		};
	},
	methods: {
		rnd() {
			this.ok = Math.random();
		},
		alert(num) {
			window.alert(num);
		}
	}
};
</script>

<style scoped>
label {
	display: block;
}
</style>
