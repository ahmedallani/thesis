<template>
  <v-container>
    <div>
      <v-carousel cycle hide-delimiters>
        <v-carousel-item :src="require('../assets/slider10.jpg')">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
              <strong>THE ESCAPER</strong>
            </div>
            <br />
          </v-row>
        </v-carousel-item>
        <v-carousel-item :src="require('../assets/slider5.jpg')">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
              <strong>THE ESCAPER</strong>
            </div>
            <br />
          </v-row>
        </v-carousel-item>
        <v-carousel-item :src="require('../assets/slider6.jpg')">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
              <strong>THE ESCAPER</strong>
            </div>
            <br />
          </v-row>
        </v-carousel-item>
        <v-carousel-item :src="require('../assets/slider1.jpg')">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
              <strong>THE ESCAPER</strong>
            </div>
            <br />
          </v-row>
        </v-carousel-item>
      </v-carousel>
      <div class="back">
        <services />
      </div>
    </div>
  </v-container>
</template>

<script>
import services from "@/components/services";
// import activities from "@/components/activities.vue";
export default {
  components: { services },
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      activeBtn: 1,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap");
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
strong {
  font-family: "Hachi Maru Pop", cursive;
  font-size: 70px;
}
/* .back {
  
} */
</style>
