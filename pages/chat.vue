<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10">
        <v-card max-width="500" height="400px" class="scroll">
          <v-toolbar dark color="primary darken-1">
            <v-toolbar-title class="name">Chat</v-toolbar-title>
          </v-toolbar>
          <v-list id="messages" dense v-for="(msg, i) in messages" :key="i">
            <div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="name">{{
                    msg.from.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{ msg.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
        <p v-if="feedback !== ''">
          <em>{{ feedback }} is typing a message...</em>
        </p>
        <div class="test">
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
            <v-btn color="blue" @click="submit">
              Send
              <v-icon dark right> mdi-send </v-icon>
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import io from "socket.io-client";

export default {
  mixins: [validationMixin],

  validations: {
    message: { required }
  },

  data: () => ({
    messages: [],
    users: [],
    message: "",
    to: "",
    socket: "",
    feedback: ""
  }),
  async mounted() {
    this.socket = io.connect();
    this.socket.on("connect", async () => {
      console.log("Connection");
      console.log("socket", this.socket.id);
      let user = await this.$axios.$put(`/api/users`, {
        socket: this.socket.id
      });
    });
    this.socket.on("update", async data => {
      console.log({ data });
      this.getMessages();
    });
    this.socket.on("typing", data => {
      this.feedback = data;
    });
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    async initialize() {
      const users = await this.$axios.$get("/api/users");
      this.users = users;
      await this.getMessages();
    },
    async submit() {
      let rtn;
      let chatObject = {
        from: this.user._id,
        message: this.message,
        to: this.to
      };
      rtn = await this.$axios.$post("/api/chats", chatObject);
      this.getMessages();
      let chat = this.socket.emit("update", {
        from: this.user._id,
        to: this.to
      });
      this.message = "";
    },
    async getMessages() {
      if (this.to) {
        const messages = await this.$axios.$get(`/api/chats?user2=${this.to}`);
        console.log({ messages });
        this.messages = messages;
      }
    },
    typing() {
      this.socket.emit("typing", this.to);
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");

.scroll {
  left: 250px;
  overflow-y: auto;
}

.name {
  font-family: "Anton", sans-serif;
}
.test {
  position: relative;
  width: 340px;
  left: 250px;
}
</style>
