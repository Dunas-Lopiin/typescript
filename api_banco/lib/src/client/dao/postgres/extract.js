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
const bcrypt_1 = __importDefault(require("bcrypt"));
function CheckExtract(cpf, password, agency, agency_digit, account, account_digit) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('searching');
            yield clientSelect.connect();
            console.log('conectado ao banco');
            const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
            owners_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
        `;
            const check = yield clientSelect.query(selectBalanceQuery, [cpf, agency, agency_digit, account, account_digit]);
            console.log(check.rows[0]);
            const compare = bcrypt_1.default.compareSync(password, check.rows[0].password);
            console.log(compare);
            if (!compare) {
                return false;
            }
            let id = check.rows[0].id;
            const selectExtractQuery = `
        SELECT * FROM public.extracts
        WHERE
            account_id=$1
            ORDER BY created_at DESC
        `;
            const check2 = yield clientSelect.query(selectExtractQuery, [id]);
            let extract = check2.rows;
            const accountInfo = {
                cpf: cpf,
                account: account,
                account_digit: account_digit,
                agency: agency,
                agency_digit: agency_digit
            };
            yield clientSelect.end();
            if (check.rows.length !== 0) {
                return { account: accountInfo, extract: extract };
            }
            return false;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.CheckExtract = CheckExtract;
