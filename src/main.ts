import {Board,Player} from './board';
import {GameState} from './gameState';
import * as chai from "chai";

let assert = chai.assert;

// function basic_test() {
// 	let cells:number[] = [	Player.HUMAN,null,null,
// 						null,Player.HUMAN,null,
// 					  	null,null,null
// 					  ];

// 	let b = Board.createBoard(cells);
// 	let gameState = new GameState(b,Player.HUMAN,Player.COMPUTER);
	
// 	let boards = gameState.availablePlays();
	
// 	assert(boards.length === 7);
	
// 	assert(boards[6].winner() === Player.HUMAN);
	
// 	cells = [				
// 				Player.HUMAN, Player.COMPUTER, Player.HUMAN,
// 				Player.HUMAN, Player.HUMAN, Player.COMPUTER,
// 				Player.COMPUTER, Player.HUMAN, Player.COMPUTER
// 			];
	
// 	b = Board.createBoard(cells)
// 	assert(b.isDraw());
// }


let b = new Board();
b.cells[0] = Player.COMPUTER;
let g = new GameState(b,Player.COMPUTER,Player.HUMAN);
g.computerMove();

