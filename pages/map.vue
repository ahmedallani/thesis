<template>
  <div>
    <div>
      <v-text-field
        v-model="customText"
        label="Place Title"
        required
      ></v-text-field>
    </div>
    <div id="map-wrap" style="height: 80vh">
      <no-ssr>
        <l-map
          :zoom="7"
          :center="[34.46427430192848, 9.551030828063602]"
          @click="addMarker"
        >
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <l-marker
            v-for="(place, index) in places"
            :lat-lng="getLatLng(place)"
            :key="index"
            @click="removeMarker(index)"
          >
            <l-tooltip :options="{ permanent: true, interactive: true }">{{
              place.title
            }}</l-tooltip>
          </l-marker>
        </l-map>
      </no-ssr>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    places: [],
    customText: ""
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      // const map = await this.$axios.$get("/api/map");
      // this.places = map;
    },
    getLatLng({ lat, lng }) {
      console.log([lat, lng]);
      return [lat, lng];
    },
    async addMarker(event) {
      let { lat, lng } = event.latlng;
      if (this.customText !== "") {
        let place = {
          service_id: 1,
          lat,
          lng,
          title: this.customText
        };
        console.log(event, event.latlng);
        this.places.push(place);
        await this.$axios.$post("/api/map", place);
      }
    },
    async removeMarker(index) {
      this.places.splice(index, 1);
      await this.$axios.$delete(`/api/map/${this.place._id}`);
    }
  }
};
</script>
<style scoped>
#customTextInput {
  background-color: white;
}
</style>
