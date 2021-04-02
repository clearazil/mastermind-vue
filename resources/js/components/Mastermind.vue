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
          v-for="row in codePegs"
          :key="row.number"
          :isCurrentRow="isCurrentRow(row.number)"
          :row="row"
          :pegs="keyPegs"
          @on-color-chosen="colorChosen">
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
      gameStarted: Mastermind._isGameStarted,
      currentRow: Mastermind.currentRow,
      name: 'Mastermind',
      rowNumber: 12,
      keyPegs: {},
      codePegs: [],
    };
  },
  components: {
    GameRow,
  },
  created() {
    this.resetCodePegs();
    this.resetKeyPegs();
  },
  methods: {
    colorChosen(data) {
      const button = this.codePegs[data.rowNumber].colors[data.buttonNumber];
      button.chosen = true;
      button.color = data.colorNumber;

      Mastermind.chooseColor(data.buttonNumber, data.colorNumber);

      if (this.isEveryColorChosen(data.rowNumber)) {
        this.allColorsChosen();
      }
    },
    isCurrentRow(number) {
      return this.gameStarted && number === this.currentRow;
    },
    newGame() {
      this.resetCodePegs();
      this.resetKeyPegs();
      Mastermind.newGame();

      this.gameStarted = Mastermind._isGameStarted;
      this.currentRow = Mastermind.currentRow;
    },
    isEveryColorChosen(rowNumber) {
      for (const number in this.codePegs[rowNumber].colors) {
        if (this.codePegs[rowNumber].colors[number].chosen === false) {
          return false;
        }
      }

      return true;
    },
    allColorsChosen() {
      Mastermind.keyPegColors().forEach((peg) => {
        this.keyPegs[this.currentRow][peg.number].color = peg.color;
      });

      Mastermind.advance();
      this.currentRow = Mastermind.currentRow;
    },
    resetCodePegs() {
      this.codePegs = [];

      for (let i = 0; i < this.rowNumber; i++) {
        this.codePegs.push({
          number: i,
          colors: {
            0: {
              chosen: false,
              color: 'neutral',
            },
            1: {
              chosen: false,
              color: 'neutral',
            },
            2: {
              chosen: false,
              color: 'neutral',
            },
            3: {
              chosen: false,
              color: 'neutral',
            },
          },
        });
      }
    },
    resetKeyPegs() {
      for (let i = 0; i < this.rowNumber; i++) {
        this.keyPegs[i] = {
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
  },
};
</script>
