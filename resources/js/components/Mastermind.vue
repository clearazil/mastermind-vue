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
          :rowNumber="(n - 1)"
          :pegs="pegs"
          @on-all-colors-chosen="allColorsChosen">
        </game-row>
      </div>
    </div>
  </div>
</template>

<script>
import Mastermind from '../core/Mastermind';
import GameRow from './GameRow';

export default {
  data() {
    return {
      name: 'Mastermind',
      rowNumber: 12,
      currentRow: 0,
      pegs: {},
    };
  },
  components: {
    GameRow,
  },
  created() {
    for (let i = 0; i < this.rowNumber; i++) {
      this.pegs[i] = {
        1: {
          color: 'neutral',
        },
        2: {
          color: 'neutral',
        },
        3: {
          color: 'neutral',
        },
        4: {
          color: 'neutral',
        },
      };
    }
  },
  methods: {
    isCurrentRow(number) {
      return number === this.currentRow;
    },
    newGame() {
      // TODO
    },
    allColorsChosen() {
      Mastermind.pegColors().forEach((peg) => {
        this.pegs[this.currentRow][peg.number].color = peg.color;
      });

      Mastermind.advance();

      this.currentRow = Mastermind.currentRow;
    },
  },
};
</script>
