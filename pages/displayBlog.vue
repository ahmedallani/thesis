<template>
  <div>
    <div v-for="(blog, index) in blogs" :key="index">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="`/api/images/${blog.image}`"
        >
          <v-card-title>{{ blog.title }}</v-card-title>
        </v-img>
        <v-card-text class="text--primary">
          <div>{{ blog.body }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text>
            like
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" text>
           delete
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
      blogs: []
    };
  },
  methods: {},
  async beforeMount() {
    let { data } = await axios.get("/api/blogs");
    this.blogs = data;
  }
};
</script>
