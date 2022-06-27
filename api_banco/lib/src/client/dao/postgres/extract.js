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
exports.CheckExtract = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
function CheckExtract(cpf, password, agency, agency_digit, account, account_digit) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('search');
            yield clientSelect.connect();
            console.log('conectado ao banco');
            const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
            owner_cpf=$1 and 
            password=$2 and 
            agency=$3 and 
            agency_digit=$4 and
            account=$5 and
            account_digit=$6
        `;
            const check = yield clientSelect.query(selectBalanceQuery, [cpf, password, agency, agency_digit, account, account_digit]);
            let id = check.rows[0].id;
            console.log(id);
            const selectExtractQuery = `
        SELECT * FROM public.extracts
        WHERE
            account_id=$1
        `;
            const check2 = yield clientSelect.query(selectExtractQuery, [id]);
            let extract = check2.rows;
            console.log(check2.rows);
            console.log(extract, 'aqui');
            yield clientSelect.end();
            if (check.rows.length !== 0) {
                return extract;
            }
            console.log(check2.rows);
            return false;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.CheckExtract = CheckExtract;
