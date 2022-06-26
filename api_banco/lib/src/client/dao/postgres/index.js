"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDB = void 0;
const pg_1 = require("pg");
class PostgresDB {
    constructor() {
        this.client = new pg_1.Client();
    }
}
exports.PostgresDB = PostgresDB;
