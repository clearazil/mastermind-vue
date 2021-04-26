import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    row: {
      current: 1,
      total: 12,
    },
    game: {
      state: {
        started: false,
        won: false,
        lost: false,
      },
      started: false,
      ended: false,
    },
    code: {
      output: [],
    },
    pegs: {
      code: [],
      key: [],
    },
  },
  mutations: {
    newGame(state) {
      console.log(this);
      state.game.state.started = true;
      state.pegs.code = this.getters.codePegs;
    },
    pickColor(state, payload) {
      state.pegs.code[state.row.current].colors[payload.buttonNumber].color = payload.colorNumber;
    },
  },
  getters: {
    isRowActive: (state) => (rowNumber) => {
      if (state.game.state.started) {
        return state.row.current === rowNumber;
      }

      return false;
    },
    colorClass: (state) => (payload) => {
      if (state.pegs.code[payload.rowNumber] !== undefined) {
        return 'color-' + state.pegs.code[payload.rowNumber].colors[payload.buttonNumber].color;
      }

      return 'color-neutral';
    },
    codePegs: (state) => {
      const codePegs = [];

      for (let i = 1; i <= state.row.total; i++) {
        codePegs[i] = {
          number: i,
          colors: {
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
            4: {
              chosen: false,
              color: 'neutral',
            },
          },
        };
      }

      return codePegs;
    },
    secretCode: (state) => {
      const code = {};

      for (let i = 0; i < 5; i++) {
        code['color' + i] = {positions: []};
      }

      let colorKey;
      let colorNumber;
      state.code.output = [];

      for (let i = 0; i < 4; i++) {
        colorNumber = Math.round(Math.random() * 5);
        state.code.output.push(colorNumber);
        colorKey = 'color' + colorNumber;
        code[colorKey].positions.push(i);
      }

      return code;
    },
  },
});
