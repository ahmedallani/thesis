<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card height="200px" class="scroll">
          <v-list id="messages" dense v-for="(msg, i) in messages" :key="i">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ msg.from }}</v-list-item-title>
                  <v-list-item-subtitle>{{ msg.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
        </v-card>
        <v-form>
          <v-select
            label="Send to"
            v-model="to"
            :items="users"
            item-value="_id"
            item-text="username"
            @change="getMessages"
          ></v-select>
          <v-text-field
            v-model="message"
            label="Send Your Message Here"
            required
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
    message: { required },
  },

  data: () => ({
    message: "",
    messages: [],
    users: [],
    to: "",
  }),
  created() {
    this.initialize();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async initialize() {
      const users = await this.$axios.$get("/api/users");
      this.users = users;
      await this.getMessages()
    },
    async submit() {
      let rtn;
      let chat = {
        message: this.message,
        to: this.to,
      };
      rtn = await this.$axios.$post("/api/chats", chat);
      this.getMessages();
    },
    async getMessages(){
      const messages = await this.$axios.$get(`/api/chats?user2=${this.to}`);
      this.messages = messages;
    }
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: auto;
}
</style>
