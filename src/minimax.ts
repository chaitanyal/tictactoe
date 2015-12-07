/// </// <reference path="typings/tsd.d.ts" />

import {Board,Player} from './board';
import {GameState} from './gamestate'

export module AI {
	
	export function minimax (g:GameState):[GameState,number]{
		if (g.board.isFinalState()) { //terminal conditionboardCells
			return [g,g.score()];
		}
		
		let moves:GameState[] = g.availablePlays();
		let scores:number[] = [];
		moves.forEach(
			(g,index) => {
				scores[index] = minimax(g)[1];
			}
		);
		
		if (g.player == Player.COMPUTER){
			let max_score_index:number = getMove(moves,(a,b)=>{a > b})[1]; //max
			return [moves[max_score_index],moves[max_score_index].score()];
		} else {
			let min_score_index:number = getMove(moves,(a,b)=>{a < b})[1]; //min
			return [moves[min_score_index],moves[min_score_index].score()];
		}
	}
	
	/** return a tuple of value and index based on predicate */
	// predicate determines if this min or max
	function getMove(moves:GameState[],predicate):[GameState,number]{
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
	
	// export function aplahbetaminimax (g:GameState,alpha:number,beta:number,maxPlayer:boolean):GameState {
	// 	if (g.board.isFinalState()) { //terminal condition
	// 		return g;
	// 	}
		
	// 	let moves:GameState[] = g.availablePlays();
		
	// 	if(maxPlayer) {
	// 		let v:number = Number.MIN_VALUE;
	// 		let rt:GameState = null;
	// 		for(let node of moves) {
	// 			rt = aplahbetaminimax (node,alpha,beta,false);
	// 			v = Math.max(v,rt.score());
	// 			alpha = Math.max(alpha,v);
	// 			if (beta <= alpha) {
	// 				break;	
	// 			}
	// 		}
	// 		return rt;
	// 	} else {
	// 		let v:number = Number.MAX_VALUE;
	// 		let rt:GameState = null;
	// 		for(let node of moves) {
	// 			rt = aplahbetaminimax (node,alpha,beta,true);
	// 			v = Math.min(v,rt.score());
	// 			beta = Math.max(beta,v);
	// 			if (beta <= alpha) {
	// 				break;	
	// 			}
	// 		}
	// 		return rt;
	// 	}
	// }
}