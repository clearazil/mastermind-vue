<template>
  <div class="d-flex justify-content-center pt-2">
    <div class="card game-card">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <color-button
              @on-color-chosen="colorChosen"
              v-for="n in 4"
              :key="n"
              :buttonNumber="(n - 1)"
              :isCurrentRow="isCurrentRow">
              </color-button>
            <div class="col">
              <div class="row">
                <div class="col">
                  <span class="code-peg" :class="'color-' + pegs[rowNumber][1].color"></span>
                </div>
                <div class="col">
                  <span class="code-peg" :class="'color-' + pegs[rowNumber][2].color"></span>
                </div>
              </div>
              <div class="row">
                <div class="col pt-1">
                  <span class="code-peg" :class="'color-' + pegs[rowNumber][3].color"></span>
                </div>
                <div class="col pt-1">
                  <span class="code-peg" :class="'color-' + pegs[rowNumber][4].color"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Mastermind from '../core/Mastermind';
import ColorButton from './ColorButton';

export default {
  props: ['isCurrentRow', 'pegs', 'rowNumber'],
  data() {
    return {
      colorButtons: {
        0: {
          chosen: false,
        },
        1: {
          chosen: false,
        },
        2: {
          chosen: false,
        },
        3: {
          chosen: false,
        },
      },
    };
  },
  components: {
    ColorButton,
  },
  methods: {
    colorChosen(data) {
      this.colorButtons[data.buttonNumber].chosen = true;

      Mastermind.chooseColor(data.buttonNumber, data.colorNumber);

      if (this.isEveryColorChosen()) {
        this.$emit('on-all-colors-chosen');
      }
    },
    isEveryColorChosen() {
      for (const number in this.colorButtons) {
        if ({}.hasOwnProperty.call(this.colorButtons, number)) {
          if (this.colorButtons[number].chosen === false) {
            return false;
          }
        }
      }

      return true;
    },
  },
};
</script>
