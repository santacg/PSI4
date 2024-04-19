<template>
  <div class="form">
    <h1>Log In</h1>
    <form @submit.prevent="logIn">
      <input type="username" id="username" v-model="username" required />
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import { setup } from 'mocha'; //?

export default {
  name: 'LogIn',
  setup() {
    const username = ref('');
    const password = ref('');

    const logIn = async () => {
      const formData = {
        username: username.value,
        password: password.value,
      };
      const store = useTokenStore();
      const baseUrl = 'http://localhost:8000/api/v1/'; //mala práctica: debe hacerse una variable de entorno
      try {
        const response = await fetch(baseUrl + 'token/login/',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        const data = await response.json();

        if (!response.ok) {
          //manejo de errores
        }

        if (data && data.auth_token) {
          store.setToken(data.auth_token);
        } else {
          console.log('Error: Authentication token not found.');
        }
        console.log('username:', username.value);
        console.log('token:', store.token);
      } catch (error) {
        console.error(error);
        //manejo de errores
      }
    };

    return {
      username,
      password,
      logIn,
    };
  },
};
</script>
