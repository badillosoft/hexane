"use strict";

/**
 * Created by alan on 30/09/16.
 */

const Board = require("./index").Board;

let board = new Board({ type: "chess" });

// for (let row = 0; row < 8; row++) {
//     for (let col = 0; col < 8; col++) {
//         let index = board.indexOf(row * 8 + col);
//
//         console.log(index, board.linear_index(index));
//     }
// }

board.move("c2", "c4");
board.move("d7", "d5");
board.move("c4", "d5");

console.log(board.log());