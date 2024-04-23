<template>
  <body>
    <div class="wrapper">
      <form class="log-in-form" @submit.prevent="logIn">
        <h1>Log In</h1>
        <div class="input-box">
          <input type="username" id="username" placeholder="username" v-model="username" required />
        </div>
        <div class="input-box">
          <input type="password" id="password" placeholder="password" v-model="password" requiered />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  </body>
</template>

<script>
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';

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

<style scoped>
body {
}

.wrapper {
  position: absolute;
  display: flex;
  min-width: 550px;
  background: url(../assets/img2.png);
  min-height: 993px;
  justify-content: center;
}

.wrapper .log-in-form { 
  place-content: center;
}

.wrapper .log-in-form .input-box {
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, .4);
  border-radius: 40px;
  padding: 20px 45px 20px 20px;
  font-size: 15px;
  color: whitesmoke;
}
</style>
