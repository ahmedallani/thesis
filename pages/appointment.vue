<template>
  <form>
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
    <v-text-field
      v-model="place"
      :error-messages="placeErrors"
      label="Place"
      required
      @input="$v.place.$touch()"
      @blur="$v.place.$touch()"
    ></v-text-field>

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

    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>

  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      appointmentDate: { required, maxLength: maxLength(10) },
      place : {required},
      numberOfPeople: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      appointmentDate: '',
      place: '',
     numberOfPeople: 0,
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      numberOfPeopleErrors () {
        const errors = []
        if (!this.$v.numberOfPeople.$dirty) return errors
        !this.$v.numberOfPeople.required && errors.push('Number of People are required')
        return errors
      },
      placeErrors () {
        const errors = []
        if (!this.$v.place.$dirty) return errors
        !this.$v.place.required && errors.push('Place is required')
        return errors
      },
      appointmentDateErrors () {
        const errors = []
        if (!this.$v.appointmentDate.$dirty) return errors
        !this.$v.appointmentDate.maxLength && errors.push('appointmentDate must be at most 10 characters long')
        !this.$v.appointmentDate.required && errors.push('appointmentDate is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
       
      },

    },
  }
</script>