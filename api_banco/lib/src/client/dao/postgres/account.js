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
exports.AccountTable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
class AccountTable {
    insert(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new Client();
            try {
                yield client.connect();
                console.log('conectado ao banco novamente');
                console.log(account.id, account.ownerCpf, account.password, account.agency, account.agencyDigit, account.account, account.accountDigit, account.balance);
                const insertAccountQuery = `
            INSERT INTO public.accounts
                (id, owners_cpf, password, agency, agency_digit, account, account_digit, balance) 
            VALUES 
                ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
            `;
                const result = yield client.query(insertAccountQuery, [
                    account.id,
                    account.ownerCpf,
                    account.password,
                    account.agency,
                    account.agencyDigit,
                    account.account,
                    account.accountDigit,
                    account.balance
                ]);
                console.log('foi');
                yield client.end();
                if (result.rows.length !== 0) {
                    return true;
                }
                return false;
            }
            catch (error) {
                yield client.end();
                throw new Error("503: service temporarily unavailable");
            }
        });
    }
}
exports.AccountTable = AccountTable;
