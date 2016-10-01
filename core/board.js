"use strict";

/**
 * Created by alan on 30/09/16.
 */

const controllers = {
    "default_board": require("../prototypes/default_board"),
    "chess": require("../prototypes/chess")
};

class Board {
    static inject(type, module) {
        if (type in controllers) {
            throw new Error(`! Board error: Controller of type <${type}> is already defined, try reject the type`);
        }

        controllers[type] = module;
    }

    static reject(type) {
        delete controllers[type];
    }

    static get list() {
        const types = [];

        for (let type in controllers) {
            types.push(type);
        }

        return types;
    }

    constructor(options) {
        options = options || {};

        for (let key in options) {
            this[key] = options[key];
        }

        this.type = this.type || "default_board";
        this.cells = this.values || [];

        this.build();
    }

    build() {
        if (!(this.type in controllers)) {
            throw new Error(`! Board error: Controller of type <${type}> not exists, try inject this type`);
        }

        const controller = controllers[this.type];

        controller(this);

        for (let i = 0; i < this.size; i++) {
            this.cells.push({
                item: this.new_item
            });
        }

        if (this.initialize) {
            this.initialize();
        }
    }

    get new_item() {
        if (this.default_item === null || this.default_item === void 0) {
            return null;
        }

        if (typeof this.default_item !== "object") {
            return this.default_item;
        }

        return Object.assign({}, this.default_item);
    }

    item_name(item) {
        return JSON.stringify(item);
    }

    index_name(index) {
        return JSON.stringify(index);
    }

    drop(item, index) {
        if (item) {
            console.log(`@ Board drop item <${this.item_name(item)}> at ${this.index_name(index)}`);
        }
    }

    copy_item(item) {
        if (item === null || item === void 0) {
            return null;
        }

        if (typeof item !== "object") {
            return item;
        }

        return Object.assign({}, item);
    }

    exists(index) {
        const li = this.linear_index(index);
        return li >= 0 && li < this.size;
    }

    cell(index) {
        if (!this.exists(index)) {
            throw new Error(`! Board error: Index ${this.index_name(index)} out of range`);
        }

        const li = this.linear_index(index);

        return this.cells[li];
    }

    take(index) {
        return this.cell(index).item;
    }

    put(index, item) {
        const cell = this.cell(index);

        this.drop(cell.item, index);

        cell.item = this.copy_item(item);
    }

    clean(index) {
        const cell = this.cell(index);

        this.drop(cell.item, index);

        cell.item = this.new_item;
    }

    can_swap(index_a, index_b) {
        return true;
    }

    swap(index_a, index_b) {
        if (!this.can_swap(index_a, index_b)) {
            return false;
        }

        const cell_a = this.cell(index_a);
        const cell_b = this.cell(index_b);

        const item = cell_a.item;

        cell_a.item = cell_b.item;
        cell_b.item = item;

        return true;
    }

    can_move(index_a, index_b) {
        return true;
    }

    move(index_a, index_b) {
        if (!this.can_move(index_a, index_b)) {
            return false;
        }

        const cell_a = this.cell(index_a);
        const cell_b = this.cell(index_b);

        this.drop(cell_b.item, index_b);

        cell_b.item = cell_a.item;
        cell_a.item = this.new_item;

        return true;
    }

    json() {
        return JSON.stringify(this, null, 2);
    }
}

module.exports = Board;