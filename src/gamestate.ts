import {AI} from './minimax';
import * as chai from 'chai';

let assert = chai.assert;

export enum Player {COMPUTER = 0, HUMAN = 1};

export class GameState {
	// board: Board;
	board: number[] = null;
	player: Player;
	opponent: Player;

	constructor(p: Player,  o: Player) {
		this.board = [null,  null,  null,  null,  null,  null,  null,  null,  null];
		this.player = p;
		this.opponent = o;
	}

	humanMove(cell: number) {
		assert(this.board[cell] === null, 'Invalid move,  cannot overwrite an cell');
		assert(this.player === Player.HUMAN, 'Not human turn');
		assert(this.isFinalState() === false);
		this.board[cell] = Player.HUMAN;
		this.player = Player.COMPUTER;
		this.opponent = Player.HUMAN;
	}

	computerMove() {
		assert(this.player === Player.COMPUTER, 'Not computer turn');
		assert(this.isFinalState() === false);
		//get all possible moves,  find the max,  set that as current game state,  swap player and opponent.
		let newGameState: [GameState, number] = AI.minimax(this);
		this.board = newGameState[0].board;
		this.player = Player.HUMAN;
		this.opponent = Player.COMPUTER;
	}

	score(): number {
    if (this.isDraw()) { //draw = 0
			return 0;
		}
		let winner = this.winner();
		if (winner === Player.COMPUTER) {
			return 1;
		} else if (winner === Player.HUMAN) {
			return -1;
		}
		return null; //1 = COMPUTER,  0 = HUMAN
	}

	/** return GameStates with cell marked */
	availablePlays(): GameState[] {
		let emptyCells: number[] = [];
		let boardCells = this.board;

		for (let i = 0; i < boardCells.length; i++) {
			if (boardCells[i] === null) {
				emptyCells.push(i);
			}
		}
		let newGameStates: GameState[] = [];

		emptyCells.forEach((n) => {
			//player becomes opponent & vice versa
			//set cell
			let g = new GameState(this.opponent, this.player);
			g.board = this.board.slice(0);
			g.board[n] = this.player;
			newGameStates.push(g);
		});
		return newGameStates;
	}

	/** return null or winner of board (Computer or Human) */
	public winner(): number {
		// test diagnal -
		let diagnalWinner: number = this.checkLine(
			[this.board[0], this.board[4], this.board[8]]
		);

		// test reverse diagonal
		let reverseDiagnalWinner: number = this.checkLine(
			[this.board[2], this.board[4], this.board[6]]
		);

		// test each row
		let rows: number[][] = [
			[this.board[0], this.board[1], this.board[2]],
			[this.board[3], this.board[4], this.board[5]],
			[this.board[6], this.board[7], this.board[8]]
		];
		let rowWinners: number[] = rows.map( (r) => this.checkLine(r));

		// test each column
		let columns: number[][] = [
			[this.board[0], this.board[3], this.board[6]],
			[this.board[1], this.board[4], this.board[7]],
			[this.board[2], this.board[5], this.board[8]]
		];
		let columnWinners: number[] = columns.map( (c) => this.checkLine(c));

		let result: number = null;
		let winners = rowWinners.concat(columnWinners).concat([diagnalWinner, reverseDiagnalWinner]);
		winners.forEach(
			(s) => {
				if (s != null) {
					result = s;
				}
			}
		);
		return result;
	}

	/**all slots are taken and there is no winner */
	public isDraw(): boolean {
		// not a draw if there are empty cells
		if (	this.board[0] === null || this.board[1] === null || this.board[2] === null ||
			this.board[3] === null || this.board[4] === null || this.board[5] === null ||
			this.board[6] === null || this.board[7] === null || this.board[8] === null) {
			// draw if there are no empty cells
			return false;
		} else if (this.winner() != null) {
			// not a draw if there is a winner
			return false;
		}
		// its a draw if there are no empty cells and there is no winner.
		return true;
	}

	public isFinalState(): boolean {
		//draw = all cells are filled
		return this.isDraw() || this.winner() != null ; //its a draw or there is a winner
	}

	/** return winner (COMPUTER or HUMAN) of line or null if there is no winner*/
	private checkLine(line: number[]): number {
		let isPerfectPlayer: boolean = line.every((s) => {return s === Player.COMPUTER; });
		let isHuman: boolean = line.every((s) => {return s === Player.HUMAN; });

		if (isPerfectPlayer) {return Player.COMPUTER; };
		if (isHuman) {return Player.HUMAN; };
		return null;
	}
}
