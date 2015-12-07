/// </// <reference path="typings/tsd.d.ts" />

import {Board,Player} from './board';
import {GameState} from './gameState';
import * as ReadLine from 'readline';
import * as stream from 'stream';
import * as chai from 'chai';
import {AI} from './minimax';

let assert = chai.assert;

let read = ReadLine.createInterface({input: process.stdin, output:process.stdout});

let b:Board = new Board();
b.cells = [null,null,null,null,null,null,null,null,null];
let g = new GameState(b,Player.COMPUTER,Player.HUMAN);
console.time(`calling minmax 1`);
let result = AI.minimax(g)[0];
// let result = AI.aplahbetaminimax(g,Number.MIN_VALUE,Number.MAX_VALUE,true);
console.timeEnd('calling minmax 1');
console.log(result);


b.cells = [1,null,null,null,null,null,null,null,null];
console.time(`calling minmax 1`);
result = AI.minimax(g)[0];
console.timeEnd('calling minmax 1');
console.log(result);

b.cells = [1,null,null,null,null,null,null,null,null];
console.time(`calling minmax 1`);
result = AI.minimax(g)[0];
console.timeEnd('calling minmax 1');
console.log(result);

b.cells = [0,0,null,null,null,null,null,1,1];
console.time(`calling minmax 2`);
result = AI.minimax(g)[0];
console.timeEnd('calling minmax 2');
console.log(result);

// b.cells = [0,0,null,null,null,null,null,1,1];
// console.time(`calling minmax 2`);
// result = AI.minmax(g)[0];
// console.timeEnd('calling minmax 2');
// console.log(`result ${result}`);

// b.cells = [0,0,1,0,1,0,null,1,1];
// console.time(`calling minmax 3`);
// let result = AI.minmax(g)[0];
// console.timeEnd('calling minmax 3');
// console.log(`result ${result}`);

// b.cells = [0,0,1,0,1,0,null,1,1];
// console.time(`calling minmax 3`);
// let result = AI.minmax(g)[0];
// console.timeEnd('calling minmax 3');
// console.log(`result ${result}`);
