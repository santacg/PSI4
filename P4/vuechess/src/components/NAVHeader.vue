<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li class="nav-item">
        <a><router-link class="logIn" to="/log-in">Home</router-link></a>
      </li>
      <li class="nav-item">
        <a><router-link class="signUp" to="/sign-up">Sign Up</router-link></a>
      </li>
      <li class="nav-item">
        <a><router-link class="logOut" to="/log-out" v-if="store.isAuthenticated">Log Out</router-link></a>
      </li>
      <li class="nav-item">
        <a><router-link class="createGame" to="/creategame" v-if="store.isAuthenticated">Create Game</router-link></a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useTokenStore } from '@/stores/token';
export default {
  name: "NAVHeader",
  setup() {
    const store = useTokenStore();
      return {
        store,
      };
  },
};
</script>

<style scoped>
.navbar {
  padding: 15px 0;
  background-color: rgb(31, 31, 31);
}

.nav-links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  padding: 0px 60px;
}

.nav-links li {
  margin-right: 35px;
}

.nav-links a {
  font-size: 16px;
  color: whitesmoke;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: black;
}
</style>
