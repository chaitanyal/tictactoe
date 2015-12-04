import * as chai from "chai";

export const PERFECTPLAYER:string = "X";
export const HUMAN:string = "H";

let expect = chai.expect;
let should = chai.should();

/** return empty board */
export function createBoard():string[]{
	return new Array<string>(9);
}

/** return null or winner of board (Computer or Human) */
export function isWinner(board:string[]):string {
	validateBoard(board);

	// test diagnal -  
	let diagnalWinner:string = checkLine(
		[board[0],board[4],board[8]]
	);
	console.log(`Diagnal winner ${diagnalWinner}`);

	// test reverse diagonal
	let reverseDiagnalWinner:string = checkLine(
		[board[2],board[4],board[6]]
	);
	console.log(`Reverse diagnal winner ${reverseDiagnalWinner}`);

	// test each row board[0],board[1],board[2]
	let rows:string[][] = [
		board.slice(0,3),
		board.slice(3,6),
		board.slice(6,9)
	];
	
	console.log(rows);
	let rowWinners:string[] = rows.map( (r) => checkLine(r));
	console.log(`Row winners ${rowWinners}`);

	let columns:string[][] = [
		[board[0],board[3],board[6]],
		[board[1],board[4],board[7]],
		[board[2],board[6],board[8]]
	];
	// test each column
	let columnWinners:string[] = columns.map( (c) => checkLine(c));
	console.log(`Column winners ${columnWinners}`);

	let result:string = null;
	rowWinners.concat(columnWinners)
			  .concat([diagnalWinner,reverseDiagnalWinner])
			  .forEach(
					(s) => {
						if(s != null) {
							result = s;
						}
					}
			  );
	console.log(`isWinner: ${result}`)
	return result;
}

/**all slots are taken and there is no winner */
export function isDraw(board:string[]):boolean {
	let isEmpty = board.filter(
					(value) => {return value === null}
				  ).length === 0; // no cell should be null
					
	console.log(`isDraw - isEmpty:${isEmpty}, isWinner:${isWinner(board)}`);

	return !isEmpty && isWinner(board) == null;
}

/** return a new board with cell marked */
export function play(board:string[],cell:number,mark:string){
	expect(board[cell]).should.be.null; //cell should be empty
	board[cell] = mark;
	validateBoard(board);
	return board;
}

/** return winner (COMPUTER or HUMAN) of line or null if there is no winner*/
function checkLine(line:string[]):string {
	console.log(line);
	line.should.have.length(3);

	let isNotPerfectPlayer:boolean = line.some((s) => {return s != PERFECTPLAYER});
	let isNotHuman:boolean = line.some((s) => {return s != HUMAN});;
	
	if (!isNotPerfectPlayer) return PERFECTPLAYER;
	if (!isNotHuman) return HUMAN;
	return null;
}

function validateMove(peice:string, move:string[],board:string[][]){
	move.should.have.length(2);
	board.should.have.length(3);
}

function validateBoard(board:string[]):void {
	console.log(board);
	board.should.have.length(9);
	board.forEach (
		(s) => chai.assert(s === null || s === PERFECTPLAYER || s === HUMAN)	
	);
}
