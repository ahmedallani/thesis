<template>
  <div>
    <div id="map-wrap" style="height: 80vh">
      <no-ssr>
        <l-map :zoom="7" :center="[34.46427430192848, 9.551030828063602]">
          <l-tile-layer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <l-marker
            v-for="(place, index) in places"
            :lat-lng="getLatLng(place)"
            :key="index"
          >
            <l-tooltip :options="{ permanent: true, interactive: true }">{{
              place.title
            }}</l-tooltip>
          </l-marker>
        </l-map>
      </no-ssr>
    </div>
    <appointment />
  </div>
</template>
<script>
import appointment from "@/components/appointment";
export default {
  components: { appointment },
  data: () => ({
    places: [],
    customText: ""
  }),
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const places = await this.$axios.$get(
        `/api/place/${this.$route.params.id}`
      );
      this.places = places;
    },
    getLatLng({ lat, lng }) {
      return [lat, lng];
    }
  }
};
</script>
<style scoped>
#customTextInput {
  background-color: white;
}
</style>
