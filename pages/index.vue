<template>
  <v-container>
    <div>
      <v-carousel cycle hide-delimiters>
        <v-carousel-item :src="require('../assets/slider4.jpg')">
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
      <!-- <div class="pl-4 pr-4 row"> -->
      <!-- <div class="col-md-6 col-sm-6 col-xs-12">
          <v-card>
            <v-img
              :src="require('../assets/slider2.jpg')"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <h1 class="text-center font-size">RESERVE</h1>
              <div class="text-center">
                <v-btn href="/services" class="white--text " outlined
                  >RESERVE NOW</v-btn
                >
              </div>
            </v-img>
          </v-card>
        </div> -->
      <!-- <div class="col-md-6 col-sm-6 col-xs-12">
          <v-card>
            <v-img
              :src="require('../assets/slider3.jpg')"
              class="white--text align-center"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <h1 class="text-center font-size">CONTACT US</h1>
              <div class="text-center">
                <v-btn href="/messages" class="white--text" outlined
                  >SEND NOW</v-btn
                >
              </div>
            </v-img>
          </v-card>
        </div> -->
      <!-- </div> -->
      <activities />
    </div>
  </v-container>
</template>

<script>
// import services from "@/components/services";
import activities from "@/components/activities.vue";
export default {
  components: { activities },
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
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
