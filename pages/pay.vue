<template>
  <div>
    <v-btn @click="doPurchase">PURCHASE</v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    stripeHandler: {},
    price: 10000,
  }),
  mounted() {
    this.stripeHandler = StripeCheckout.configure({
      key:
        "pk_test_51I7JK2JGJbW9PNmvQWMzVhyhW7ocVnU1NpmDpMo8JXqjKsPCScxCuVYbLEJh55koKUwpyzvjPmeXzxQnxjVstut300o1TN4Ssj",
      locale: "en",
      token: function (token) {
        console.log({ token });
      },
    });
  },
  methods: {
    doPurchase() {
      this.stripeHandler.open({
        amount: this.price,
      });
    },
  },
};
</script>