<template>
	<form @submit.prevent="alert(frmValue)">
		<label>Hello World</label>
		<my-input name="Username" :value="frm.username.value" @update="updField" required></my-input>
		<MyInput name="Password" :value="frm.password.value" @update="updField" type="password" :minlength="5" />
		<my-button msg="'genera rnd'" @onUpd="rnd" color="white" background="darkblue"></my-button>
		<MyButton msg="ciao" :val="ok" disabled @num="alert" />
		<MyButton type="submit" msg="SAVE" background="green" :disabled="isInvalid" />
		<!-- <pre> VALID={{ !isInvalid }} FRM= {{ frm }} </pre> -->
	</form>
</template>

<script>
// ESEMPIO CLASSISCO SFC CON CLASSICHE option-api
import MyButton from "./MyButton.vue";
import MyInput from "./MyInput.vue";

export default {
	components: { MyButton, MyInput },
	data() {
		return {
			ok: Math.random(),
			frm: {
				username: { value: "", valid: false },
				password: { value: "", valid: false },
			},
		};
	},
	methods: {
		rnd() {
			this.ok = Math.random();
		},
		alert(what) {
			window.alert(JSON.stringify(what));
		},
		updField(payload) {
			console.log(payload);
			const field = payload.name.toLowerCase();
			this.frm[field].value = payload.value;
			this.frm[field].valid = !payload.errors.length; //VALID SE ARRAY VUOTO!
		},
	},
	computed: {
		isInvalid() {
			return Object.values(this.frm).some((f) => !f.valid);
		},
		frmValue() {
			return Object.entries(this.frm).reduce((obj, [key, val]) => {
				obj[key] = val.value;
				return obj;
			}, {});
		},
	},
};
</script>

<style>
body {
	font-family: Arial;
}
</style>
