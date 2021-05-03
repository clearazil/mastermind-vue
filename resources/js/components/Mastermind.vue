<template>
  <div id="mastermind" class="text-center py-5 px-3">
    <div class="card">
      <div class="card-header">
        Mastermind
      </div>
      <div class="card-body">
        <h5 class="card-title">A code-breaking game agains the computer!</h5>
        <p class="card-text">Press the button below to begin.</p>
        <a href="#" v-if="gameStarted" class="btn btn-secondary" @click="showAnswer">Show answer</a>
        <a href="#" class="btn btn-primary" @click="newGame">New game</a>
        <game-row
          v-for="number in rowsTotal" :key="number" :rowNumber="number">
        </game-row>
      </div>
    </div>
    <modal v-if="showModal">
      <template slot="header">
        <h5 class="modal-title">{{ gameWon ? 'You won!' : 'You lost!' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="closeModal"></button>
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
        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        <button type="button" class="btn btn-primary" @click="newGame">New game</button>
      </template>
    </modal>
  </div>
</template>

<script>
import GameRow from './GameRow';
import Modal from './Modal';
import {mapState, mapMutations} from 'vuex';

export default {
  computed: mapState({
    gameStarted: (state) => state.game.state.started,
    gameWon: (state) => state.game.state.won,
    codePegs: (state) => state.pegs.key,
    rowsTotal: (state) => state.row.total,
    showModal: (state) => state.showModal,
    code: (state) => state.code.secretOutput,
  }),
  methods: {
    ...mapMutations([
      'newGame',
      'closeModal',
      'showAnswer',
    ]),
  },
  components: {
    GameRow,
    Modal,
  },
};
</script>
