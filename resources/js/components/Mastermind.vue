<template>
  <div id="mastermind" class="text-center py-5 px-3">
    <div class="card">
      <div class="card-header">
        {{ name }}
      </div>
      <div class="card-body">
        <h5 class="card-title">A code-breaking game agains the computer!</h5>
        <p class="card-text">Press the button below to begin.</p>
        <a href="#" v-if="gameStarted" class="btn btn-secondary" @click="showAnswer">Show answer</a>
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
    <modal v-if="showModal">
      <template slot="header">
        <h5 class="modal-title">{{ gameWon ? 'You won!' : 'You lost!' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="showModal = false"></button>
      </template>
      <div v-if="!gameWon">
        <p>This was the correct answer:</p>
          <div class="d-flex justify-content-center pt-2">
            <div class="card game-card card-active">
              <div class="card-body">
                <div class="container">
                  <div class="row">
                    <div class="col" v-for="color in code" :key="color.id">
                      <button
                          class="code-circle" disabled="disabled" :class="'color-' + color">
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <p v-if="gameWon">Congratulations!</p>

      <template slot="footer">
        <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
        <button type="button" class="btn btn-primary" @click="newGame">New game</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Mastermind from '../core/Mastermind';
import GameRow from './GameRow';
import Modal from './Modal';

export default {
  data() {
    return {
      gameWon: Mastermind.gameWon,
      showModal: Mastermind._isGameEnded,
      gameStarted: Mastermind._isGameStarted,
      currentRow: Mastermind.currentRow,
      name: 'Mastermind',
      rowNumber: 12,
      keyPegs: {},
      codePegs: [],
      code: [],
    };
  },
  components: {
    GameRow,
    Modal,
  },
  created() {
    this.resetCodePegs();
    this.resetKeyPegs();
  },
  methods: {
    refresh() {
      this.gameStarted = Mastermind._isGameStarted;
      this.currentRow = Mastermind.currentRow;
      this.gameWon = Mastermind._isGameWon;
      this.showModal = Mastermind._isGameEnded;

      if (this.showModal) {
        this.code = Mastermind.codeOutput();
      }
    },
    showAnswer() {
      Mastermind.endGame();

      this.refresh();
    },
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

      this.refresh();
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
      this.refresh();
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
