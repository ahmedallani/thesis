var { User } = require("../models/users");

module.exports = {
    read: (callbacks) => {
        User.find().exec(callbacks);
    },
  };
  