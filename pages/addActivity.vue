<template>
  <v-card class="pa-6">
    <v-card-title>Add New Activity</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="description"
        label="Description"
        required
      ></v-text-field>
      <v-text-field
      v-model="price" 
      type="number" label="Price" min="1" step="any">
      </v-text-field>
      <input type="file" @change="onFileSelected" multiple label="image" />

      <v-btn color="success" class="mr-4" @click="validate">
        Add
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    selectedFile: null,
    valid: true,
    description: "",
    price : "",
  }),

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async validate() {
      const fb = new FormData();

      fb.append("image", this.selectedFile, this.selectedFile.name);

      fb.append("description", this.description);
      fb.append("price", this.price);

      axios
        .post("/api/activity", fb, {
          onUploadProgress: uploadEvent => {
            console.log(
              "upload Progress" +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
