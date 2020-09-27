import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"; //"vue-router/dist/vue-router.esm.js" //FIX PER PROBLEMA TEMPORANEO DI Vite CON vue-router
import { default as Hello } from "./Hello.vue";
import { default as Posts } from "./Posts.vue";
import { default as PostDetail } from "./PostDetail.vue";
// import { default as About } from "./About.vue";

export const router = createRouter({
	history: createWebHashHistory(), // createWebHashHistory("/same/mount/baseurl/")
	routes: [
		{ name: "hello", path: "/hello", component: Hello },
		{
			name: "posts",
			path: "/posts",
			component: Posts,
			children: [{ name: "nested-detail", path: ":id", component: PostDetail }]
		},
		{
			name: "direct-post",
			path: "/post/:id",
			component: PostDetail,
			//ESEMPIO ROUTEGUARD IN INGRESSO (ESEMPIO X VALIDARE AUTH -> REDIRECT login)
			beforeEnter: (to, from, next) => {
				if (from.fullPath === "/about") {
					console.error("NAVIGAZIONE DA about NON CONSENTITA");
					next(false); // reject the navigation
					//SE NON USO NEXT BASTA FARE return false;
				} else if (isNaN(parseInt(String(to.params.id)))) {
					console.warn("PARAMS NON VALIDO -> REDIRECT TO HOME");
					return next("/home"); //REDIRECT
				} else next(); //SE CHIAMO next() LA NAVIGAZIONE VIENE CONSENTITA
			}
		},
		{ name: "about", path: "/about", component: import("./About.vue") } //LAZY ABOUT */
	]
});
