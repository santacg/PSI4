import { defineStore } from 'pinia'

export const useGameStore = defineStore("games", 
  {
    state: () => ({
      game_id: null,
    }),
    actions: {
      setGameID(game_id) {
        this.game_id = game_id;
      },
      removeGame() {
        this.game_id = null;
      },
    },
  })
