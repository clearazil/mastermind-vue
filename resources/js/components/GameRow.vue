<template>
  <div class="d-flex justify-content-center pt-2">
    <div class="card game-card">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <color-button v-for="n in 4" :key="n" :isCurrentRow="gameRow.isCurrentRow"></color-button>
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
  props: ['gameRow'],
  components: {
    ColorButton,
  },
};
</script>
