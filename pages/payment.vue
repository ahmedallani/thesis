<template>
  <div>
    <stripe-elements
      v-if="exist"
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      locale="de"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{ amount / 100 }}</button>
  </div>
</template>

<script>
import { StripeElements } from "vue-stripe-checkout";
export default {
  data: () => ({
    exist: false,
  }),
  components: {
    StripeElements: () => {
      if (process.client) {
        console.log({ client: process.client });
        return StripeElements;
      } else {
        console.log({ client: process.client });
        return { render: (h) => h("div") };
      }
    },
  },
  data: () => ({
    loading: false,
    amount: 1000,
    publishableKey: process.env.PUBLISHABLE_KEY,
    token: null,
    charge: null,
  }),
  mounted() {
    if (process.client) {
      this.exist = true;
    }
  },
  methods: {
    submit() {
      this.$refs.elementsRef.submit();
    },
    tokenCreated(token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description, // optional description that will show up on stripe when looking at payments
      };
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer(charge) {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
    },
  },
};
</script>