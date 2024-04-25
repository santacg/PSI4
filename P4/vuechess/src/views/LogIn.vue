<template>
  <header>
  </header>
  <div class="container">
    <div class="content-left">
      <h3>Welcome to MyChess
        <br><span>Yet another chess website</span>
      </h3>
      <p>Lorem ipsum dolor sit amet,
        qui minim labore adipisicing minim
        sint cillum sint consectetur
        cupidatat.
      </p>
    </div>
    <div class="content-right">
      <form class="sign-up-form" @submit.prevent="logIn">
        <h1>MyChess Log In</h1>
        <div class="input-boxes">
          <div class="input-box">
            <input type="text" placeholder="Email Address" id="username" v-model="username" required>
          </div>
          <div class="input-box">
            <input type="password" placeholder="Password" id="password" v-model="password" required>
          </div>
        </div>
        <button type="submit" class="btn">Log In</button>
      </form>
    </div>
  </div>
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
        password: password.value,
        username: username.value,
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
.container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../assets/im3.jpeg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.container .content-left {
  width: 50%;
  padding: 120px;
  color: whitesmoke;
  place-content: center;
}

.content-left h3 {
  font-weight: bold;
  font-size: 38px;
}

.content-left span {
  font-size: 28px;
}

.content-left p {
  font-size: 22px;
  margin: 20px 0;
}

.container .content-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}

.content-right .sign-up-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  backdrop-filter: blur(25px);
  box-shadow: 0 0 20px rgba(0, 0, 0, .85);
}

.sign-up-form h1 {
  font-weight: bolder;
  font-size: 38px;
}

.content-right .sign-up-form .input-box {
  margin: 30px 0;
}

.input-box input {
  width: 285px;
  height: 100%;
  background: transparent;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .4);
  border-radius: 40px;
  padding: 20px 20px;
  font-size: 14px;
  color: whitesmoke;
}

.input-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.sign-up-form .btn {
  width: 125px;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.sign-up-form .btn:hover {
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .8);
}

.sign-up-form .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(4px);
}
</style>
