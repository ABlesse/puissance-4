const exp = require("./exports.js");
const fs = require('fs');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
let state = exp.newGame;
let nbPlayers = 0;

app.get('/', function (req, res) {
  res.render('index', state);
  res.end();
})

app.get('/ruleset/:players', function (req, res) {
  nbPlayers = parseInt(req.params.players);
  res.redirect('/game');
  res.end();
})

app.get('/game', function (req, res) {
  res.render('game', state);
  res.end();
})

app.get('/play/:slot', function (req, res) {
  state = exp.play(state, req.params.slot);
  if(nbPlayers === 1 && exp.check(state) === 0 && state.player === 2) state = exp.playIA(state);
  if(exp.check(state) === 0) res.redirect('/game');
  else res.redirect('/end/'+exp.check(state));
  res.end();
})

app.get('/end/:outcome', function (req, res) {
  let msg = {message:'', grid:[[...state.grid[0]],[...state.grid[1]],[...state.grid[2]],[...state.grid[3]],
  [...state.grid[4]],[...state.grid[5]]]};
  state = exp.newGame;
  switch(req.params.outcome) {
    case '1':
      msg.message = "Player 1 wins !";
    break;
    case '2':
      msg.message = "Player 2 wins !";
    break;
    case '3':
      msg.message = "No contest !";
  }
  res.render('end', msg);
  res.end();
})

app.listen(8080, function () {
  console.log('Listening to port 8080');
})