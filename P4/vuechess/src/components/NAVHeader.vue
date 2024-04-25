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
        <a><router-link class="logOut" to="/sign-up">Log Out</router-link></a>
      </li>
    </ul>
  </nav>
</template>

<script>
</script>

<style scoped>
.navbar {
  padding: 15px 0;
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
