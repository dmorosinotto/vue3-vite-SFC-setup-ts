<template>
	<h3>Vuex! <span v-if="!auth" @click="login">👤</span></h3>
	<!-- COUNTER E' MODULO CARICATO AL VOLO DOPO AVER FATTO IL LOGIN -->
	<button @click="increment" :disabled="!authenticated">Double {{ count }}</button>
	<button @click="load()">{{ pending || "LOAD" }}</button>
	<pre v-if="pending">{{ searchById(1) }}</pre>
	<pre v-if="authenticated">{{ find(22) }}</pre>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from "vuex";
import { RootState, moduleCounter } from "./vuex-store";

const { mapGetters: postGetters } = createNamespacedHelpers("posts"); //ESTRAGGO GETTER DI SPECIFICO NAMESPACE

export default {
	//ESEMPIO UTILIZZO VUEX DA setup = composition API
	setup() {
		const store = useStore<RootState>();
		const pending = computed(() => store.state.posts.pending);

		function login() {
			//QEUSTO E' IL MODO CORRETTO DI INVOCARE mutation -> COMMAND CQRS
			store.commit("login", true); //ATTENZIONE: mutation E' SEMPRE SINCRONA!!
			//FUNZIONA ANCHE INVOCAZIONE ALLA redux -> store.commit({type: "login", user: "X", pwd: "X"})
			//E SI POSSONO ANCHE INVOCARE action -> store.dispatch("LoadPostAsync", [1,2,3])
			store.dispatch("posts/LoadPostAsync", ["NOT", "FOUND"]); //action E' ASYNCRONA E INTERNAMENTE MODIFICA STATO TRAMITE ctx
			//TODO: DOPO LOGIN OK CARICO DINAMICAMENTE MODULO Counter
			store.registerModule("counter", moduleCounter);
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
			return this.$store.state?.counter?.count; //ACCESSO DIRETTO A STATE USANDO this.$store
		},
		...mapGetters(["authenticated"]), //MA E' MEGLIO ESPORRE DIRETTAMENTE I GETTERS
		...postGetters(["searchById"]), //ESPONGO IL GETTER DEL NAMESPACE posts/searchById
		...mapGetters({ find: "posts/searchById" }) //ESPONGO IL GETTER DEL NAMESPACE posts/searchById
	},
	methods: {
		//ESEMPIO DI MODIFICA DELLO STATO VUEX
		increment() {
			//BAD PRACTICES: DI SOLITO LO STATO NON VIENE MUTATO DIRETTAMENTE
			this.$store.state.counter.count += 1;
			//MA TRAMITE commit mutation -> AKA CQRS COMMAND
			this.$store.commit("counter/increment");
		},
		//MEGLIO ANCORA SE ESPONGO DIRETTAMENTE LE ACTIONS (async) CON RIMAPPATURA SU METODI
		...mapActions({ load: "posts/LoadPostAsync" }) //EQUIVALE A this.$store.dispatch("posts/LoadPostAsync")
	}
};
</script>