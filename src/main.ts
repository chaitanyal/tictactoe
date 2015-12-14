/// </// <reference path="typings/tsd.d.ts" />
import * as ReadLine from 'readline';

import {AI} from './minimax';
import {GameState, Player} from './gameState';

let g = new GameState(Player.HUMAN, Player.COMPUTER);

let read = ReadLine.createInterface({input: process.stdin, output: process.stdout});

let prefix = 'TicTacToe> ';
console.log(`${prefix} You start, input cell #.`);
console.log(`${prefix} - - -`);
console.log(`${prefix} - - -`);
console.log(`${prefix} - - -`);

read.prompt();

read.on('line', function(line) {
	let cell = parseInt(line.trim());
	g.humanMove(cell);
	checkStatus(g, read);
	g.computerMove();
	console.log(`${prefix} ${g.board.slice(0,3)}`);
	console.log(`${prefix} ${g.board.slice(3,6)}`);
	console.log(`${prefix} ${g.board.slice(6,9)}`);
	checkStatus(g, read);
	read.setPrompt(prefix);
  	read.prompt();
}).on('close', function(){
	console.log('Bye');
	process.exit(0);
});

function checkStatus(g: GameState, r: ReadLine.ReadLine) {

	if (g.isFinalState()) {
		if (g.isDraw()) {
			console.log(`${prefix} Game Over! It was a draw.`);
		}

		let w = g.winner();

		if (w === Player.COMPUTER) {
			console.log(`${prefix} Game Over! I win.`);
		}

		if (w === Player.HUMAN) {
			console.log(`${prefix} Game Over! You win.`);
		}

		process.exit(0);
	}
}

// let g = new GameState(Player.HUMAN,Player.COMPUTER);
// let read = ReadLine.createInterface({input: process.stdin, output:process.stdout});
// b.cells = [ 0,null,1,1,0,0,null,1,1];
// read.on('line', function(line) {
// 	let r = AI.minimax(g);
// 	console.log(r[0]);
// 	console.log(r[1]);
// });
