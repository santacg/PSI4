<template>
  <div class="container">
    <div class="wrapper">
      <form class="create-game-box" @submit.prevent="createGame">
        <h1>Create a chess game!</h1>
        <select name="game-selection" v-model="selectedGameType" id="selectGame" data-cy="selectGame">
          <option hidden>Select a game type</option>
          <option value="game_join_any">Join any game</option>
          <option value="Join specific game">Join specific game (gameID required)</option>
        </select>
        <button type="submit" class="btn" data-cy="createGame-button">Join!</button>
        <div v-if="isGameIdVisible" data-cy="gameID">
          <label for="game-id">Enter gameID:</label>
          <input id="game-id" type="number">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useTokenStore } from '@/stores/token';
import { useGameStore } from '@/stores/game';
import router from '../router';

export default {
  name: 'CreateGame',
  setup() {
    const isGameIdVisible = ref(false);
    const selectedGameType = ref('');

    watch(selectedGameType, (newValue) => {
      isGameIdVisible.value = newValue === "Join specific game";
    });

    const createGame = async () => {
      const storeToken = useTokenStore();
      const gameStore = useGameStore();
      const serverUrl = import.meta.env.VITE_DJANGOURL;
      try {
        const response = await fetch(window.location.protocol + "//" + serverUrl + 'api/v1/games/', {
          method: 'POST',
          headers: {
            'Authorization': 'Token ' + storeToken.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: storeToken.user_id }),
        });
        const data = await response.json();
        if (response.status !== 201 && response.status !== 200) {
          throw new Error(data.detail || 'Failed to create a game or join an existing one');
        }

        gameStore.setGameID(data.id);
        gameStore.setPlayerColor(data.whitePlayer === storeToken.user_id ? 'white' : 'black');

        if (response.status === 201) {
          // alert('Game created with ID: ' + gameStore.game_id + ' playing as ' + gameStore.player_color);
        } else {
          // alert('Joined to existing as ' + gameStore.player_color + ' to a game with ID: ' + gameStore.game_id);
        }
        router.push('/play');
      } catch (error) {
        alert(error);
      }
    };

    return { createGame, isGameIdVisible, selectedGameType };
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
