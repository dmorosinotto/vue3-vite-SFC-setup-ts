import { createApp } from "vue";
import App from "./App.vue"; //SFC con option-api
//import App from "./App-SFC-setup+var.vue"; //NUOVA SINTASSI TS SFC <script setup>
//import App from "./App-Form+MyCmp.vue"; //ESEMPIO DI FORM + CUSTOM MyComp (option api + SFC TS)
//import App from "./Posts.vue"; //ESEMPIO DI COMP CON SLOT (MyCard) + CHIAMATE API Posts (SFC TS)
//Import App from "./App+composable"; //ESEMPIO DI USO SFC CON COMPOSITION API + ESTRETTO COMPOSABLE (usePoint)
import { router } from "./router";

createApp(App).use(router).mount("#app");
