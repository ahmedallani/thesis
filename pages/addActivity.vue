<template>
  <v-card class="pa-6">
    <v-card-title>Add Activity</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="title" label="Title"></v-text-field>

      <v-text-field v-model="body" label="Description" required></v-text-field>
      <input type="file" @change="onFileSelected" multiple label="image"/>
      <v-btn color="success" class="mr-4" @click="validate">
        Add to Activities
      </v-btn>

      
    </v-form>
  </v-card>
</template>


<script>
export default {
  
}
</script>