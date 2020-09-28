import { createApp } from "vue";
import App from "./App.vue"; //SFC con option-api
//import App from "./App-SFC-setup+var.vue"; //NUOVA SINTASSI TS SFC <script setup>
//import App from "./App-Form+MyCmp.vue"; //ESEMPIO DI FORM + CUSTOM MyComp (option api + SFC TS)
//import App from "./Posts.vue"; //ESEMPIO DI COMP CON SLOT (MyCard) + CHIAMATE API Posts (SFC TS)
//import App from "./App+composable.vue"; //ESEMPIO DI USO SFC CON COMPOSITION API + ESTRETTO COMPOSABLE (usePoint)
//ESEMPIO UTILIZZO ROUTER
//import App from "./App-Router.vue"; //ESEMPIO DI USO Vue-Router + route.params + RouteGourd (SFC TS e anke options)
//import { router } from "./router";
// createApp(App).use(router).mount("#app");

//ESEMPOI UTILIZZO VUEX
import { vstore } from "./vuex-store";
createApp(App).use(vstore).mount("#app");
window.$$store = vstore; //HACKS GIUSTO PER DIMOSTRARE ACCESSO A VUEX State DALL'ESTERNO -> Reactivity
