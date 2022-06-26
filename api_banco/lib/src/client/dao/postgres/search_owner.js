"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOwner = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
function SearchOwner(cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('search');
            yield clientSelect.connect();
            console.log('conectado ao banco');
            const selectOwnerQuery = `
            SELECT cpf, id FROM public.owners
                WHERE cpf = $1
        `;
            const check = yield clientSelect.query(selectOwnerQuery, [cpf]);
            let id = check.rows[0].id;
            yield clientSelect.end();
            if (check.rows.length !== 0) {
                return id;
            }
            return false;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.SearchOwner = SearchOwner;
