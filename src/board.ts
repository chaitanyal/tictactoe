import * as chai from "chai";

let expect = chai.expect;
let should = chai.should();
let assert = chai.assert;
	
export enum Player {COMPUTER=0, HUMAN=1};

export class Board {
	cells:number[] = new Array<number>(9);
	
	public static clone(b:Board):Board {
		let clone:Board = new Board();
		clone.cells = b.cells;
		return clone;
	}
	
	public static createBoard(cells:number[]) {
		let b = new Board();
		b.cells = cells;
		return b;
	}
	
	/** return null or winner of board (Computer or Human) */
	public winner():number {
		this.validateBoard();
	
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
			this.cells.slice(0,3),
			this.cells.slice(3,6),
			this.cells.slice(6,9)
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
		let isFull = this.cells.filter(
						(value) => {return value === null}
					).length === 0; // no cell should be null
						
		return isFull && this.winner() === null;
	}
	
	public isFinalState():boolean {
		return this.isDraw() || this.winner() != null ; //its a draw or there is a winner
	}
	
	public play(cell:number,player:Player){
		this.cells[cell] = player;
		this.validateBoard();
	}
	
	public getCells():number[] {
		return this.cells;
	}
	
	public getCellValue(index:number):number {
		assert(0 <= index && index < 9 ,"Index out of range");
		return this.cells[index];
	}
	
	/** return winner (COMPUTER or HUMAN) of line or null if there is no winner*/
	private checkLine(line:number[]):number {
		//console.log(line);
		line.should.have.length(3);
	
		let isPerfectPlayer:boolean = line.every((s) => {return s === Player.COMPUTER});
		let isHuman:boolean = line.every((s) => {return s === Player.HUMAN});;
		
		if (isPerfectPlayer) return Player.COMPUTER;
		if (isHuman) return Player.HUMAN;
		return null;
	}

	private validateBoard():void {
		this.cells.should.have.length(9);
		let cells:number[] = [0,0];
		this.cells.forEach (
			(s) => {
				// each cell only has 3 possible values
				assert(s === null || s === Player.COMPUTER || s === Player.HUMAN);
				if (s != null) {
					cells[s] += 1;
				}
			}
		);
		assert(this.cells[Player.COMPUTER] <= 5,'Inavlid board: ${this.cells}');
		assert(this.cells[Player.HUMAN] <= 5,'Inavlid board: ${this.cells}');
	}
}
