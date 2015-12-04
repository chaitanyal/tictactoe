import * as game from './game';

let board:string[] = game.createBoard();

let winner:string[] = [	game.HUMAN,null,null,
						game.HUMAN,null,null,
					  	game.HUMAN,null,null
					  ];

let player:string = game.isWinner(winner);

console.log(`Board: ${winner}`);

console.log(`Winner: ${player}`);
