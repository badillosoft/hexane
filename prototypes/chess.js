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

    board.indexOf = (li) => {
        const a = "a".charCodeAt(0);

        const row = Math.floor(li / 8);
        const col = li % 8;

        const c = String.fromCharCode(a + col).toUpperCase();
        const r = row + 1;

        return `${c}${r}`;
    };

    board.linear_index = (index) => {
        const aux = index.split("");
        const row = Number(aux[1]) - 1;
        const col = aux[0].toLocaleLowerCase().charCodeAt(0) - "a".charCodeAt(0);
        return row * 8 + col;
    };

    board.initialize = () => {
        board.pieces = {
            king_white: { type: "king", color: "white" },
            king_black: { type: "king", color: "black" },
            queen_white: { type: "queen", color: "white" },
            queen_black: { type: "queen", color: "black" },
            rook_white: { type: "rook", color: "white" },
            rook_black: { type: "rook", color: "black" },
            bishop_white: { type: "bishop", color: "white" },
            bishop_black: { type: "bishop", color: "black" },
            knight_white: { type: "knight", color: "white" },
            knight_black: { type: "knight", color: "black" },
            pawn_white: { type: "pawn", color: "white" },
            pawn_black: { type: "pawn", color: "black" }
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
        item = item || { type: "none", color: "none" };

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

    board.log = () => {
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

        // console.log(s);

        return s;
    };
};