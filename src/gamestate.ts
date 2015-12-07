import {Board,Player} from './board';
import {AI} from './minimax';
import * as chai from "chai";

let assert = chai.assert;

export class GameState {
	board:Board;
	player:Player;
	opponent:Player;
	
	constructor(b:Board,p:Player,o:Player) {
		this.board = b;
		this.player = p;
		this.opponent = o;	
	}
	
	humanMove(cell:number){
		assert(this.board.getCellValue(cell) === null,"Invalid move, cannot overwrite an cell");
		assert(this.player === Player.HUMAN,"Not human's turn");
		this.board.play(cell,Player.HUMAN);
		this.player = Player.COMPUTER;
		this.opponent = Player.HUMAN;
	}
		
	computerMove() {
		assert(this.player === Player.COMPUTER,"Not computer's turn");
		//get all possible moves, find the max, set that as current game state, swap player and opponent.
		let newGameState:GameState = AI.minimax(this)[0];
		this.board = newGameState.board;
		this.player = newGameState.player;
		this.opponent = newGameState.opponent;
	}
	
	score():number{
		if(this.board.isDraw()) { //draw = 0
			return 0;
		} 
		let winner = this.board.winner();
		if(winner === Player.COMPUTER) {
			return 1;
		} else if(winner === Player.HUMAN){
			return -1;
		}
		return null; //1 = COMPUTER, 0 = HUMAN
	}
	
	/** return GameStates with cell marked */
	availablePlays():GameState[]{
		let emptyCells:number[] = [];
		let boardCells = this.board.cells;
		
		for(let i = 0; i < boardCells.length; i++) {
			if (boardCells[i] === null) {
				emptyCells.push(i);
			}
		}
		let newGameStates:GameState[] = [];
		
		emptyCells.forEach((n) => {
			let b:Board = Board.clone(this.board);
			//set cell
			b.play(n,this.player); 
			//player becomes opponent & vice versa
			newGameStates.push(new GameState(b,this.opponent,this.player)); 
		});
		return newGameStates;
	}
}