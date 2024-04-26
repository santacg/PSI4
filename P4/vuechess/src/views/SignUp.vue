<template>
  <div class="container">
    <div class="wrapper">
      <form class="sign-up-form" @submit.prevent="signUp">
        <h1>Mychess Sign Up</h1>
        <div class="input-boxes">
          <div class="input-box">
            <input type="text" placeholder="Email Address" id="emailAddress" v-model="emailAddress" required>
          </div>
          <div class="input-box">
            <input type="password" placeholder="Password" id="password" v-model="password" required>
          </div>
          <div class="input-box">
            <input type="password" placeholder="Confirm Password" id="confirmPassword" v-model="confirmPassword" required>
          </div>
        </div>
        <button type="submit" class="btn">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import router from '../router';

export default {
  name: 'SignUp',
  setup() {
    const emailAddress = ref('');
    const password = ref('');
    const confirmPassword = ref('');

    const signUp = async () => {
      if (password.value != confirmPassword.value) {
        alert('Passwords do not match');
        return;
      }

      const formData = {
        email: emailAddress.value,
        username: emailAddress.value,
        password: password.value,
      };

      const baseUrl = 'http://localhost:8000/api/v1/'
      try {
        const response = await fetch(baseUrl + 'users/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.username) {
            throw new Error(data.username);
          }
          else {
            throw new Error('Sign up unsuccesfull');
          }
        }

        alert('Sign up succesfull! redirecting to log in');
        router.push('/log-in');
      } catch (error) {
        alert(error);
      }
    };

    return {
      emailAddress,
      password,
      confirmPassword,
      signUp,
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
  place-content: center;
  align-items: center;
}

.wrapper {
  width: 425px;
  height: 450px;
  background: transparent;
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .9);
  border-radius: 20px;
  padding: 30px 40px;
  place-content: center;
  text-align: center;
}

.wrapper .sign-up-form h1 {
  font-weight: bold;
  font-size: 38px;
}

.wrapper .sign-up-form .input-box {
  height: 50px;
  margin: 30px 0;
}

.input-box input {
  width: 300px;
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

.wrapper .sign-up-form .btn {
  width: 125px;
  height: 40px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.wrapper .sign-up-form .btn:hover {
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .8);
}

.wrapper .sign-up-form .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(4px);
}
</style>
