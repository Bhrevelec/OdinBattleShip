class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit () {
        this.hits += 1;
    }

    isSunk () {
        return this.hits >= this.length;
    }
}

class GameBoard {
    constructor () {
        this.board = []
        for (let i=0; i<10; i++) {
            this.board.push([])
            for(let j=0; j<10; j++) {
                this.board[i].push(new GameBoard.Position())
            }
        }
    }
    static Position = class {
        constructor() {
            this.hit = false;
            this.ship = false;
        }
    }
}