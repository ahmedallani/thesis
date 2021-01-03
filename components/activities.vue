<template>
  <div>
    <div v-for="(activity, index) in activities" :key="index">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`/api/images/${activity.image}`"
        >
          <v-card-title>{{ activity.title }}</v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>{{ activity.description }}</div>
        </v-card-text>
        <v-card-text class="text--primary">
          <div>Price : {{ activity.price }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="editItem(activity)">
            Edit
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="deleteItem(activity)">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      activities: [],
      editedIndex: -1,
    editedItem: {
      image: "",
      description: "",
      description: 0,
    }
    };
  },
  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const activities = await this.$axios.$get("/api/activity");
      console.log(activities);
      this.activities = activities;
    },
    async deleteItem(activity) {
      await this.$axios.$delete(`/api/activity/${activity._id}`);
      this.initialize();
    },
    async editItem(activity) {
      await this.$axios.$put(`/api/activity/${activity._id}`);
       this.editedIndex = this.activities.indexOf(activity);
      this.editedItem = Object.assign({}, activity);

      this.initialize();
    }
  }

  // async beforeMount() {
  //   let { data } = await axios.get("/api/activity");
  //   this.activities = data;
  // }
};
</script>
