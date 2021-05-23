import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showModal: false,
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
    },
    code: {
      userInput: [],
      // output for showing the
      // user the answer when lost
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
      state.row.current = 1;
      state.game.state.started = true;
      state.game.state.won = false;
      state.game.state.lost = false;
      state.showModal = false;
      state.pegs.code = JSON.parse(JSON.stringify(this.getters.pegs));
      state.pegs.key = JSON.parse(JSON.stringify(this.getters.pegs));

      this.commit('setSecretCode');
      this.commit('resetInput');
    },
    setSecretCode: (state) => {
      state.code.secret = {};
      state.code.secretOutput = [];

      for (let i = 1; i <= 6; i++) {
        state.code.secret['color' + i] = {positions: []};
      }

      let colorKey;
      let colorNumber;

      for (let i = 1; i <= 4; i++) {
        colorNumber = Math.floor(Math.random() * (6 - 1) + 1);
        state.code.secretOutput.push(colorNumber);
        colorKey = 'color' + colorNumber;
        state.code.secret[colorKey].positions.push(i);
      }
    },
    showAnswer(state) {
      state.game.state.started = false;
      state.game.state.lost = true;
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    // todo: overweeg object destructuring
    // (voor voorbeelden zie: https://dmitripavlutin.com/javascript-object-destructuring/)
    // oude code: pickColor(state, payload) {
    // nieuwe code:
    pickColor(state, {colorNumber, buttonNumber}) {
      const pegsInRow = state.pegs.code[state.row.current];
      // const button = pegsInRow.colors[payload.buttonNumber];
      const button = pegsInRow.colors[buttonNumber];

      button.color = colorNumber;
      // button.color = payload.colorNumber;
      button.chosen = true;

      const inputButton = state.code.userInput['color' + colorNumber];
      // const inputButton = state.code.userInput["color" + payload.colorNumber];
      inputButton.positions.push(parseInt(buttonNumber));
      // inputButton.positions.push(parseInt(payload.buttonNumber));

      let advance = false;

      for (const number in pegsInRow.colors) {
        if (pegsInRow.colors[number].chosen === false) {
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

      let inputPositions;
      let secretPositions;

      // compare the positions (per color) of the secret code with the user input code
      for (const [key, color] of Object.entries(state.code.userInput)) {
        secretPositions = state.code.secret[key].positions;
        inputPositions = color.positions;
        found = 0;
        for (let j = 0; j < inputPositions.length; j++) {
          // find a position in the input that matches a position in the code
          result = secretPositions.find((secretPosition) => {
            return secretPosition === inputPositions[j];
          });

          // found = red peg
          if (result !== undefined) {
            redPegs++;
            found++;
          }
        }

        let maxBlackPegs = secretPositions.length - found;

        // add a black peg if this input color is in the code, but
        // in the wrong position
        while (maxBlackPegs > 0) {
          if (inputPositions.length - found >= maxBlackPegs) {
            blackPegs++;
          }

          maxBlackPegs--;
        }
      }

      // todo: i.p.v. in mutation game state (won / lost) te bepalen kun
      // je dit ook via een getter doen zodat deze altijd automatisch berekend wordt
      if (redPegs === 4) {
        state.game.state.won = true;
      } else if (state.row.current === state.row.total) {
        state.game.state.lost = true;
      }

      let pegNumber = 1;

      // todo: onderstaande twee loops zijn identiek, refacoren naar 1 loop
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

      // todo: getters van maken zodat showModal en started automatisch bijgewerkt worden
      if (state.game.state.won || state.game.state.lost) {
        state.showModal = true;
        state.game.state.started = false;
      }
    },

    resetInput(state) {
      const userInput = {};
      for (let i = 1; i <= 6; i++) {
        userInput['color' + i] = {positions: []};
      }

      state.code.userInput = userInput;
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
      if (state.pegs[payload.buttonType][payload.rowNumber] !== undefined) {
        const button =
          state.pegs[payload.buttonType][payload.rowNumber].colors[
              payload.buttonNumber
          ];
        return 'color-' + button.color;
      }

      return 'color-neutral';
    },
    buttonColorClass: (state, getters) => (payload) => {
      payload.buttonType = 'code';

      return getters.colorClass(payload);
    },
    keyPegColorClass: (state, getters) => (payload) => {
      payload.buttonType = 'key';

      return getters.colorClass(payload);
    },
    // todo: deze functie is in feite voor het wijzigen (initialiseren) van de VueX state.
    // Zet daarom onderstaande code in een mutation. (bijv. newGame)
    pegs: (state) => {
      const pegs = [];
      const colors = {};

      for (let i = 1; i <= 4; i++) {
        colors[i] = {
          chosen: false,
          color: 'neutral',
        };
      }

      // todo: offset by 1 probleem (state.pegs.code worden 13 ipv 12 stuks)
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
  },
});
