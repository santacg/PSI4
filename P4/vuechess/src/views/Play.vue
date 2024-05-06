<script setup>
import { ref, reactive, nextTick, onMounted, onUnmounted } from 'vue';
import { useTokenStore } from '../stores/token';
import { useGameStore } from '../stores/game';
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css"

const moves = ref([]);
const materialDifference = ref(null);
const storeToken = useTokenStore();
const storeGame = useGameStore();

const serverUrl = import.meta.env.VITE_DJANGOURL;
const wsScheme = window.location.protocol === "https:" ? "wss://" : "ws://";
const wsUrl = wsScheme + serverUrl + "ws/play/" + storeGame.game_id + '/token/' + storeToken.token + '/';
const gameState = ref(null);
const socket = new WebSocket(wsUrl);

let boardAPI;
const playerColor = storeGame.player_color;
const winMsg = ref('');

const boardConfig = reactive({
  coordinates: true,
  orientation: playerColor,
  viewOnly: true,
  trustAllEvents: true,
});

onMounted(() => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'game') {
      gameState.value = data.status;
      if (data.status === 'ACTIVE') {
        boardConfig.viewOnly = false;
      }
      else {
        boardAPI?.setPosition(data.FEN);
        boardConfig.viewOnly = true;
      }
      alert("Status: " + data.status);
    }
    else if (data.type === 'move') {
      boardAPI?.move({ from: data.from, to: data.to, promotion: data.promotion });
    }
    else {
      alert(data.message + " Status: " + data.status + " PlayerID: " + data.playerID);
      boardAPI?.undoLastMove();
    }
  }
});

function sendMove(move) {
  let promotion = '';
  if (move.promotion) {
    promotion = move.promotion;
  }
  socket.send(JSON.stringify({
    'type': 'move',
    'from': move.from,
    'to': move.to,
    'playerID': storeToken.user_id,
    'promotion': promotion
  }));
};

function handleMove(move) {
  const moveColor = move.color === 'w' ? 'white' : 'black';
  if (moveColor === playerColor)
    sendMove(move);

  updateMoveTable(move)

  const materialCounts = boardAPI?.getMaterialCount();
  materialDifference.value = materialCounts ? materialCounts.materialDiff : 0;
}

function updateMoveTable(move) {
  const lastMove = moves.value[moves.value.length - 1];
  if (move.color === "w") {
    moves.value.push({ white: move.lan, black: '' });
  } else if (lastMove && lastMove.black === '') {
    lastMove.black = move.lan;
  } else {
    moves.value.push({ white: '', black: move.lan });
  }
  scrollToBottom();
}

function scrollToBottom() {
  nextTick(() => {
    const element = document.querySelector('.wrapper');
    element.scrollTop = element.scrollHeight;
  });
}

function handleCheckmate(isMated) {
  const winner = isMated === 'white' ? 'Black' : 'White';
  winMsg.value = `${winner} Wins`;
}

function handleStalemate() {
  winMsg.value = 'Stalemate';
}

function handleDraw() {
  winMsg.value = 'Draw';
}
</script>

<template>
  <div class="container">
    <div class="chessboard-box">
      <div class="game-info">
        <p class="game-id">Game ID: {{ storeGame.game_id }}</p>
        <p class="material-difference">Material Difference: {{ materialDifference }}</p>
        <p data-cy="winMsg">{{ winMsg }}</p>
        <button data-cy="createGame-button-in-play">PLAY NEW GAME</button>
      </div>
      <TheChessboard :board-config="boardConfig" :player-color="playerColor" @checkmate="handleCheckmate"
        @move="handleMove" @stalemate="handleStalemate" @promotion="handlePromotion" @draw="handleDraw"
        @board-created="(api) => (boardAPI = api)" reactive-config />
    </div>
    <div class="moves-box">
      <div class="wrapper">
        <table data-cy="moveTable">
          <thead>
            <tr>
              <th>#</th>
              <th>White</th>
              <th>Black</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(move, index) in moves" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ move.white }}</td>
              <td>{{ move.black }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(60, 55, 55, 0.8);
  place-content: center;
  place-items: center;
}

.chessboard-box {
  display: flex;
}

.moves-box {
  display: flex;
  padding-left: 40px;
  place-content: center;
}

.wrapper {
  min-width: 350px;
  min-height: 700px;
  max-height: 700px;
  overflow-y: auto;
  background: rgba(30, 30, 30, 0.85);
  border-radius: 20px;
  padding: 20px;
}

table {
  width: 100%;
  color: whitesmoke;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid white;
  padding: 8px;
  text-align: center;
}


.game-info {
  text-align: center;
  color: whitesmoke;
}

.game-id,
.material-difference {
  font-size: 14px;
  font-weight: bold;
}

.material-difference {
  margin-right: 55px;
}
</style>
