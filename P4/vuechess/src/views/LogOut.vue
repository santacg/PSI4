<template>
<<<<<<< HEAD
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

export default {
  name: 'LogOut'
  setup() {
    const logOut = async () => {
      const baseUrl = 'http://localhost:8000/api/v1'
      try {
        const response = await fetch(baseUrl + 'token/logout/',
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Failed log out');
        }

      } catch (error) {
        console.error('Log out error: ', error.message);
        alert(error.message);
      }
    };

    return {
      logOut,
    };
  },
=======
    <div class="container">
        <div class="wrapper">
            <h1>Log Out</h1>
            <p>Are you sure you want to log out?</p>
            <button class="btn1">Yes</button>
            <button class="btn2">No</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import router from '../router';

export default {
    name: 'LogOut',

    setup() {
        const logOut = async () => {
            store.clearToken();

            router.push('/login').catch(err => {
                console.error('Routing error:', err);
            });
        };

        // Podrías necesitar retornar la función de logOut si planeas usarla directamente en la plantilla
        return {
            logOut
        };
    },
>>>>>>> 9e19ea5a995403cabc0e3738eec65d14b6fd3f18
};
</script>

<style scoped>
.container {
<<<<<<< HEAD
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
=======
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img2.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    place-content: center;
    align-items: center;
}

.wrapper {
    width: 400px;
    height: 250px;
    position: absolute;
    background: transparent;
    backdrop-filter: blur(50px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .9);
    border-radius: 20px;
    padding: 30px 40px;
    place-content: center;
    text-align: center;
}

.wrapper h1 {
    font-weight: bold;
    color: rgba(255, 255, 255, .4);
    font-size: 38px;
    margin-bottom: 20px;
}

.wrapper p {
    color: white;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
}

.wrapper .btn2 {
    width: 125px;
    height: 40px;
    background: white;
    border: none;
    outline: none;
    border-radius: 40px;
    font-weight: bolder;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
    margin: 10px;
    cursor: pointer;
}

.wrapper .btn1 {
    width: 125px;
    height: 40px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .4);
    color: white;
    outline: none;
    border-radius: 40px;
    font-weight: bolder;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
    margin: 10px;
    cursor: pointer;
>>>>>>> 9e19ea5a995403cabc0e3738eec65d14b6fd3f18
}
</style>
