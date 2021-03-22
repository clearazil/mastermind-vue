<template>
  <div id="mastermind" class="text-center py-5 px-3">
    <div class="card">
      <div class="card-header">
        {{ name }}
      </div>
      <div class="card-body">
        <h5 class="card-title">A code-breaking game agains the computer!</h5>
        <p class="card-text">Press the button below to begin.</p>
        <a href="#" class="btn btn-primary" @click="newGame">New game</a>
        <game-row v-for="gameRow in gameRows" :key="gameRow.number" :gameRow="gameRow"></game-row>
      </div>
    </div>
  </div>
</template>

<script>
import GameRow from './GameRow';

export default {
  data() {
    return {
      name: 'Mastermind',
    };
  },
  computed: {
    gameRows: () => {
      const gameRows = [];

      for (let i = 0; i < 12; i++) {
        gameRows.push({
          number: i,
          isCurrentRow: i === 0,
        });
      }

      return gameRows;
    },
  },
  components: {
    GameRow,
  },
  methods: {
    newGame() {
      // TODO
    },
  },
};
</script>
