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
      <form class="log-in-form" @submit.prevent="logIn">
        <h1>MyChess Log In</h1>
        <div class="input-boxes">
          <div class="input-box">
            <input type="text" placeholder="Email Address" id="username" data-cy="username" v-model="username" required>
          </div>
          <div class="input-box">
            <input type="password" placeholder="Password" id="password" data-cy="password" v-model="password" required>
          </div>
        </div>
        <button type="submit" class="btn" data-cy="login-button">Log In</button>
        <div v-if="errorMessage" class="error-message" data-cy="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useTokenStore } from '@/stores/token';
import router from '../router';

export default {
  name: 'LogIn',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref(''); 

    const logIn = async () => {
      const formData = {
        password: password.value,
        username: username.value,
      };
      const store = useTokenStore();
      const serverUrl = import.meta.env.VITE_DJANGOURL;
      try {
        const response = await fetch(window.location.protocol + "//" + serverUrl + 'api/v1/mytokenlogin/',
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
          errorMessage.value = 'Error: Invalid username or password';
          return;
        }

        if (data && data.auth_token) {
          store.setToken(data.auth_token);
          store.setUserID(data.user_id);
          router.push('/creategame');
        } else {
          errorMessage.value = 'Error: Authentication token not found'; 
        }
      } catch (error) {
        errorMessage.value = `Error: ${error.message}`;
      }
    };

    return {
      username,
      password,
      errorMessage,
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

.content-right .log-in-form {
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

.log-in-form h1 {
  font-weight: bolder;
  font-size: 38px;
}

.content-right .log-in-form .input-box {
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

.log-in-form .btn {
  width: 125px;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.log-in-form .btn:hover {
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .8);
}

.log-in-form .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(4px);
}
</style>
