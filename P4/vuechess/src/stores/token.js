import { defineStore } from 'pinia'

export const useTokenStore = defineStore("tokens",
  {
    // id: "token",
    state: () => ({
      user_id: null,
      token: null,
      isAuthenticated: false,
    }),
    actions: {
      setUserID(user_id) {
        this.user_id = user_id;
      },
      setToken(token) {
        this.token = token;
        this.isAuthenticated = true;
      },
      removeToken() {
        this.token = null;
        this.isAuthenticated = false;
      },
    },
  })
