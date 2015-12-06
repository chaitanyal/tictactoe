import {Board,Player} from './board';
import * as chai from "chai";

let assert = chai.assert;

export class GameState {
	private board:Board;
	private player:Player;
	private opponent:Player;
	
	constructor(b:Board,p:Player,o:Player) {
		this.board = b;
		this.player = p;
		this.opponent = o;
	}
	
	humanMove(cell:number){
		assert(this.board.getCellValue(cell) != null,"Invalid move, cannot overwrite an cell");
		this.board.play(cell,Player.HUMAN);
		this.player = Player.COMPUTER;
		this.opponent = Player.HUMAN;
	}
		
	computerMove() {
		assert(this.player === Player.COMPUTER);
		//get all possible moves, find the max, set that as current game state, swap player and opponent.
		let moves:GameState[] = this.availablePlays();
		let newGameState:GameState = this.getMove(moves,(a,b) => {a > b})[0];
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
		
		this.board.getCells().forEach((cell,index) => { 
			if (cell === null) emptyCells.push(index);
		});
		
		let newGameStates:GameState[] = [];
		
		emptyCells.forEach((n) => {
			let b:Board = Board.clone(this.board);
			b.play(n,this.player); //set cell
			newGameStates.push(new GameState(b,this.opponent,this.player)); //player becomes opponent & vice versa
		});
		
		return newGameStates;
	}
	
	private minimax():number{
		if (this.board.isFinalState()) { //terminal condition
			return this.score();
		}
		
		let moves:GameState[] = this.availablePlays();
		let scores:number[] = [];
		
		moves.forEach(
			(g,index) => {
				scores[index] = g.minimax();
			}
		);
		
		if (this.player == Player.COMPUTER){
			let max_score_index:number = this.getMove(moves,(a,b)=>{a > b})[1]; //max
			return moves[max_score_index].score();
		} else {
			let min_score_index:number = this.getMove(moves,(a,b)=>{a < b})[1]; //min
			return moves[min_score_index].score();
		}
	}
	
	/** return a tuple of value and index based on predicate */
	private getMove(moves:GameState[],predicate):[GameState,number]{
		let m:GameState = moves[0];
		var index:number = 0;
		
		for(let i = 1; i < moves.length; i++){
			if (predicate(moves[i].score,m.score)) {
				m = moves[i];
				index = i;
			}
		}
		return [m,index];
	}
}