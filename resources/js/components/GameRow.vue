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
                  <span class="code-peg color-neutral"></span>
                </div>
                <div class="col">
                  <span class="code-peg color-neutral"></span>
                </div>
              </div>
              <div class="row">
                <div class="col pt-1">
                  <span class="code-peg color-neutral"></span>
                </div>
                <div class="col pt-1">
                  <span class="code-peg color-neutral"></span>
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

import ColorButton from './ColorButton';

export default {
  props: ['isCurrentRow'],
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
    colorChosen(buttonNumber) {
      this.colorButtons[buttonNumber].chosen = true;

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
