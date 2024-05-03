import { defineStore } from 'pinia'

export const useGameStore = defineStore("games", 
  {
    state: () => ({
      game_id: null,
      player_color: null,
    }),
    actions: {
      setGameID(game_id) {
        this.game_id = game_id;
      },
      setPlayerColor(player_color) {
        this.player_color = player_color;
      },
      removeGame() {
        this.game_id = null;
        this.player_color = null;
      },
    },
  })
