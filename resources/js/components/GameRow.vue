<template>
  <div class="d-flex justify-content-center pt-2">
    <div class="card game-card" :class="isCurrentRow ? 'card-active' : ''">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <color-button
              v-for="(color, index) in row.colors"
              :key="index"
              :color="color"
              :rowNumber="row.number"
              :buttonNumber="(index)"
              :isCurrentRow="isCurrentRow">
              </color-button>
            <div class="col">
              <div class="row">
                <div class="col">
                  <span class="code-peg" :class="'color-' + pegs[row.number][1].color"></span>
                </div>
                <div class="col">
                  <span class="code-peg" :class="'color-' + pegs[row.number][2].color"></span>
                </div>
              </div>
              <div class="row">
                <div class="col pt-1">
                  <span class="code-peg" :class="'color-' + pegs[row.number][3].color"></span>
                </div>
                <div class="col pt-1">
                  <span class="code-peg" :class="'color-' + pegs[row.number][4].color"></span>
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
  props: ['isCurrentRow', 'pegs', 'row'],
  components: {
    ColorButton,
  },
};
</script>
