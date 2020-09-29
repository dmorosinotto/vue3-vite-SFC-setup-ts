import { createStore, Store, Module } from "vuex";

//ESTRAGGO LA DEFINIZIONE DELLO STATE
export type inferState<T extends Store<any>> = T extends Store<infer S> ? S : never;
// export type TS = inferState<typeof vstore>;

//HELPER PER AGGIUNGRE RITARDO CHIAMATA API PER VEDRE IL LOADING...
export const delay = (ms: number = 2500) => new Promise(resolve => setTimeout(resolve, ms));

//DEFINIZIONE DELLO STATE UTILIZZANDO Module + TRICK TS PER FARE COMPOSIZIONE RootState
//VEDI DOCS VUEX SULLA ORGANIZZAZIONE MODULI: https://vuex.vuejs.org/guide/modules.html
export interface RootState {
	//INTERFACCIA PARTE VUOTA POI USO FEATURE TS OPEN-ENDING X ARRICHIRLA OGNI MODULO CON LA SUA PARTE
}

/* ******************************************************************************
 * * *
 * GESTIONE MODULE Auth (POTREBBE ESSER SU FILE SEPARATO ./modules/Auth.ts)
 * * *
 */

export interface AuthState {
	authenticated: boolean;
}
export interface RootState {
	auth: AuthState;
}

const moduleAuth: Module<AuthState, RootState> = {
	//ASSOMIGLIA AL data() DI UN COMPONENTE
	state() {
		return {
			//INITIAL STATE!
			authenticated: false
		};
	},

	//ASSOMIGLIA A computed DI UN COMPONENTE -> SONO LE QUERY CQRS PER LEGGERE PARTI DELLO STORE
	namespaced: false, //OSSIA GETTERS E MUTATION ESPOSTE A ROOT
	getters: {
		//PERO DENTRO IL CODICE state E' COMUNQUE QUELLO LOCALE!!
		authenticated: state => state.authenticated
	},

	//ASSOMIGLIA A METHODS CON IL COMPITO DI MUTARE LO state -> SONO I COMMAND CQRS PER MODIFICARE
	mutations: {
		login(state, cred: { user: string; pwd: string } | boolean = false) {
			if (typeof cred === "object" && cred.user === cred.pwd) {
				state.authenticated = true;
				//TODO: DOPO LOGIN OK CARICO DINAMICAMENTE MODULO Counter
				//vstore.registerModule("counter", moduleCounter); //NON POSSO FARLO QUI AVREI REF-CIRCOLARI VEDI CODICE App.vue
			} else state.authenticated = !!cred;
		}
	}
};

/* ******************************************************************************
 * * *
 * GESTIONE MODULE Posts (POTREBBE ESSER SU FILE SEPARATO ./modules/Posts.ts)
 * * *
 */

export interface PostsState {
	data: Array<{ id: number; title: string; body: string }>;
	pending?: string;
}
export interface RootState {
	posts: PostsState;
}

const modulePosts: Module<PostsState, RootState> = {
	state() {
		//INITIAL STATE!
		return {
			data: []
			//pending: undefined
		};
	},
	namespaced: true, //OSSIA GETTERS, MUTATIONE E ACTION SONO SOTTO posts/xxxx E NON A ROOT!
	getters: {
		//I getters SONO LE QUERY CQRS PER LEGGERE PARTI DELLO STORE (CHE E' LOCALE)
		loading: state => !!state.pending,
		searchById: (state, _otherGetters, _rootState, _rootGetters) => (ID: number) =>
			state.data.find(p => p.id === ID)
	},
	mutations: {
		//ATTENZIONE: mutation SONO SINCRONE!!!
		setPost(state, payload: PostsState["data"]) {
			state.data = payload;
		}
	},
	//SE SI VUOLE CHIMARE API / OPERAZIONI ASYNCRONE -> USARE actions CHE POI INVOCANO mutation
	actions: {
		async LoadPostAsync(ctx, ids?: number | number[]) {
			if (!ctx.rootGetters.authenticated) return; //POSSO USARE ctx.rootGetters PER ACCEDERE AI GETTERS GLOBALI
			ctx.state.pending = "LOADING..."; //POSSO USARE ctx.state PER ACCEDERE DIRETTAMENTE STATO LOCALE!
			try {
				let res = await window.fetch(`https://jsonplaceholder.typicode.com/posts/${ids || ""}`);
				await delay(3000); //FAKE DELAY 3s
				if (res.ok) {
					let posts = await res.json();
					//NORMALMENTE SI USA ctx.commit PER INVOCARE LA MUTATION LOCALI!
					ctx.commit("setPost", posts); //TODO: DI DEFAULT USO LE MUTATION LOCALI AUTO-PREFIX posts/...
					//ctx.commit("post/setPost", posts, { root: true }); //TODO: VOLENCO POSSO INVARE ANCHE QUELLE GLOBALI
					//MA VOLENDO POSSO USARE ANCHE ctx.state DIRETTAMENTE PER MODIFICARE STATE LOCALE!
					ctx.state.pending = "FINISH";
				} else ctx.state.pending = `ERROR HTTP-${res.status} ${res.statusText}`;
			} catch (err) {
				ctx.rootState.posts.pending = err; //POSSO USARE ctx.rootState PER ACCEDERE ALLO STATO GLOBALE
			}
		}
	}
};

/* ******************************************************************************
 * * *
 * GESTIONE MODULE Counter (POTREBBE ESSER SU FILE SEPARATO ./modules/Counter.ts)
 * INOLTRE LO CARICO DINAMICAMENTE AL VOLO AGGANCIANDOLO ALLO STORE DOPO IL login
 * * *
 */
export interface CounterState {
	count: number;
}
export interface RootState {
	counter?: CounterState;
}

//TODO: QUESTO MODULO LO CARICO DINAMICAMENTE DOPO IL LOGIN (vedi App.vue)
export const moduleCounter: Module<CounterState, RootState> = {
	state() {
		//INITIAL STATE!
		return {
			count: 0
		};
	},
	namespaced: true, //OSSIA MUTATIONE SONO SOTTO counter/xxxx E NON A ROOT!
	mutations: {
		increment(state) {
			state.count += 1;
		}
	}
};

/* ******************************************************************************
 * * *
 * ALLA FINE DEFINISCO LO STORE GLOBALE CARICANDO I VARI MODULES
 * * *
 */

export const vstore = createStore<RootState>({
	modules: {
		//counter: moduleCounter, //TODO: QUESTO VIENE CARICATO DINAMICAMENTE QUANDO FACCIO login
		auth: moduleAuth,
		posts: modulePosts
	}
});
