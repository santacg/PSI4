<script setup>
import { ref, nextTick } from 'vue';
import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css"

const moves = ref([]);

function handleMove(move) {
  const lastMove = moves.value[moves.value.length - 1];
  if (move.color === "w") {
    moves.value.push({ white: move.san, black: '' });
  } else if (lastMove && lastMove.black === '') {
    lastMove.black = move.san;
  } else {
    moves.value.push({ white: '', black: move.san });
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
  alert(`${isMated} is mated`);
}

function handleStalemate() {
  alert('Stalemate');
}
</script>

<template>
  <div class="container">
    <div class="chessboard-box">
      <TheChessboard @checkmate="handleCheckmate" @move="handleMove" @stalemate="handleStalemate"
        @promotion="handlePromotion" />
    </div>
    <div class="moves-box">
      <div class="wrapper">
        <table>
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
  min-width: 320px;
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

th, td {
  border: 1px solid white;
  padding: 8px;
  text-align: center;
}
</style>

