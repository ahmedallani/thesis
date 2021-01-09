<template>
  <v-container>
    <v-row align-content="stretch">
      <v-col v-for="(activity, index) in activities" :key="index">
        <v-card style="height:100%" class="mx-auto" max-width="400">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="`/api/images/${activity.image}`"
          >
          </v-img>
          <v-card-text class="text--primary">
            <div>{{ activity.description }}</div>
          </v-card-text>

          <v-spacer></v-spacer>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              :to="`/seeDetails/${activity._id}`"
            >
              See More Details</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    activities: []
  }),
  created() {
    this.initialize();
  },
  methods: {
    onFileSelected(file) {
      this.selectedFile = file;
    },
    async initialize() {
      const activities = await this.$axios.$get("/api/activity");
      this.activities = activities;
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap");
.text {
  font-family: "Gloria Hallelujah", cursive;
}
</style>
