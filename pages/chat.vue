<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
          <v-card height="200px" class="scroll"> 
          <v-list id="messages" dense v-for="(msg, i) in messages" :key="i">
            {{ msg.message}}
          </v-list>
          </v-card>
          <v-form>
            <v-text-field
              v-model="message"
              label="Send Your Message Here"
              required
              @input="$v.message.$touch()"
              @blur="$v.message.$touch()"
            ></v-text-field>
            <v-btn color="success" @click="submit">
              Send
              <v-icon dark right> mdi-send </v-icon>
            </v-btn>
          </v-form>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    message: { required }
  },

  data: () => ({
    message: "",
    messages:[]
  }),
  created() {
    this.get();
  },
  methods: {
    async get(){
      const msg = await this.$axios.$get("/api/chat");
      this.messages = msg
    },
    async submit() {
      this.$v.$touch();

      let user = {
        message: this.message
      };

     let rtn = await this.$axios.$post("/api/chat", user);
      console.log({ user, rtn });
    }
  
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
