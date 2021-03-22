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
        <game-row
          v-for="n in rowNumber"
          :key="n"
          :isCurrentRow="isCurrentRow((n - 1))"
          @on-all-colors-chosen="allColorsChosen">
        </game-row>
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
      rowNumber: 12,
      currentRow: 0,
    };
  },
  components: {
    GameRow,
  },
  methods: {
    isCurrentRow(number) {
      return number === this.currentRow;
    },
    newGame() {
      // TODO
    },
    allColorsChosen() {
      this.currentRow += 1;
    },
  },
};
</script>
