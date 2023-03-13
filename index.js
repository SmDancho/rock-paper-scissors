const crypto = require('crypto');

class generateKeys {
  generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }
  generateHmac(message, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(message);
    return hmac.digest('hex');
  }
}

class Moves {
  args = [];
  constructor() {
    this.args = process.argv.slice(2);
  }

  generateMoves() {
    if (
      this.args.length % 2 === 0 ||
      this.args.length < 3 ||
      new Set(this.args).size !== this.args.length
    ) {
      throw new Error('Moves must be non-repeating and odd in number');
    }

    console.log('Hmac:', `${hmacKey}`);
    console.log(' Available moves: ');

    this.args.forEach((element, index) =>
      console.log(` ${index + 1} - ${element}`)
    );
    console.log('0 - exit');
    console.log('? - help');
  }
}

class HelpTabel {
  generateTable(args) {
    const table = [[' ', ...args]];
    for (let i = 0; i < args.length; i++) {
      const row = [args[i]];
      for (let j = 0; j < args.length; j++) {
        if (i === j) {
          row.push('Draw');
        } else if (
          (i > j && i - j <= args.length / 2) ||
          (i < j && j - i > args.length / 2)
        ) {
          row.push('Win');
        } else {
          row.push('Lose');
        }
      }
      table.push(row);
    }
    return table;
  }
}

class PlayGame {
  userMove = '';
  userIndex = '';
  computerMove = '';
  half = moves.args.length / 2;

  startGame() {
    if (this.userIndex === 0) {
      return;
    } else {
      this.userIndex = require('readline-sync').question('Enter your move: ');
      this.userMove = moves.args[this.userIndex - 1];
    }
  }
  generateComputerMove() {
    this.computerMoveIndex = Math.floor(Math.random() * moves.args.length + 1);
    return (this.computerMove = moves.args[this.computerMoveIndex - 1]);
  }
  determineWinner() {
    if (this.userIndex > moves.args.length) {
      throw new Error('there is no this move');
    }

    if (this.computerMove === this.userMove) {
      console.log('draw');
    } else if (
      (this.userIndex > this.computerMoveIndex &&
        this.userIndex - this.computerMoveIndex <= this.half) ||
      (this.userIndex < this.computerMoveIndex &&
        this.computerMoveIndex - this.userIndex > this.half)
    ) {
      console.log('computer win');
    } else {
      console.log('You win');
    }
    if (this.userIndex === '?') {
      const table = generateTable.generateTable(moves.args);
      console.table(table);
    }

    console.log(`your move: ${this.userMove}`);
    console.log(`computer move: ${this.computerMove}`);
    console.log(`key: ${secretKey}`); 
  }
}

const keysGenerator = new generateKeys();
const moves = new Moves();
const startGame = new PlayGame();
const generateTable = new HelpTabel();

const secretKey = keysGenerator.generateKey();
const computerMove = startGame.generateComputerMove();
const hmacKey = keysGenerator.generateHmac(computerMove.toString(), secretKey);

moves.generateMoves();
startGame.generateComputerMove();
startGame.startGame();
startGame.determineWinner();


