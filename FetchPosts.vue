<template>
  <div class="cards">
    <button @click="fetchData()">LOAD</button>
    <Card v-for="p in posts" v-bind:key="p.id" :w="'30%'">
      <template v-slot:head>{{ p.title }}</template>
      <div class="content">
        {{ p.body }}
        <img
          :src="`https://via.placeholder.com/${p.id * 100}/${p.userId}${
            p.userId
          }ab${p.id * 10 + p.id}`"
        />
      </div>
      <template v-slot:foot>{{ p.id }} by {{ p.userId }}</template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
export { default as Card } from "./MyCard.vue";

const baseapi = "https://jsonplaceholder.typicode.com";
interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const posts = ref<IPost[]>([]);

//EQUIVALE A VECCHIO METHOD
export async function fetchData(rnd: number = Math.random()) {
  const ids = [...new Set(rnd.toFixed(9).split("").slice(2)).values()].filter(
    Number
  ); //ARRAY DI NUMERI RND
  const responses = await Promise.all(
    ids.map((id) => window.fetch(`${baseapi}/posts/${id}`))
  );
  const data: IPost[] = await Promise.all(responses.map((res) => res.json()));
  posts.value = data;
}
//EQIVALE AD ESEGUIRE fetchData() AL MOUNTED
watchEffect(() => fetchData());
</script>

<style scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
}
img {
  max-width: 100%;
}
</style>
