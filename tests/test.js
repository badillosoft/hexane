"use strict";

/**
 * Created by alan on 30/09/16.
 */

const Board = require("./../index").Board;

let board = new Board({ rows: 4, cols: 4 });

console.log(board.exists({ row: -1, col: -2 }));
console.log(board.exists({ row: -1, col: 2 }));
console.log(board.exists({ row: 1, col: -2 }));
console.log(board.exists({ row: 1, col: 2 }));
console.log(board.exists({ row: 4, col: 2 }));

board.put({ row: 0, col: 0 }, "hola mundo");
board.put({ row: 1, col: 1 }, "test");

console.log(board.take({ row: 0, col: 0 }));
console.log(board.take({ row: 1, col: 1 }));

board.swap({ row: 0, col: 0 }, { row: 1, col: 1 });

console.log(board.take({ row: 0, col: 0 }));
console.log(board.take({ row: 1, col: 1 }));

board.move({ row: 0, col: 0 }, { row: 1, col: 1 });

console.log(board.take({ row: 0, col: 0 }));
console.log(board.take({ row: 1, col: 1 }));

console.log(board.json());