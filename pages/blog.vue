<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          New Blog
        </v-btn>
      </template>
      <v-card>
        <span class="headline">{{ formTitle }}</span>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  truncate-length="15"
                  @change="onFileSelected"
                ></v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  required
                  label="title"
                  v-model="editedItem.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  required
                  label="body"
                  v-model="editedItem.body"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="validate"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-container>
      <v-row align-content="stretch">
        <v-col v-for="(blog, index) in blogs" :key="index">
          <v-card style="height:100%" class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="`/api/images/${blog.image}`"
            >
            </v-img>
            <v-card-text class="text--primary">
              <div>{{ blog.body }}</div>
              <div>{{ blog.title }}</div>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn color="warning" text @click="editItem(blog)">
                edit
              </v-btn>

              <v-btn color="danger" text @click="deleteItem(blog)">
                delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    blogs: [],
    selectedFile: null,
    valid: true,
    editedIndex: -1,
    editedItem: {
      image: "",
      title: "",
      body: ""
    },
    defaultItem: {
      image: "",
      title: "",
      body: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.initialize();
  },

  methods: {
    onFileSelected(file) {
      this.selectedFile = file;
    },
    async initialize() {
      const blogs = await this.$axios.$get("/api/blogs");
      this.blogs = blogs;
      console.log(blogs);
    },

    async validate() {
      const fb = new FormData();

      fb.append("image", this.selectedFile, this.selectedFile.name);

      fb.append("body", this.editedItem.body);
      fb.append("title", this.editedItem.title);

      if (this.editedIndex > -1) {
        Object.assign(this.blogs[this.editedIndex], this.editedItem);
        await this.$axios.$put(
          `/api/blogs/${this.editedItem._id}`,
          this.editedItem
        );
        await this.initialize();
      } else {
        axios
          .post("/api/blogs", fb, {
            onUploadProgress: uploadEvent => {
              console.log(
                "upload Progress" +
                  Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                  "%"
              );
            }
          })
          .then(res => {
            this.initialize();
          })
          .then(() => this.close());
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(blog) {
      console.log(blog);
      this.editedIndex = this.activities.indexOf(blog);
      this.editedItem = Object.assign({}, blog);
      this.dialog = true;
    },
    async deleteItem(blog) {
      console.log(blog);
      await this.$axios.$delete(`/api/blogs/${blog._id}`);
      this.initialize();
      console.log(blog);
      this.editedIndex = this.blogs.indexOf(blog);
      this.editedItem = Object.assign({}, blog);
      this.dialogDelete = true;
    }
  }
};
</script>
