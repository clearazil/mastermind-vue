/**
 *
 */
class Mastermind {
  /**
   *
   */
  constructor() {
    this.newGame();
  }

  /**
   *
   */
  newGame() {
    this._code = this.generateNewCode();
    this._inputCode = {
      0: {
        colorNumber: null,
      },
      1: {
        colorNumber: null,
      },
      2: {
        colorNumber: null,
      },
      3: {
        colorNumber: null,
      },
    };

    this._currentRow = 0;
  }

  /**
   *
   * @return {object}
   */
  generateNewCode() {
    return {
      0: {
        colorNumber: 4,
      },
      1: {
        colorNumber: 1,
      },
      2: {
        colorNumber: 5,
      },
      3: {
        colorNumber: 3,
      },
    };
    const code = {};

    for (let i = 0; i < 4; i++) {
      Object.assign(code, {[i]: {colorNumber: Math.round(Math.random() * 5)}});
    }

    console.log(code);

    return code;
  }

  /**
   *
   * @param {int} position
   * @param {int} colorNumber
   */
  chooseColor(position, colorNumber) {
    this._inputCode[position].colorNumber = colorNumber;
  }

  /**
   *
   * @return {array}
   */
  pegColors() {
    this._code;

    const pegs = [];

    const numberOccurring = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const [position, element] of Object.entries(this._code)) {
      console.log('colorNumber: ', element.colorNumber);
      if (Object.keys(this._inputCode).find((key) => {
        return this._inputCode[key] === element.colorNumber;
      })) {
        numberOccurring[element.colorNumber]++;
      }
    }

    console.log(numberOccurring);

    let pegNumber = 1;

    for (const [position, element] of Object.entries(this._inputCode)) {
      if (element.colorNumber === this._code[position].colorNumber) {
        pegs.push({
          number: pegNumber,
          color: 'red',
        });

        pegNumber++;

        numberOccurring[this._code[position].codeNumber]--;
      }
    }

    for (const [position, element] of Object.entries(this._inputCode)) {
      for (let i = 0; i < numberOccurring[element.colorNumber]; i++) {
        pegs.push({
          number: pegNumber,
          color: 'black',
        });

        pegNumber++;
      }
    }

    console.log(pegs);

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
   */
  resetInput() {
    for (let i = 0; i < this._inputCode.length; i++) {
      this._inputCode[i].colorNumber = null;
    }
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
