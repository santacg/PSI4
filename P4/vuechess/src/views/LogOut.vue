<template>
  <div class="container">
    <div class="wrapper">
      <div class="log-out-text">
        <h2>You logged out of MyChess</h2>
        <br>
        <p>You will be redirected to the main page in 5 seconds</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTokenStore } from '@/stores/token';
import { onBeforeMount } from 'vue';
import router from '../router';

export default {
  name: 'LogOut',

  setup() {
    const LogOut = async () => {
      const baseUrl = 'http://localhost:8000/api/v1/';
      const store = useTokenStore();
      try {
        const response = await fetch(baseUrl + 'token/logout/',
          {
            method: 'POST',
            headers: {
              'Authorization': 'token ' + store.token,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });

        if (response.status === 204) {
          store.removeToken();
          setTimeout(() => router.push('/log-in'), 5000);
        } else {
          throw new Error('Failed to log out');
        }
      } catch (error) {
        console.error('Error logging out');
        alert(error.message);
      }
    };
    onBeforeMount(() => {
      LogOut();
    });

    return {
      LogOut,
    };
  }
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
  width: 600px;
  height: 250px;
  background: transparent;
  backdrop-filter: blur(30px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .9);
  border-radius: 20px;
  padding: 30px 40px;
  place-content: center;
  text-align: center;
}

.log-out-text h2 {
  font-weight: bold;
  font-size: 36px;
}

.log-out-text p {
  font-size: 16px;
  color: whitesmoke;
}
</style>
