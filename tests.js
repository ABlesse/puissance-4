const exp = require("./exports.js");

describe("Initializer", function() {
  it("should return an object", function() {
    let [actual, expected] = [exp.newGame, {player:1,grid:new Array(6).fill(new Array(7).fill(Symbol.for('free')))}];
    expect(actual).toEqual(expected);
  });
});

describe("Writer", function() {
  it("should allow player 1 to play", function() {
    let actual  = exp.play(exp.newGame, 0);
    let expected = exp.newGame;
    expected.grid[5][0] = Symbol.for('player1');
    exp.turnEnd(expected);
    expect(actual).toEqual(expected);
  });
  it("should allow player 2 to play", function() {
    let actual  = exp.play(exp.turnEnd(exp.newGame), 0);
    let expected = exp.newGame;
    expected.grid[5][0] = Symbol.for('player2');
    expect(actual).toEqual(expected);
  });
  it("should be able to play anywhere", function() {
    let state = exp.newGame;
    let [actual, expected] = [exp.play(state, 3), {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]}];
    expect(actual).toEqual(expected);
  });
  it("should fall on top of taken slots", function() {
    let state = {player:1,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let [actual, expected] = [exp.play(state, 4), {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free')]
    ]}];
    expect(actual).toEqual(expected);
  });
  it("should do nothing if the column is full", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let [actual, expected] = [exp.play({...state}, 2), state];
    expect(actual).toEqual(expected);
  });
});

describe("Turn ender", function() {
  it("should end player 1's turn", function() {
    let state = exp.newGame;
    expect(exp.turnEnd(state).player).toEqual(2);
  });
  it("should end player 2's turn", function() {
    let state = exp.newGame;
    state.player = 2;
    expect(exp.turnEnd(state).player).toEqual(1);
  });
});

describe("Checker", function() {
  it("should return 0 if no one won", function() {
    let state = exp.newGame;
    expect(exp.check(state)).toEqual(0);
  });
  it("should return 1 if player 1 won", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    expect(exp.check(state)).toEqual(1);
  });
  it("should return 2 if player 2 won", function() {
    let state = {player:1,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free')]
    ]};
    expect(exp.check(state)).toEqual(2);
  });
  it("should return 1 if player 1 won (again)", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free')]
    ]};
    expect(exp.check(state)).toEqual(1);
  });
  it("should return 3 if the grid is full but no one won", function() {
    let state = {player:2,grid:[
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')]
    ]};
    expect(exp.check(state)).toEqual(3);
  });
});

describe("Referee", function() {
  it("should return false if the player didn't win", function() {
    let state = exp.newGame;
    expect(exp.isWinner(state, Symbol.for('player1'))).toEqual(false);
  });
  it("should return true if the player won", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    expect(exp.isWinner(state, Symbol.for('player1'))).toEqual(true);
  });
});

describe("Default giver", function() {
  it("should return the existing value if in bounds", function() {
    let state = exp.newGame;
    exp.play(state, 0);
    expect(exp.defaultIfOutOfBounds(state, 5, 0)).toEqual(Symbol.for('player1'));
  });
  it("should return a default value if out of bounds", function() {
    let state = exp.newGame;
    expect(exp.defaultIfOutOfBounds(state, 5, 8)).toEqual(Symbol.for('free'));
  });
  it("should work if the row is out of bounds", function() {
    let state = exp.newGame;
    expect(exp.defaultIfOutOfBounds(state, 8, 3)).toEqual(Symbol.for('free'));
  });
});

describe("End checker", function() {
  it("should return false if the grid still have free spaces", function() {
    let state = exp.newGame;
    expect(exp.hasEnded(state)).toEqual(false);
  });
  it("should return true if the grid is full", function() {
    let state = {player:2,grid:[
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')]
    ]};
    expect(exp.hasEnded(state)).toEqual(true);
  });
});

describe("IA", function() {
  it("should play", function() {
    let state = exp.newGame;
    state = exp.play(state, 0);
    let actual  = exp.playIA(state, 1);
    let expected = exp.play(state, 1);
    expect(actual).toEqual(expected);
  });
  it("shouldn't attempt to play on full columns", function() {
    let state = {player:2,grid:[
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player2'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player2'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1')]
    ]};
    let actual  = exp.playIA(state);
    expect(actual.grid[3][1]).toEqual(Symbol.for('player2'));
  });
  it("should win if it can win", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.playIA(state);
    expect(actual.grid[5][4]).toEqual(Symbol.for('player2'));
  });
  it("should try to prevent player 1 from winning", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.playIA(state);
    expect(actual.grid[5][3]).toEqual(Symbol.for('player2'));
  });
});

describe("IA selecter", function() {
  it("should return the choice that would make it win", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.IASelect(state, 2);
    expect(actual).toEqual(1);
  });
  it("should return the choice that would make it win in any way", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.IASelect(state, 2);
    expect(actual).toEqual(3);
  });
  it("should work for both players", function() {
    let state = {player:1,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.IASelect(state, 1);
    expect(actual).toEqual(0);
  });
  it("should return -1 if player can't win", function() {
    let state = exp.newGame;
    let actual  = exp.IASelect(state, 1);
    expect(actual).toEqual(-1);
  });
});

describe("IA setupper", function() {
  it("should set itself up for victory", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('player1')]
    ]};
    let actual  = exp.IASetup(state);
    expect(actual).toEqual(3);
  });
  it("should set itself up for victory no matter how", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('player1')]
    ]};
    let actual  = exp.IASetup(state);
    expect(actual).toEqual(4);
  });
  it("should return -1 if no setup is possible", function() {
    let state = exp.turnEnd(exp.newGame);
    let actual  = exp.IASetup(state);
    expect(actual).toEqual(-1);
  });
});

describe("IA danger detecter", function() {
  it("should return false if the action isn't dangerous", function() {
    let state = exp.turnEnd(exp.newGame);
    let actual  = exp.IAMoveIsDangerous(state, 0);
    expect(actual).toEqual(false);
  });
  it("should return true if the action is dangerous", function() {
    let state = {player:2,grid:[
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('free'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('free'),Symbol.for('player1'),Symbol.for('player1'),Symbol.for('player2'),Symbol.for('free'),Symbol.for('free'),Symbol.for('free')],
      [Symbol.for('player1'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player2'),Symbol.for('player1'),Symbol.for('free'),Symbol.for('free')]
    ]};
    let actual  = exp.IAMoveIsDangerous(state, 3);
    expect(actual).toEqual(true);
  });
});