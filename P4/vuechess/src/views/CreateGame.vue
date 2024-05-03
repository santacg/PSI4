<template>
  <div class="container">
    <div class="wrapper">
      <form class="create-game-box" @submit.prevent="createGame">
        <h1>Create a chess game!</h1>
        <select name="game-selection">
          <option hidden>Select a game type</option>
          <option value="random-game">Join any game</option>
          <option value="id-game">Join specific game</option>
        </select>
        <button type="submit" class="btn">Join!</button>
        <div class="game-id" style="display: none; ">
          <label class="game-id-label" for="game-id">Enter your game ID: </label>
          <input type="number">
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { useTokenStore } from '@/stores/token';

/* Despliegue del ID al pulsar la opción "Join a friend's game" */
/* PROBLEMA: No se despliega al estar logueado*/
document.addEventListener('DOMContentLoaded', function () {
  const selection = document.querySelector('select[name="game-selection"]');
  const gameIdSection = document.querySelector('.game-id');

  gameIdSection.style.display = 'none';

  selection.addEventListener('change', function () {
    if (selection.value === 'id-game') {
      gameIdSection.style.display = 'block';
    } else {
      gameIdSection.style.display = 'none';
    }
  });
});

export default {
  name: 'CreateGame',
  setup() {
    const createGame = async () => {
      const store = useTokenStore();
      const storeGame = useGameStore();
      const baseUrl = 'http://localhost:8000/api/v1';
      try {
        const response = await fetch(baseUrl + '/games/', {
          method: 'POST',
          headers: {
            'Authorization': 'token ' + store.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: store.user_id }),
        });
        const data = await response.json();

        if (response.status !== 201 && response.status !== 200) {
          if (data.detail) {
            throw new Error(data.detail);
          }
          else {
            throw new Error('Failed to create a game or join an existing one');
          }
        }

        if (response.status === 201) {
          storeGame.setGameID = data.id;
          alert('Game created with ID: ' + data.id);
        }
        else {
          alert('Joined to existing game')
        }
      } catch (error) {
        alert(error);
      }
    };

    return { createGame };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img5.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  place-content: center;
  align-items: center;
}

.wrapper {
  width: 1000px;
  height: 350px;
  position: absolute;
  background: transparent;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .9);
  border-radius: 20px;
  padding: 30px 40px;
  place-content: center;
  text-align: center;
}

.wrapper .create-game-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
}

.wrapper .create-game-box h1 {
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  font-size: 38px;
}

.wrapper .create-game-box select {
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  background: transparent;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .4);
  border-radius: 40px;
  padding: 20px 20px;
  font-size: 14px;
  cursor: pointer;
  color: whitesmoke;
}

.wrapper .create-game-box button {
  padding: 10px;
  width: 100%;
  background-color: white;
  color: black;
  cursor: pointer;
  border: none;
  border-radius: 40px;
  font-weight: bolder;
  transition: box-shadow 0.3s ease, transbox 0.1s ease;
}

.wrapper .create-game-box button:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.wrapper .create-game-box.button:active {
  transform: translateY(4px);
}

.wrapper .game-id {
  display: none;
  margin-top: 20px;
}

.wrapper .game-id .game-id-label {
  color: white;
}

.wrapper .game-id input {
  padding: 5px;
  width: 15%;
  border-radius: 5px;
}
</style>
