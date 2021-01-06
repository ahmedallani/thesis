<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card height="200px" class="scroll">
          <v-list id="messages" dense v-for="(msg, i) in messages" :key="i">
            {{ msg.message }}
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
import { mapState, mapActions } from "vuex";

export default {
  mixins: [validationMixin],

  validations: {
    message: { required }
  },

  data: () => ({
    message: "",
    messages: []
  }),
  created() {
    this.initialize();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async initialize() {
      let msg;
      console.log("user",this.user)
      if (this.user.type === "admin") {
        console.log("admin")
        msg = await this.$axios.$get("/api/chat?to=5ff4cbf31e929e151c93c543");
      } else {
        console.log("normal")
        msg = await this.$axios.$get("/api/chat");
      }
      this.messages = msg;
    },
    async submit() {
      this.$v.$touch();
      let rtn;
      let user = {
        message: this.message
      };
      if (this.user.type === "admin") {
        rtn = await this.$axios.$post(
          "/api/chat?to=5ff4cbf31e929e151c93c543",
          user
        );
      } else {
        rtn = await this.$axios.$post("/api/chat", user);
      }

      console.log({ user, rtn });
      this.initialize();
    }
  }
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
