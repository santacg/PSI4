<template>
  <header>
  </header>
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
        alert('Password do not match');
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
          throw new Error(data.detail || 'Failed to sing up.');
        }

        console.log('SignUp request successful, redirecting to logIn');
        router.push('/log-in');
      } catch (error) {
        console.error('Sign up error: ', error.message);
        alert(error.message);
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
.wrapper {
  width: 450px;
  background: transparent;
  border: 4px;
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .7);
  border-radius: 20px;
  padding: 30px 40px;
  display: flex;
  place-content: center;
  text-align: center;
}

.wrapper .sign-up-form h1 {
  font-weight: bolder;
}

.wrapper .sign-up-form .input-boxes {
  text-align: left;
}

.wrapper .sign-up-form .input-box {
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

.wrapper .sign-up-form .btn {
  width: 50%;
  height: 45px;
  background: white;
  border: none;
  outline: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.wrapper .sign-up-form .btn:hover {
  border-color: black;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, .4);
}

.wrapper .sign-up-form .btn:active {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  transform: translateY(2px);
}
</style>
