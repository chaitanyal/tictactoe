/// </// <reference path="typings/tsd.d.ts" />

import {GameState, Player} from './gamestate';

export module AI {
	export function minimax (g: GameState): [GameState, number] {
		if (g.isFinalState()) { //terminal condition
			return [g, g.score()];
		}

		let moves: GameState[] = g.availablePlays();
		let scores: [GameState, number][] = new Array<[GameState, number]>();

		moves.forEach(
			(g, index) => {
				scores[index] = minimax(g);
			}
		);

		if (g.player === Player.COMPUTER) {
			let max_score_index: number = getMove(scores, (a, b): boolean => {return a < b; }); //max <
			let rt: [GameState, number] = [moves[max_score_index], scores[max_score_index][1]];
			return rt;
		} else {
			let min_score_index: number = getMove(scores, (a, b): boolean => {return a > b; }); //min >
			let rt: [ GameState, number] = [moves[min_score_index], scores[min_score_index][1]];
			return rt;
		}
	}

	/** return a index from array */
	// predicate determines if this min or max
	function getMove(scores: [GameState, number][], compare): number {
		let previous = scores[0];
		var index: number = 0;

		for (let i = 1; i < scores.length; i++) {
			let previousScore = previous[1];
			let currentScore = scores[i][1];
			if (compare(previousScore, currentScore)) {
				previous = scores[i];
				index = i;
			}
		}
		return index;
	}
}
