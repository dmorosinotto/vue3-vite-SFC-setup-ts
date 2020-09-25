<template>
  <h1>{{ msg }} {{ distance }}</h1>
  <button @click="inc">COUNT: {{ count }}</button>
  <button @click="move('x')">X: {{ point.x }}</button>
  <button @click="move('y', count)">Y: {{ point.y }}</button>
  <pre>{{ history }}</pre>
</template>
<script setup lang="ts">
//ESEMPIO DI COMPOSITION API Vue3 <script setup> E' SHORTCUT X export default { setup() { ... }}
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
} from "vue";

//EQUIVALE A data() SU options-api
export const msg = "Hello";
export const count = ref(0); //ref PER SINGOLI VALORI --> PER MODIFICARE LATO CODICE USO .value!!!
export const history = ref([]);
//ESEMPIO DI UTILIZZO DI COMPOSABLE!!!
import { usePoint } from "./usePoint";
//DEVO RISPORTARE IO QUEL CHE VOGLIO USARE NEL MIO COMPONENTE (TRAMITE DESTRUCTURING)
export const { point, distance, move } = usePoint({ x: 3, y: 4 }); //E POSSO ANCHE PASSARE FACTORY - INIT

//EQUIVALENTI A watch SU options-api
//WATCH ESPLICITO DI PROPRIETA + SIDE-EFFECT MODIFICA history
watch([count, point], ([newC, newP], [oldC, oldP]) => {
  //DEVO ESPLICITARE IO ARRAY POSIZIONALE
  if (newC !== oldC) history.value.push(`Modificato COUNT: ${oldC} -> ${newC}`);
  if (newP !== oldP)
    history.value.push(`NON TRACCIA reactive!!! POINT: ${oldP} -> ${newP}`);
});

//LA DIFFERENZA E' CHE watchEffect DETERMINA IN AUTOMATICO LE DIPENDENZE DI CUI FARE watch
//IN BASE AL CODICE / ESPRESSINI USATE - INOLTRE ESEGUE IL SIDE-EFFECT ANCHE IN PARTENZA!!!
watchEffect(() => {
  console.warn("TOTALE =", point.y + count.value); //DIPENDE SOLO DA y e count NON DA X!!!
});

//EQUIVALE A methods SU options-api
export function inc() {
  count.value += 1; //NOTARE UTILIZZO .value PER ref!
}

//EQUIVALENTE A mounted LIFE-CYCLES HOOKS
onMounted(() => console.log("mounted LIFE-CYCLE IN setup"));
onUnmounted(() => console.log("unmounted LIFE-CYCLE"));
</script>