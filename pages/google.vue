<template>
  <div>
    <a href="/api/auth/google">signin with google</a>

    <v-btn @click="logout">logout</v-btn>
  </div>
  
</template>

<script>
export default {
   methods: {
    async logout() {
      const rtn = await this.$axios.$delete("/api/logout");
     console.log({rtn})
    }
  }
};
</script>

<style></style>
