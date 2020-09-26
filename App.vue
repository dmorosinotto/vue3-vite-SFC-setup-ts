<template>
  <label class="inline">
    Filter: <input type="text" :value="currHashtag" @input="setHashtag" />
  </label>
  <div class="posts">
    <MyCard v-for="post in filterPosts" :key="post.id" w="50%">
      <template v-slot:head>{{ post.title }}</template>
      {{ post.body }}
      <template v-slot:foot>
        <!-- GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App -->
        <!-- <PostCtrl :info="post.info" @setHashtag="filterByTag" /> -->
        <PostCtrl :info="post.info" @like="likeIt($event, post.id)" />
      </template>
    </MyCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
export { default as MyCard } from "./MyCard.vue";
export { default as PostCtrl } from "./PostCtrl.vue";
import { store, Info } from "./store";

// GESTIONE CLASSICA setHashtag FATTA CON EVENTI PostCtrl => MyCard => App + HO currHashtag LOCALE
// export const currHashtag = ref("");
// export function filterByTag(tag: string) {
//   console.log("FILTER by TAG -> ", tag);
//   currHashtag.value = tag;
// }

//GESTIONE FILTRO CON INPUT MANUALE
export const currHashtag = computed(() => store.state.currHashtag);
export function setHashtag(evt) {
  store.setHashtag(evt.target.value);
}

export const filterPosts = computed(() => {
  // const tag = currHashtag.value; // GESTIONE CLASSICA setHashtag FATTA CON EVENTI + currHashtag LOCALE
  const tag = store.state.currHashtag;
  return tag
    ? store.state.posts.filter((p) =>
        p.info.hashtags.some((t) => t.includes(tag))
      )
    : store.state.posts;
});

// GESTIONE CLASSICA like FATTA CON EVENTI child => parent => App store
export function likeIt(info: Info, postId: number) {
  //IN VERITA' BASTA PASSARE ANCHE SOLO info GRAZIE AL Reactivity System di VUE CON Proxy CHE MONITORA ref INTERNE
  store.incrementLike(info, postId);
}

export default {};
</script>

<style>
body {
  margin: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.posts {
  display: flex;
  flex-wrap: wrap;
}
.inline {
  display: flex;
  padding: 5px;
}
.inline > input {
  margin-left: 10px;
}
</style>
