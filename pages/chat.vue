<template>
  <v-card>
    <form>
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <v-text-field
            v-model="message"
            label="Send Your Message Here"
            required
            @input="$v.message.$touch()"
            @blur="$v.message.$touch()"
          ></v-text-field>
          <v-btn class="mr-4" @click="submit">
            Send
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-card>
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
    message: ""
  }),

  methods: {
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
