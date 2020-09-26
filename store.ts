import { reactive } from "vue";
import { default as FAKEPOSTS } from "./FAKE.js";

export type Post = {
	id: number;
	title: string;
	body: string;
	info: Info;
};

export type Info = {
	likes: number;
	hashtags: string[];
};

//CLASSE CHE FA DA CONTENITORE DELLO STATO (currHashtag SHARED STATE) + LOGICHE PER MANIPOLARLO
class Store {
	public state: { posts: Post[]; currHashtag?: string };
	constructor() {
		this.state = reactive({ ...FAKEPOSTS, currHashtag: "" }); //NOTARE UTILIZZO API DI Reactivity System DI VUE
	}

	//LOGICA MANIPOLAZIONE setHashtag PER EVITARE BUBBLE UP EVENTI, COMUNICAZIONE DIRETTA: hashtag => store => App
	setHashtag(tag: string) {
		this.state.currHashtag = tag;
	}

	//LOGICA DI INCREMENTO DEI LIKE (USATA DA PostCtrl => App) - POTEVO ANCHE FARLA INVOCAR DIRETTAMENTE SENZA EVENTO @like
	incrementLike(info: Info, postId: number) {
		//const post = this.state.posts.find((p) => p.id === postId); post.info.likes++; //MODO CLASSICO VERBOSO
		info.likes += 1; //MA FUNZIONA DIRETTAMENTE ANCHE COSI' PERCHE' reactive TRACCIA TRAMITE Proxy MODIFICHE A REFERENZE!
	}
}

// ISTANZA CONDIVISA DI STORE (currHashtag SHARED STATE) CHE CONSENTE COMUNICAZIONE "DIRETTA" TRA DIVERSI COMPONENTI SENZA RIMPALLO CLASSICO FLUSSO In-prop/Out-event
export const store = new Store();
