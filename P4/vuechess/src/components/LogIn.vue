<template>
  <form class="log-in-form" @submit.prevent="logIn">
    <h1>Mychess Log In</h1>
    <div class="input-box">
      <input type="text" id="username" placeholder="username" v-model="username" required />
    </div>
    <div class="input-box">
      <input type="password" id="password" placeholder="password" v-model="password" requiered />
    </div>
    <button type="submit" class="btn">Log In</button>
  </form>
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
          throw new Error(data.detail || 'Failed to log in.');
        }

        if (data && data.auth_token) {
          store.setToken(data.auth_token);
        } else {
          console.log('Error: Authentication token not found.');
        }
        console.log('username:', username.value);
        console.log('token:', store.token);
      } catch (error) {
        console.error('Log in error: ', error.message);
        alert(error.message);
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

.wrapper {
  width: 450px;
  background: transparent;
  justify-content: center;
  backdrop-filter: blur(30px);
  padding: 30px 40px;
  border: 4px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .7);
  text-align: center;
}

.wrapper .log-in-form h1 {
  font-weight: bolder;
}

.wrapper .log-in-form .input-boxes {
  text-align: left;
}

.wrapper .log-in-form .input-box {
  width: 100%;
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .4);
  border-radius: 40px;
  padding: 20px 45px 20px 20px;
  font-size: 15px;
  color: whitesmoke;
}

.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.wrapper .log-in-form .btn {
  width: 50%;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.wrapper .log-in-form .btn:hover {
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .4);
}

.wrapper .log-in-form .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}

</style>
