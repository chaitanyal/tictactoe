import * as chai from "chai";

let expect = chai.expect;
let should = chai.should();
let assert = chai.assert;
	
export enum Player {COMPUTER=0, HUMAN=1};

export class Board {
	cells:number[] = null;
	
	constructor() {
		this.cells = [null,null,null,null,null,null,null,null,null];
	}
	
	public static clone(b:Board):Board {
		let clone:Board = new Board();
		clone.cells = b.cells.slice(0);
		return clone;
	}
	
	public static createBoard(cells:number[]) {
		let b = new Board();
		b.cells = cells.slice(0);
		return b;
	}
	
	/** return null or winner of board (Computer or Human) */
	public winner():number {
		// this.validateBoard();
	
		// test diagnal -  
		let diagnalWinner:number = this.checkLine(
			[this.cells[0],this.cells[4],this.cells[8]]
		);
	
		// test reverse diagonal
		let reverseDiagnalWinner:number = this.checkLine(
			[this.cells[2],this.cells[4],this.cells[6]]
		);
	
		// test each row board[0],board[1],board[2]
		let rows:number[][] = [
			[this.cells[0],this.cells[1],this.cells[2]],
			[this.cells[3],this.cells[4],this.cells[5]],
			[this.cells[6],this.cells[7],this.cells[8]]
		];
		
		let rowWinners:number[] = rows.map( (r) => this.checkLine(r));
	
		let columns:number[][] = [
			[this.cells[0],this.cells[3],this.cells[6]],
			[this.cells[1],this.cells[4],this.cells[7]],
			[this.cells[2],this.cells[6],this.cells[8]]
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
		if(	this.cells[0] === null || this.cells[1] === null || this.cells[2] === null ||
			this.cells[3] === null || this.cells[4] === null || this.cells[5] === null ||
			this.cells[6] === null || this.cells[7] === null || this.cells[8] === null) {
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
	
	public play(cell:number,player:Player){
		this.cells[cell] = player;
		// this.validateBoard();
	}
	
	public getCellValue(index:number):number {
		// assert(0 <= index && index < 9 ,"Index out of range");
		return this.cells[index];
	}
	
	/** return winner (COMPUTER or HUMAN) of line or null if there is no winner*/
	private checkLine(line:number[]):number {
		let isPerfectPlayer:boolean = line.every((s) => {return s === Player.COMPUTER});
		let isHuman:boolean = line.every((s) => {return s === Player.HUMAN});;
		
		if (isPerfectPlayer) return Player.COMPUTER;
		if (isHuman) return Player.HUMAN;
		return null;
	}

	// private validateBoard():void {
	// 	assert(this.cells.length === 9,'Board does not have 9 cells');
	// 	let values:number[] = [0,0];
	// 	for(let i = 0; i < this.cells.length; i++) {
	// 		let s = this.cells[i];
	// 		assert(s === null || s === Player.COMPUTER || s === Player.HUMAN);
	// 		if (this.cells[i] != null) {
	// 			values[s] += 1;
	// 		}
	// 	}
	// 	assert(values[Player.COMPUTER] <= 5,`Inavlid board: ${this.cells}`);
	// 	assert(values[Player.HUMAN] <= 5,`Inavlid board: ${this.cells}`);
	// }
}
