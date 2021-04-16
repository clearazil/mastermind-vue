/**
 *
 */
class Mastermind {
  /**
   *
   */
  constructor() {
    this._isGameEnded = false,
    this._isGameStarted = false;
    this._currentRow = 0;
    this._isGameWon = false;
    this._codeOutput = [];
  }

  /**
   *
   */
  newGame() {
    this._isGameStarted = true;
    this._isGameEnded = false;
    this.resetInput();
    this._code = this.generateNewCode();

    this._currentRow = 0;
  }

  /**
   *
   * @param {bool} won
   */
  endGame(won = false) {
    this._isGameStarted = false;
    this._isGameEnded = true;

    this._isGameWon = won;
  }

  /**
   *
   * @return {bool}
   */
  isGameWon() {
    return this._isGameWon;
  }

  /**
   *
   * @return {bool}
   */
  isGameLost() {
    return !this._isGameLost;
  }

  /**
   *
   * @return {object}
   */
  generateNewCode() {
    const code = {
      color0: {
        positions: [],
      },
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
    };

    let colorKey;
    let colorNumber;
    this._codeOutput = [];

    for (let i = 0; i < 4; i++) {
      colorNumber = Math.round(Math.random() * 5);
      this._codeOutput.push(colorNumber);
      colorKey = 'color' + colorNumber;
      code[colorKey].positions.push(i);
    }

    return code;
  }

  /**
   *
   * @return {array}
   */
  codeOutput() {
    return this._codeOutput;
  }

  /**
   *
   * @param {int} position
   * @param {int} colorNumber
   */
  chooseColor(position, colorNumber) {
    this._inputCode['color' + colorNumber].positions.push(parseInt(position));
  }

  /**
   *
   * @return {array}
   */
  keyPegColors() {
    const pegs = [];

    let result;
    let found;

    let blackPegs = 0;
    let redPegs = 0;

    let inputCodePositions;
    let codePositions;

    for (const [key, color] of Object.entries(this._inputCode)) {
      codePositions = this._code[key].positions;
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
      this.endGame(true);
    } else if (this._currentRow === 11) {
      this.endGame(false);
    }

    let pegNumber = 1;

    for (let i = 0; i < redPegs; i++) {
      pegs.push({
        number: pegNumber,
        color: 'red',
      });

      pegNumber++;
    }

    for (let i = 0; i < blackPegs; i++) {
      pegs.push({
        number: pegNumber,
        color: 'black',
      });

      pegNumber++;
    }

    return pegs;
  }

  /**
   * Advance the game
   * to the next row
   */
  advance() {
    this._currentRow += 1;

    this.resetInput();
  }

  /**
   *
   * @param {int} number
   * @return {bool}
   */
  isCurrentRow(number) {
    return this._isGameStarted && number === this._currentRow;
  }

  /**
   *
   */
  resetInput() {
    this._inputCode = {
      color0: {
        positions: [],
      },
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
    };
  }

  /**
   * @return {object}
   */
  get code() {
    return this.generateNewCode();
  }

  /**
   * @return {int}
   */
  get currentRow() {
    return this._currentRow;
  }
}

export default new Mastermind();
