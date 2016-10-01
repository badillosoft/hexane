"use strict";

/**
 * Created by alan on 30/09/16.
 */

/**
 * TODO: Define the next properties and methods of board
 *
 * Properties:
 *
 * board.size <integer> - size of vector of cells (required)
 * board.default_item <any> - the default item of cells (optional - default is null)
 *
 * Methods:
 *
 * board.linear_index <function(index)> - map function receives index and return linear index of cell (required)
 * board.can_swap <function(index_a, index_b)> - return true or false if index_a can be swaped to index_b (optional)
 * board.can_move <function(index_a, index_b)> - return true or false if index_a can be moved to index_b (optional)
 *
 */

module.exports = (board) => {
    board.size = 64;

    board.default_item = null;

    board.raw_index = (index) => {
        const aux = index.split("");
        const row = Number(aux[1]) - 1;
        const col = aux[0].toLocaleLowerCase().charCodeAt(0) - "a".charCodeAt(0);

        return {row, col};
    };

    board.unraw_index = (raw_index) => {
        return board.indexOf(raw_index.row * 8 + raw_index.col);
    };

    board.indexOf = (li) => {
        const a = "a".charCodeAt(0);

        const row = Math.floor(li / 8);
        const col = li % 8;

        const c = String.fromCharCode(a + col).toUpperCase();
        const r = row + 1;

        return `${c}${r}`;
    };

    board.linear_index = (index) => {
        const raw_index = board.raw_index(index);
        return raw_index.row * 8 + raw_index.col;
    };

    board.initialize = () => {
        board.pieces = {
            king_white: {type: "king", color: "white"},
            king_black: {type: "king", color: "black"},
            queen_white: {type: "queen", color: "white"},
            queen_black: {type: "queen", color: "black"},
            rook_white: {type: "rook", color: "white"},
            rook_black: {type: "rook", color: "black"},
            bishop_white: {type: "bishop", color: "white"},
            bishop_black: {type: "bishop", color: "black"},
            knight_white: {type: "knight", color: "white"},
            knight_black: {type: "knight", color: "black"},
            pawn_white: {type: "pawn", color: "white"},
            pawn_black: {type: "pawn", color: "black"}
        };

        board.put("A1", board.pieces["rook_white"]);
        board.put("B1", board.pieces["knight_white"]);
        board.put("C1", board.pieces["bishop_white"]);
        board.put("D1", board.pieces["queen_white"]);
        board.put("E1", board.pieces["king_white"]);
        board.put("F1", board.pieces["bishop_white"]);
        board.put("G1", board.pieces["knight_white"]);
        board.put("H1", board.pieces["rook_white"]);

        board.put("A2", board.pieces["pawn_white"]);
        board.put("B2", board.pieces["pawn_white"]);
        board.put("C2", board.pieces["pawn_white"]);
        board.put("D2", board.pieces["pawn_white"]);
        board.put("E2", board.pieces["pawn_white"]);
        board.put("F2", board.pieces["pawn_white"]);
        board.put("G2", board.pieces["pawn_white"]);
        board.put("H2", board.pieces["pawn_white"]);

        board.put("A7", board.pieces["pawn_black"]);
        board.put("B7", board.pieces["pawn_black"]);
        board.put("C7", board.pieces["pawn_black"]);
        board.put("D7", board.pieces["pawn_black"]);
        board.put("E7", board.pieces["pawn_black"]);
        board.put("F7", board.pieces["pawn_black"]);
        board.put("G7", board.pieces["pawn_black"]);
        board.put("H7", board.pieces["pawn_black"]);

        board.put("A8", board.pieces["rook_black"]);
        board.put("B8", board.pieces["knight_black"]);
        board.put("C8", board.pieces["bishop_black"]);
        board.put("D8", board.pieces["queen_black"]);
        board.put("E8", board.pieces["king_black"]);
        board.put("F8", board.pieces["bishop_black"]);
        board.put("G8", board.pieces["knight_black"]);
        board.put("H8", board.pieces["rook_black"]);
    };

    board.item_name = (item) => {
        item = item || {type: "none", color: "none"};

        const mapi = {
            "none": "·",
            "king": "K",
            "queen": "Q",
            "rook": "R",
            "bishop": "B",
            "knight": "N",
            "pawn": "P"
        };

        const name = mapi[item.type];
        const color = item.color;

        if (color === "white") {
            return ` ${name} `;
        } else if (color === "black") {
            return `:${name}:`;
        }

        return ` ${name} `;
    };

    board.log = (mute) => {
        let s = "";

        const mat = [];

        const header = ["* |"], labels = ["A", "B", "C", "D", "E", "F", "G", "H"];
        for (let col = 0; col < 8; col++) {
            header.push(` ${labels[col]} `);
        }
        header.push("| * ");

        mat.push(header.join(" "));

        mat.push("- + --- --- --- --- --- --- --- --- + -");

        for (let row = 7; row >= 0; row--) {
            let vec = [`${row + 1} |`];
            for (let col = 0; col < 8; col++) {
                let index = board.indexOf(row * 8 + col);
                vec.push(board.item_name(board.take(index)));
            }
            vec.push(`| ${row + 1}`);
            mat.push(vec.join(" "));
        }

        const footer = ["* |"];
        for (let col = 0; col < 8; col++) {
            footer.push(` ${labels[col]} `);
        }
        footer.push("| *");

        mat.push("- + --- --- --- --- --- --- --- --- + -");

        mat.push(footer.join(" "));

        s = mat.join("\n");

        if (mute) {
            console.log(s);
        }

        return s;
    };

    board.can_move = (index_a, index_b) => {
        const item_a = board.take(index_a);

        if (!item_a) {
            return false;
        }

        const raw_index_a = board.raw_index(index_a);
        const raw_index_b = board.raw_index(index_b);

        const diff_row = raw_index_b.row - raw_index_a.row;
        const diff_col = raw_index_b.col - raw_index_a.col;

        const next_index_white = board.unraw_index({row: raw_index_a.row + 1, col: raw_index_a.col});
        const next_index_black = board.unraw_index({row: raw_index_a.row - 1, col: raw_index_a.col});

        const next_index_white_2 = board.unraw_index({row: raw_index_a.row + 2, col: raw_index_a.col});
        const next_index_black_2 = board.unraw_index({row: raw_index_a.row - 2, col: raw_index_a.col});

        const left_index_white = board.unraw_index({row: raw_index_a.row + 1, col: raw_index_a.col - 1});
        const left_index_black = board.unraw_index({row: raw_index_a.row - 1, col: raw_index_a.col - 1});

        const right_index_white = board.unraw_index({row: raw_index_a.row + 1, col: raw_index_a.col + 1});
        const right_index_black = board.unraw_index({row: raw_index_a.row - 1, col: raw_index_a.col + 1});

        if (item_a.type === "pawn") {
            if (item_a.color === "white") {
                if (diff_col === 0) {
                    if (diff_row === 1) {
                        return board.exists(next_index_white) && board.empty(next_index_white);
                    } else if (diff_row === 2) {
                        return board.exists(next_index_white) && board.empty(next_index_white) &&
                            board.exists(next_index_white_2) && board.empty(next_index_white_2);
                    }
                } else if (diff_row === 1) {
                    if (diff_col === -1) {
                        return board.exists(left_index_white) && !board.empty(left_index_white);
                    } else if (diff_col === 1) {
                        return board.exists(right_index_white) && !board.empty(right_index_white);
                    }
                }
            } else if (item_a.color === "black") {
                if (diff_col === 0) {
                    if (diff_row === -1) {
                        return board.exists(next_index_black) && board.empty(next_index_black);
                    } else if (diff_row === -2) {
                        return board.exists(next_index_black) && board.empty(next_index_black) &&
                            board.exists(next_index_black_2) && board.empty(next_index_black_2);
                    }
                } else if (diff_row === -1) {
                    if (diff_col === -1) {
                        return board.exists(left_index_black) && !board.empty(left_index_black);
                    } else if (diff_col === 1) {
                        return board.exists(right_index_black) && !board.empty(right_index_black);
                    }
                }
            }
        }

        return false;
    };
};