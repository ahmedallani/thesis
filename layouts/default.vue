<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>Logout</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      {{ user }}
      <v-container class="pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "THE ESCAPER"
    };
  },
  created() {
    this.initialize();
  },
  computed: {
    ...mapState(["user"]),
    items() {
      console.log({ user: this.user });
      if (this.user.username === false) {
        return [
          {
            icon: "mdi-apps",
            title: "Home",
            to: "/"
          },
          {
            icon: "mdi mdi-account-circle",
            title: "Login",
            to: "/login"
          },
          {
            icon: "mdi mdi-account-check",
            title: "Signup",
            to: "/register"
          },
          {
            icon: "mdi mdi-clipboard-text",
            title: "Blog",
            to: "/blog"
          },
          {
            icon: "mdi mdi-clipboard-text",
            title: "Add Services",
            to: "/activities"
          }
        ];
      } else {
        return [
          {
            icon: "mdi-apps",
            title: "Home",
            to: "/"
          },
          {
            icon: "mdi mdi-account-circle",
            title: "Logout",
            to: "/logout"
          },

          {
            icon: "mdi mdi-clipboard-text",
            title: "Blog",
            to: "/blog"
          },
          {
            icon: "mdi mdi-human",
            title: "Add New Activity",
            to: "/addActivity"
          }
        ];
      }
    }
  },
  methods: {
    ...mapActions(["changeUser"]),
    async initialize() {
      const user = await this.$axios.$get("/api/user");
      if (user.username) {
        this.changeUser(user);
      } else {
        this.changeUser({ username: false });
      }
    },
    async logout() {
      console.log("logout");
      await this.$axios.$delete(`/api/logout`);
      await this.initialize();
      this.$router.push("/login");
    }
  }
};
</script>
