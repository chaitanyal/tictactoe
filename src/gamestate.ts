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
		let newGameState:[GameState,number] = AI.minimax(this);
		this.board = newGameState[0].board;
		this.player = Player.HUMAN;
		this.opponent = Player.COMPUTER;
	}
	
	score():number{
		if(this.isDraw()) { //draw = 0
			return 0;
		} 
		let winner = this.winner();
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
	
	/** return null or winner of board (Computer or Human) */
	public winner():number {
		// this.validateBoard();
	
		// test diagnal -  
		let diagnalWinner:number = this.checkLine(
			[this.board.cells[0],this.board.cells[4],this.board.cells[8]]
		);
	
		// test reverse diagonal
		let reverseDiagnalWinner:number = this.checkLine(
			[this.board.cells[2],this.board.cells[4],this.board.cells[6]]
		);
	
		// test each row board[0],board[1],board[2]
		let rows:number[][] = [
			[this.board.cells[0],this.board.cells[1],this.board.cells[2]],
			[this.board.cells[3],this.board.cells[4],this.board.cells[5]],
			[this.board.cells[6],this.board.cells[7],this.board.cells[8]]
		];
		
		let rowWinners:number[] = rows.map( (r) => this.checkLine(r));
	
		let columns:number[][] = [
			[this.board.cells[0],this.board.cells[3],this.board.cells[6]],
			[this.board.cells[1],this.board.cells[4],this.board.cells[7]],
			[this.board.cells[2],this.board.cells[6],this.board.cells[8]]
		];
		// test each column
		let columnWinners:number[] = columns.map( (c) => this.checkLine(c));
	
		let result:number = null;
		rowWinners.concat(columnWinners).concat([diagnalWinner,reverseDiagnalWinner])
			.forEach(
				(s) => {
					if(s != null) {
						result = s;
					}
				}
			);
		return result;
	}
	
	/**all slots are taken and there is no winner */
	public isDraw():boolean {
		if(	this.board.cells[0] === null || this.board.cells[1] === null || this.board.cells[2] === null ||
			this.board.cells[3] === null || this.board.cells[4] === null || this.board.cells[5] === null ||
			this.board.cells[6] === null || this.board.cells[7] === null || this.board.cells[8] === null) {
			// draw if there are no empty cells
			return false;
		} else {
			return true;	
		}
	}
	
	public isFinalState():boolean {
		//draw = all cells are filled
		return this.isDraw() || this.winner() != null ; //its a draw or there is a winner
	}
	
	/** return winner (COMPUTER or HUMAN) of line or null if there is no winner*/
	private checkLine(line:number[]):number {
		let isPerfectPlayer:boolean = line.every((s) => {return s === Player.COMPUTER});
		let isHuman:boolean = line.every((s) => {return s === Player.HUMAN});;
		
		if (isPerfectPlayer) return Player.COMPUTER;
		if (isHuman) return Player.HUMAN;
		return null;
	}
}