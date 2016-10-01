"use strict";

/**
 * Created by alan on 30/09/16.
 */

const Board = require("./../index").Board;

let board = new Board({ type: "chess" });

// for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//         let index = board.indexOf(row * 8 + col);
//
//         console.log(index, board.linear_index(index));
//     }
// }

console.log(board.move("a2", "b3"), false);
console.log(board.move("h7", "g6"), false);

console.log(board.move("a2", "b2"), false);
console.log(board.move("h7", "g7"), false);

console.log(board.move("a1", "a2"), false);
console.log(board.move("h8", "h7"), false);

console.log(board.move("c2", "c4"), true);
console.log(board.move("a7", "a6"), true);

console.log(board.move("d2", "d3"), true);
console.log(board.move("b7", "b5"), true);

console.log(board.move("e2", "e5"), false);
console.log(board.move("e7", "e4"), false);

console.log(board.move("c2", "c3"), false);
console.log(board.move("b7", "b6"), false);

console.log(board.move("c4", "b5"), true);
console.log(board.move("a6", "b5"), true);

board.log();