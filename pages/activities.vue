<template>
  <v-card class="mx-auto" max-width="400">
    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-img :src="card.src" class="white--text align-end" height="200px">
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-text class="text--primary" v-text="card.text">
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>
                More Details
              </v-btn>

              <v-btn to="/map" color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    cards: [
      {
        title: "Camping",
        src:
          "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        flex: 12,
        text: "Discover top places availables for you"
      },
      {
        title: "Hiking Trails",
        src:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        flex: 12,
        text: "Hike more worry less"
      },
      {
        title: "Quad Tours",
        src:
          "https://images.unsplash.com/photo-1489731254138-5401fb834d9c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80",
        flex: 12,
        text: "Ride a little more , stress a little less"
      },
      {
        title: "Kayaking",
        src:
          "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80",
        flex: 12,
        text: "Drown in the experience"
      },
      {
        title: "Paint Ball",
        src:
          "https://images.unsplash.com/photo-1522515218385-a5488252fa90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        flex: 12,
        text: "Shoot all you want"
      },
      {
        title: "Guest Houses",
        src:
          "https://images.unsplash.com/photo-1565971988144-c8a2adc6eb1d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        flex: 12,
        text: "Our world is your playground"
      }
    ]
  })
};
</script>
