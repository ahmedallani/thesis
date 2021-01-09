<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1 class="text">Reserve Now</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-text-field
          v-model="appointmentDate"
          :error-messages="appointmentDateErrors"
          :counter="10"
          label="Appointment Date"
          type="date"
          required
          @input="$v.appointmentDate.$touch()"
          @blur="$v.appointmentDate.$touch()"
        ></v-text-field>
        <v-select
          v-model="place"
          :items="states"
          menu-props="auto"
          hide-details
          :error-messages="placeErrors"
          label="Place"
          required
          @input="$v.place.$touch()"
          @blur="$v.place.$touch()"
        ></v-select>

        <v-text-field
          v-model="numberOfPeople"
          :error-messages="numberOfPeopleErrors"
          label="Number Of People"
          type="number"
          required
          @input="$v.numberOfPeople.$touch()"
          @blur="$v.numberOfPeople.$touch()"
        ></v-text-field>

        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit">
          submit
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    appointmentDate: { required, maxLength: maxLength(10) },
    place: { required },
    numberOfPeople: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    appointmentDate: "",
    place: "",
    numberOfPeople: "",
    checkbox: false,
    items: [
      { text: "State 1" },
      { text: "State 2" },
      { text: "State 3" },
      { text: "State 4" },
      { text: "State 5" },
      { text: "State 6" },
      { text: "State 7" }
    ],
    states: [
      "Bni Mtir C",
      "Cape Angela C",
      "Zaghouan C",
      "Ain Drahem C",
      "Oued Zitoun C",
      "Hammam El Ghezaz C",
      "Zriba Olia C",
      "Douz C",
      "Kef Abed C",
      "Cape Serrat C",
      "Hawariya H",
      "Qurbus H ",
      "Tabarka H",
      "Djerba H",
      "Testour H",
      "Ichkeul Lakes H",
      "Boukornine H",
      "Beni Khiar H",
      "Barrage El Masri H",
      "Nahli H",
      "Djerba Q",
      "Douz Q",
      "Tataouine Q",
      "Tozeur Q",
      "Sousse Q",
      "Midoun Q",
      "Hammamet Q",
      "Zarzis Q",
      "Sidi Bou Said K",
      "Kantaoui K",
      "Yasmine Hammamet K",
      "Tamazrat G",
      "Tozeur G",
      "Zarzis G",
      "Zaghouan G",
      "Medinine G",
      "Sousse G",
      "Mahdia G",
      "Monastir G",
      "Nahli P",
      "Hammamet P",
      "Bizerte P",
      "Monastir P"
    ]
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    numberOfPeopleErrors() {
      const errors = [];
      if (!this.$v.numberOfPeople.$dirty) return errors;
      !this.$v.numberOfPeople.required &&
        errors.push("Number of People are required");
      return errors;
    },
    placeErrors() {
      const errors = [];
      if (!this.$v.place.$dirty) return errors;
      !this.$v.place.required && errors.push("Place is required");
      return errors;
    },
    appointmentDateErrors() {
      const errors = [];
      if (!this.$v.appointmentDate.$dirty) return errors;
      !this.$v.appointmentDate.maxLength &&
        errors.push("appointmentDate must be at most 10 characters long");
      !this.$v.appointmentDate.required &&
        errors.push("appointmentDate is required.");
      return errors;
    }
  },

  methods: {
    async submit() {
      this.$v.$touch();

      let user = {
        appointmentDate: this.appointmentDate,
        place: this.place,
        numberOfPeople: this.numberOfPeople
      };

      let rtn = await this.$axios.$post("/api/appointment", user);
      console.log({ user, rtn });
    }
  }
};
</script>
<style scoped>
.text {
  text-align: center;
}
</style>
