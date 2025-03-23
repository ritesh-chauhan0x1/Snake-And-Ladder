export class SnakeAndLadder {
  constructor() {
    this.row = 10;
    this.col = 10;
    this.n = this.row * this.col;
    this.board = [...Array(100)];

    this.snakes = {
      25: 3,
      42: 1,
      56: 48,
      61: 43,
      92: 67,
      94: 12,
      98: 80,
    };

    this.ladder = {
      7: 30,
      16: 33,
      20: 38,
      36: 83,
      50: 68,
      63: 81,
      71: 89,
      86: 97,
    };
  }

  getValue(index) {
    const currRow = Math.floor(index / this.col);
    const currCol = index % this.col;
    const maxValInTheCurrRow = (this.row - currRow) * this.col;
    let val = maxValInTheCurrRow - currCol;

    if (currRow % 2 == 1) {
      val = maxValInTheCurrRow - (this.col - currCol - 1);
    }

    return val;
  }
}
