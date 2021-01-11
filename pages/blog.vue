<template>
  <div>
    <div class="header">
      <h2>THE ESCAPER'S BLOG</h2>
    </div>

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          New Blog
        </v-btn>
      </template>
      <v-card>
        <span class="headline">{{ formTitle }}</span>
        <p>{{ $moment() }}</p>
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
      <div v-for="(blog, index) in blogs" :key="index" class="row">
        <div class="leftcolumn">
          <div class="card">
            <h1>{{ blog.title }}</h1>

            <div class="div">
              <v-img class="img" :src="`/api/images/${blog.image}`"> </v-img>
            </div>

            <div class="div">
              <p>{{ blog.body }}</p>
            </div>
            <v-btn color="warning" text @click="editItem(blog)">
              edit
            </v-btn>

            <v-btn color="danger" text @click="deleteItem(blog)">
              delete
            </v-btn>
          </div>
        </div>
      </div>
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
    date: new Date().toLocaleString(),
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
      this.editedIndex = this.blogs.indexOf(blog);
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");
body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}

/* Header/Blog Title */
.header {
  padding: 30px;
  font-size: 40px;
  text-align: center;
  background: black;
}

/* Create two unequal columns that floats next to each other */
/* Left column */
.leftcolumn {
  float: left;
  width: 75%;
}

/* Right column */
.rightcolumn {
  float: left;
  width: 25%;
  padding-left: 20px;
}

/* Fake image */

/* Add a card effect for articles */
.card {
  background-color: black;
  padding: 20px;
  margin-top: 20px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Footer */

/* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .leftcolumn,
  .rightcolumn {
    width: 100%;
    padding: 0;
  }
}
h2 {
  font-family: "Anton", sans-serif;
}
.img {
  height: 300px;
  width: 150%;
}
.div {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}
</style>
