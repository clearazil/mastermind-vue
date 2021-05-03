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
      userInput: [],
      secretOutput: [],
      secret: [],
    },
    pegs: {
      code: [],
      key: [],
    },
  },
  mutations: {
    newGame(state) {
      state.game.state.started = true;
      state.pegs.code = JSON.parse(JSON.stringify(this.getters.pegs));
      state.pegs.key = JSON.parse(JSON.stringify(this.getters.pegs));
      state.code.secret = this.getters.secretCode.secret;
      state.code.secretOutput = this.getters.secretCode.secretOutput;

      this.commit('resetInput');
    },
    pickColor(state, payload) {
      state.pegs.code[state.row.current].colors[payload.buttonNumber].color = payload.colorNumber;
      state.pegs.code[state.row.current].colors[payload.buttonNumber].chosen = true;
      state.code.userInput['color' + payload.colorNumber].positions.push(parseInt(payload.buttonNumber));

      let advance = false;

      for (const number in state.pegs.code[state.row.current].colors) {
        if (state.pegs.code[state.row.current].colors[number].chosen === false) {
          advance = false;
          break;
        } else {
          advance = true;
        }
      }

      if (advance) {
        this.commit('advance');
      }
    },
    keyPegColors(state) {
      let result;
      let found;

      let blackPegs = 0;
      let redPegs = 0;

      let inputCodePositions;
      let codePositions;

      for (const [key, color] of Object.entries(state.code.userInput)) {
        codePositions = state.code.secret[key].positions;
        inputCodePositions = color.positions;
        found = 0;
        for (let j = 0; j < inputCodePositions.length; j++) {
          // find a position in the input that matches a position in the code
          result = codePositions.find((codePosition) => {
            return codePosition === inputCodePositions[j];
          });

          // found = red peg
          if (result !== undefined) {
            redPegs++;
            found++;
          }
        }

        // add a black peg if this input color is in the code, but
        // in the wrong position
        if (inputCodePositions.length >= codePositions.length) {
          // minus found, so an extra black peg won't be awarded for
          // the correct guesses (red pegs)
          for (let i = 0; i < (codePositions.length - found); i++) {
            blackPegs++;
          }
        }
      }

      if (redPegs === 4) {
        state.game.won = true;
      } else if (state.row.current === 11) {
        state.game.lost = true;
      }

      let pegNumber = 1;

      for (let i = 0; i < redPegs; i++) {
        state.pegs.key[state.row.current].colors[pegNumber] = {
          color: 'red',
        };

        pegNumber++;
      }

      for (let i = 0; i < blackPegs; i++) {
        state.pegs.key[state.row.current].colors[pegNumber] = {
          color: 'black',
        };

        pegNumber++;
      }
    },

    advance(state) {
      this.commit('keyPegColors');
      this.commit('resetInput');
      state.row.current += 1;
    },

    resetInput(state) {
      state.code.userInput = {
        color1: {
          positions: [],
        },
        color2: {
          positions: [],
        },
        color3: {
          positions: [],
        },
        color4: {
          positions: [],
        },
        color5: {
          positions: [],
        },
        color6: {
          positions: [],
        },
      };
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
    keyPegColorClass: (state) => (payload) => {
      if (state.pegs.key[payload.rowNumber] !== undefined) {
        return 'color-' + state.pegs.key[payload.rowNumber].colors[payload.buttonNumber].color;
      }

      return 'color-neutral';
    },
    pegs: (state) => {
      const pegs = [];
      const colors = {};

      for (let i = 1; i <= 4; i++) {
        colors[i] = {
          chosen: false,
          color: 'neutral',
        };
      }

      for (let i = 1; i <= state.row.total; i++) {
        pegs[i] = {
          // simply assigning the color var to
          // the colors prop will be assigning
          // as reference, so create a new object
          colors: JSON.parse(JSON.stringify(colors)),
        };
      }

      return pegs;
    },
    secretCode: (state) => {
      const code = {
        secret: {},
        secretOutput: [],
      };

      for (let i = 1; i <= 6; i++) {
        code.secret['color' + i] = {positions: []};
      }

      let colorKey;
      let colorNumber;

      for (let i = 1; i <= 4; i++) {
        colorNumber = Math.floor(Math.random() * (6 - 1) + 1);
        code.secretOutput.push(colorNumber);
        colorKey = 'color' + colorNumber;
        code.secret[colorKey].positions.push(i);
      }

      return code;
    },
  },
});
