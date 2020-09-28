import { createStore, Store } from "vuex";

//ESTRAGGO LA DEFINIZIONE DELLO STATE
export type inferState<T extends Store<any>> = T extends Store<infer S> ? S : never;
// export type TS = inferState<typeof vstore>;
export type TMyState = {
	count: number;
	authenticated: boolean;
	posts: Array<{ id: number; title: string; body: string }>;
	pending?: string;
};

export const delay = (ms: number = 2500) => new Promise(resolve => setTimeout(resolve, ms));

export const vstore = createStore<TMyState>({
	//ASSOMIGLIA AL data() DI UN COMPONENTE
	state() {
		return {
			//INITIAL STATE!
			count: 0,
			authenticated: false,
			posts: []
		};
	},

	//ASSOMIGLIA A computed DI UN COMPONENTE -> SONO LE QUERY CQRS PER LEGGERE PARTI DELLO STORE
	getters: {
		authenticated: state => state.authenticated,
		loading: state => !!state.pending,
		searchById: (state, _otherGetters) => (ID: number) => state.posts.find(p => p.id === ID)
	},

	//ASSOMIGLIA A METHODS CON IL COMPITO DI MUTARE LO state -> SONO I COMMAND CQRS PER MODIFICARE
	mutations: {
		increment(state) {
			state.count += 1;
		},
		login(state, cred: { user: string; pwd: string } | boolean = false) {
			if (typeof cred === "object" && cred.user === cred.pwd) {
				state.authenticated = true;
			} else state.authenticated = !!cred;
		},
		//ATTENZIONE: mutation SONO SINCRONE!!!
		setPost(state, payload: any[]) {
			state.posts = payload;
		}
	},
	//SE SI VUOLE CHIMARE API / OPERAZIONI ASYNCRONE -> USARE actions CHE POI INVOCANO mutation
	actions: {
		async LoadPostAsync(ctx, ids?: number | number[]) {
			if (!ctx.getters.authenticated) return; //POSSO USARE ctx.getters PER ACCEDERE AI GETTERS
			ctx.state.pending = "LOADING..."; //POSSO USARE ctx.state PER ACCEDERE DIRETTAMENTE STATO
			try {
				let res = await window.fetch(`https://jsonplaceholder.typicode.com/posts/${ids || ""}`);
				await delay(3000); //FAKE DELAY 3s
				if (res.ok) {
					let posts = await res.json();
					//NORMALMENTE SI USA ctx.commit PER INVOCARE LA MUTATION PER ALTARE LO STATO
					ctx.commit("setPost", posts);
					//MA VOLENDO POSSO USARE ANCHE ctx.state DIRETTAMENTE
					ctx.state.pending = "FINISH";
				} else ctx.state.pending = `ERROR HTTP-${res.status} ${res.statusText}`;
			} catch (err) {
				ctx.state.pending = err;
			}
		}
	}
});
