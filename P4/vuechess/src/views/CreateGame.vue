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
                    <label class="game-id-label" for="game-id">Enter your game ID: </label>
                    <input type="number">
                </div>
            </form>
        </div>
    </div>
</template>
<script>

import { ref } from 'vue';
import router from '../router';

/* Despliegue del ID al pulsar la opción "Join a friend's game" */
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

.wrapper .create-game-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-radius: 5px;
}

.wrapper .create-game-form h1 {
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
    font-size: 38px;
}

.wrapper .create-game-form select {
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

.wrapper .create-game-form button {
    padding: 10px;
    width: 100%;
    background-color: white;
    color: black;
    cursor: pointer;
    border: none;
    border-radius: 40px;
    font-weight: bolder;
    transition: box-shadow 0.3s ease, transform 0.1s ease;
}

.wrapper .create-game-form button:hover {
    background-color: rgba(255, 255, 255, 0.8);
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