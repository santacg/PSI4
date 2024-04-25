<template>
    <div class="container">
        <div class="wrapper">
            <form class="create-game-form" action="#">
                <h1>Create a chess game!</h1>
                <select name="game-selection">
                    <option hidden>Select a game type</option>
                    <option value="random-game">Join random game</option>
                    <option value="id-game">Join a friend's game</option>
                </select>
                <button type="submit" class="btn">Join!</button>
                <div class="game-id" style="display: none; ">
                    <label class="game-id-label" for="game-id">Enter your game ID:</label>
                    <input type="number">
                </div>
            </form>
        </div>
    </div>
</template>
<script>

import { ref } from 'vue';
import router from '../router';

export default {
    name: 'CreateGame',
    setup() {
        const gameSelection = ref('');
        const gameId = ref('');

        const createGame = async () => {
            if (gameSelection.value === 'id-game' && gameId.value === '') {
                alert('Please enter a game ID');
                return;
            }

            const formData = {
                gameSelection: gameSelection.value,
                gameId: gameId.value,
            };

            const baseUrl = 'http://localhost:8000/api/v1/'
            try {
                const response = await fetch(baseUrl + 'games/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || 'Failed to create game.');
                }

                console.log('Create game request successful, redirecting to the game');
                router.push('/game/' + data.id);
            } catch (error) {
                alert(error.message);
            }
        };

        return {
            gameSelection,
            gameId,
            createGame,
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
    background-image: url(../assets/img2.png);
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

.create-game-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
}

.create-game-form h1 {
    font-weight: bold;
    color: rgb(255, 255, 255);
    margin-bottom: 20px;
}

.create-game-form select {
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
}

.create-game-form button {
    padding: 10px;
    width: 100%;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.create-game-form button:hover {
    background-color: #45a049;
}


.game-id-label {
    color: rgb(255, 255, 255);
    margin-bottom: 10px;
}

.game-id input {
    padding: 10px;
    width: 100%;
}
</style>