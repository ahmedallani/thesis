<template>
  <div>
    <div>
      <v-text-field
        v-model="customText"
        label="Place Title"
        required
      ></v-text-field
      ><br /><br />
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
    customText: "",
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const places = await this.$axios.$get("/api/place");
      this.places = places;
    },
    getLatLng({ lat, lng }) {

      return [lat, lng];
    },
    async addMarker(event) {
      let { lat, lng } = event.latlng;
      if (this.customText !== "") {
        let place = {
          activity:"id",
          lat,
          lng,
          title: this.customText,
        };
        await this.$axios.$post("/api/place", place);
        await this.initialize();
      }
    },
    async removeMarker(index) {
      let place = this.places[index];
      await this.$axios.$delete(`/api/place/${place._id}`);
      await this.initialize();
    },
  },
};
</script>
<style scoped>
#customTextInput {
  background-color: white;
}
</style>
