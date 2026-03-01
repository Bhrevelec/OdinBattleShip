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
            this.ship = null;
        }
    }
    
    placeShip (row,col,direction,length) {
        //row and col are coordinates of the top left position of the ship

        //Check whether ship remains in bounds
        if (direction === 'horizontal' && col+length> 10) {
            return false
        } else if (direction === 'vertical' && row+length > 10) {
            return false
        }

        //Check whether ships would overlap
        for (let i = 0; i < length; i++) {
            if (direction === 'horizontal') {
                if (this.board[row][col + i].ship) return false;
            } else {
                if (this.board[row + i][col].ship) return false;
            }
        }

        //Actual ship placement
        const ship = new Ship(length);
        for (let i = 0; i < length; i++) {
            if (direction === 'horizontal'){
                this.board[row][col+i].ship = ship;
            } else {
                this.board[row+i][col].ship = ship;
            }
        }
        return true
    }

    receiveAttack(row, col) {
        const position = this.board[row][col];
        //Filter out double attacks
        if (position.hit) {
            return false;
        }
        //Proceed with attack
        position.hit = true;
        if (position.ship) {
            position.ship.hit();
            return true;
        }
        return true;
    }
}