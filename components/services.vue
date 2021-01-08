<template>
  <v-container>
    <v-row align-content="stretch">
      <v-col v-for="card in cards" :key="card.title">
        <v-card style="height:100%" class="mx-auto" max-width="400">
          <v-img :src="card.src" class="white--text align-end" height="200px">
            <v-card-title class="text" v-text="card.title"></v-card-title>
          </v-img>
          <v-btn
            to="/descriptionCamp"
            x-small
            color="secondary"
            dark
            :style="{ left: '50%', transform: 'translateX(-50%)' }"
          >
            See Details
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Camping",
        src:
          "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        title: "Hiking",
        src:
          "https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        title: "Quad Tours",
        src:
          "https://images.unsplash.com/photo-1539775533304-4257b19a2ad6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        title: "Kayaking",
        src:
          "https://images.unsplash.com/photo-1583507370619-8d48649ebb59?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
      },
      {
        title: "PaintBall",
        src:
          "https://images.unsplash.com/photo-1588432815128-363254491e4e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      },
      {
        title: "Guest Houses",
        src:
          "https://images.unsplash.com/photo-1585816803827-921d9a75467b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      }
    ]
  })
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap");
.text {
  font-family: "Gloria Hallelujah", cursive;
}
</style>
