<template>
  <div class="d-flex justify-content-center pt-2">
    <div class="card game-card" :class="isRowActive(rowNumber) ? 'card-active' : ''">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <color-button v-for="number in 4" :key="number" :buttonNumber="number" :rowNumber="rowNumber">
              </color-button>
            <div class="col">
              <div class="row">
                <div class="col">
                  <span class="code-peg" :class="keyPegColorClass({buttonNumber: 1, rowNumber})"></span>
                </div>
                <div class="col">
                  <span class="code-peg" :class="keyPegColorClass({buttonNumber: 2, rowNumber})"></span>
                </div>
              </div>
              <div class="row">
                <div class="col pt-1">
                  <span class="code-peg" :class="keyPegColorClass({buttonNumber: 3, rowNumber})"></span>
                </div>
                <div class="col pt-1">
                  <span class="code-peg" :class="keyPegColorClass({buttonNumber: 4, rowNumber})"></span>
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
import {mapGetters} from 'vuex';

export default {
  props: ['rowNumber'],
  components: {
    ColorButton,
  },
  computed: {
    ...mapGetters([
      'isRowActive',
      'keyPegColorClass',
    ]),
  },
};
</script>
