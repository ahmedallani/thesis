
export const strict = false;

export const state = () => ({
  user : { username: false }
});
export const getters = {
  // count2x: state => {
  //   return 2 * state.count;
  // }
};

export const mutations = {
  changeUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  changeUser({ commit }, user) {
    commit("changeUser", user)
  }
}