export function minmax():void{
	console.log("minmax");
}
/*
	This is the computer playing the game with minmax algorithm

	minimax(player,board)
		if(game over in current board position)
			return winner
		children = all legal moves for player from this board
		if(max's turn)
			return maximal score of calling minimax on all the children
		else (min's turn)
			return minimal score of calling minimax on all the children
*/