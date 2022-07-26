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
exports.CheckBalance = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
const bcrypt_1 = __importDefault(require("bcrypt"));
function CheckBalance(cpf, password, agency, agency_digit, account, account_digit) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('search');
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
            const balance = check.rows[0];
            const compare = bcrypt_1.default.compareSync(password, balance.password);
            yield clientSelect.end();
            console.log(compare);
            if (compare) {
                const data = {
                    id: balance.id,
                    owners_cpf: balance.owners_cpf,
                    agency: balance.agency,
                    agency_digit: balance.agency_digit,
                    account: balance.account,
                    account_digit: balance.account_digit,
                    balance: balance.balance
                };
                return data;
            }
            return false;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.CheckBalance = CheckBalance;
