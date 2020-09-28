<template>
	<h3>Vuex! <span v-if="!auth" @click="login">👤</span></h3>

	<button @click="increment" :disabled="!authenticated">Double {{ count }}</button>
	<button @click="load()">{{ pending || "LOAD" }}</button>
	<pre v-if="pending">{{ searchById(1) }}</pre>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore, mapMutations, mapGetters, mapActions } from "vuex";
import type { TMyState } from "./vuex-store";
export default {
	//ESEMPIO UTILIZZO VUEX DA setup = composition API
	setup() {
		const store = useStore<TMyState>();
		const pending = computed(() => store.state.pending);

		function login() {
			//QEUSTO E' IL MODO CORRETTO DI INVOCARE mutation -> COMMAND CQRS
			store.commit("login", true); //ATTENZIONE: mutation E' SEMPRE SINCRONA!!
			//FUNZIONA ANCHE INVOCAZIONE ALLA redux -> store.commit({type: "login", user: "X", pwd: "X"})
			//E SI POSSONO ANCHE INVOCARE action -> store.dispatch("LoadPostAsync", [1,2,3])
			store.dispatch("LoadPostAsync", ["NOT", "FOUND"]); //action E' ASYNCRONA E INTERNAMENTE MODIFICA STATO TRAMITE ctx
		}
		return {
			login, //ESPONGO metodo -> CHE RICHIAMA mutation
			pending, //ESPONGO computed -> CHE LEGGE DIRETTMANTE store.state,
			auth: store.getters.authenticated //MA SAREBBE MEGLIO ESPORRE I GETTER (poteri usare mapGetter)
		};
	},

	//ESEMPIO UTILIZZO VUEX CON options API E ACCESSO DIRETTO ALLO STORE
	computed: {
		count() {
			return this.$store.state.count; //ACCESSO DIRETTO A STATE USANDO this.$store
		},
		...mapGetters(["authenticated", "searchById"]) //MA E' MEGLIO ESPORRE DIRETTAMENTE I GETTERS
	},
	methods: {
		//ESEMPIO DI MODIFICA DELLO STATO VUEX
		increment() {
			//BAD PRACTICES: DI SOLITO LO STATO NON VIENE MUTATO DIRETTAMENTE
			this.$store.state.count += 1;
			//MA TRAMITE commit mutation -> AKA CQRS COMMAND
			this.$store.commit("increment");
		},
		//MEGLIO ANCORA SE ESPONGO DIRETTAMENTE LE ACTIONS (async) CON RIMAPPATURA SU METODI
		...mapActions({ load: "LoadPostAsync" }) //EQUIVALE A this.$store.dispatch("LoadPostAsync")
	}
};
</script>