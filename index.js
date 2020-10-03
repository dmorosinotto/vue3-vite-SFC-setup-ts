import { createApp } from "vue";
//import App from "./App.vue"; //SFC con option-api
//import App from "./App-SFC-setup+var.vue"; //NUOVA SINTASSI TS SFC <script setup>
//import App from "./App+composable.vue"; //ESEMPIO DI USO SFC CON COMPOSITION API + ESTRETTO COMPOSABLE (usePoint)

//LOGIN
// import App from "./App-Form+MyCmp.vue"; //ESEMPIO DI FORM + CUSTOM MyComp (option api + SFC TS)
//POSTS
import App from "./PostStore.vue"; //ESEMPIO DI COMP CON SLOT (MyCard) + CHIAMATE API Posts (SFC TS)
createApp(App).mount("#app");


//ESEMPIO UTILIZZO ROUTER
//import App from "./App-Router.vue"; //ESEMPIO DI USO Vue-Router + route.params + RouteGourd (SFC TS e anke options)
//import { router } from "./router";
// createApp(App).use(router).mount("#app");


//ESEMPOI UTILIZZO VUEX+FETCH
// import App from "./App+Vuex.vue"; //SFC con option-api
// import { vstore } from "./vuex-store";
// createApp(App).use(vstore).mount("#app");
// window.$$store = vstore; //HACKS GIUSTO PER DIMOSTRARE ACCESSO A VUEX State DALL'ESTERNO -> Reactivity
