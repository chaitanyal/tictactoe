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
	
	public play(cell:number,player:Player){
		this.cells[cell] = player;
		// this.validateBoard();
	}
	
	public getCellValue(index:number):number {
		// assert(0 <= index && index < 9 ,"Index out of range");
		return this.cells[index];
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
