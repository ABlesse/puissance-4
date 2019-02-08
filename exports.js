class ExportClass {
    get newGame() {
        let arr = new Array(7).fill(Symbol.for('free'));
        return {player:1,grid:[[...arr],[...arr],[...arr],[...arr],[...arr],[...arr]]};
    }
    play(state, column) {
        let row = -1;
        for(let i=0; i<=5; i++) {
            if(state.grid[i][column] === Symbol.for('free')) row = i;
        }
        if(row === -1) return state;
        state.grid[row][column] = Symbol.for('player'+state.player);
        state = this.turnEnd(state);
        return state;
    }
    turnEnd(state) {
        state.player = (state.player%2)+1;
        return state;
    }
    check(state) {
        if(this.isWinner(state, Symbol.for('player1'))) return 1;
        if(this.isWinner(state, Symbol.for('player2'))) return 2;
        return this.hasEnded(state) ? 3 : 0;
    }
    isWinner(state, player) {
        let row = 0;
        let column = 0;
        for(let i=0; i<42; i++) {
            row = Math.floor(i/7);
            column = i%7;
            if(state.grid[row][column] === player && 
            ((this.defaultIfOutOfBounds(state, row, column+1) === player && 
            this.defaultIfOutOfBounds(state, row, column+2) === player && 
            this.defaultIfOutOfBounds(state, row, column+3) === player) || 
            (this.defaultIfOutOfBounds(state, row+1, column) === player && 
            this.defaultIfOutOfBounds(state, row+2, column) === player && 
            this.defaultIfOutOfBounds(state, row+3, column) === player) || 
            (this.defaultIfOutOfBounds(state, row+1, column+1) === player && 
            this.defaultIfOutOfBounds(state, row+2, column+2) === player && 
            this.defaultIfOutOfBounds(state, row+3, column+3) === player) || 
            (this.defaultIfOutOfBounds(state, row+1, column-1) === player && 
            this.defaultIfOutOfBounds(state, row+2, column-2) === player && 
            this.defaultIfOutOfBounds(state, row+3, column-3) === player)))
            return true;
        }
        return false;
    }
    defaultIfOutOfBounds(state, row, column) {
        return state.grid[row] ? state.grid[row][column] || Symbol.for('free') : Symbol.for('free');
    }
    hasEnded(state) {
        let row = 0;
        let column = 0;
        let count = 0;
        for(let i=0; i<42; i++) {
            row = Math.floor(i/7);
            column = i%7;
            if(state.grid[row][column] === Symbol.for('free')) count++;
        }
        return (count === 0) ? true : false;
    }
    playIA(state, rig) {
        let col = rig || -1
        if(col === -1) col = this.IASelect(state, 2);
        if(col === -1) col = this.IASelect(state, 1);
        if(col === -1) col = this.IASetup(state);
        if(col === -1) col = this.IARandomSelect(state);
        return this.play(state, col);
    }
    IARandomSelect(state) {
        let col = Math.floor(Math.random() * 7);
        let safeSpotCount = 0;
        for(let i=0; i<7; i++) {
            if((state.grid[0][i] === Symbol.for('free')) && (!this.IAMoveIsDangerous(state, i))) safeSpotCount++;
        }
        while((state.grid[0][col] != Symbol.for('free')) && (!this.IAMoveIsDangerous(state, col) || safeSpotCount === 0)) {
            col =  Math.floor(Math.random() * 7);
        }
        return col;
    }
    IASelect(state, player) {
        let tempState;
        for(let i=0; i<7; i++) {
            tempState = {player:player,grid:[[...state.grid[0]],[...state.grid[1]],[...state.grid[2]],[...state.grid[3]],
                [...state.grid[4]],[...state.grid[5]]]};
            tempState = this.play(tempState, i);
            if(this.isWinner(tempState, Symbol.for('player'+player)) && state.grid[0][i] === Symbol.for('free')) return i;
        }
        return -1;
    }
    IASetup(state) {
        let tempState;
        for(let i=0; i<7; i++) {
            tempState = {player:2,grid:[[...state.grid[0]],[...state.grid[1]],[...state.grid[2]],[...state.grid[3]],
                [...state.grid[4]],[...state.grid[5]]]};
            tempState = this.play(tempState, i);
            if((this.IASelect(tempState, 2) != -1) && (!this.IAMoveIsDangerous(state, i))) return i;
        }
        return -1;
    }
    IAMoveIsDangerous(state, col) {
        let tempState = {player:2,grid:[[...state.grid[0]],[...state.grid[1]],[...state.grid[2]],[...state.grid[3]],
            [...state.grid[4]],[...state.grid[5]]]};
        tempState = this.play(tempState, col);
        if(this.IASelect(tempState, 1) === -1) return false;
        return true;
    }
}
module.exports = new ExportClass();