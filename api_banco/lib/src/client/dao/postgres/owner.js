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
exports.OwnerTable = void 0;
const _1 = require(".");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
class OwnerTable extends _1.PostgresDB {
    insert(owner, account) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new Client();
            const client2 = new Client();
            const clientSelect = new Client();
            try {
                yield clientSelect.connect();
                console.log('conectado ao banco');
                const selectOwnerQuery = `
                SELECT cpf FROM public.owners
                    WHERE cpf = $1
            `;
                const check = yield clientSelect.query(selectOwnerQuery, [owner.cpf]);
                yield clientSelect.end();
                if (check.rows.length === 0) {
                    yield client.connect();
                    console.log('conectado ao banco');
                    const insertUserQuery = `
                    INSERT INTO public.owners
                        (id, cpf, name, email, birthdate) 
                    VALUES 
                        ( $1, $2, $3, $4, $5 ) RETURNING id
                `;
                    const result = yield client.query(insertUserQuery, [
                        owner.id,
                        owner.cpf,
                        owner.name,
                        owner.email,
                        owner.birthdate
                    ]);
                    yield client.end();
                    if (result.rows.length !== 0) {
                        yield client2.connect();
                        console.log('conectado ao banco novamente');
                        const insertAccountQuery = `
                    INSERT INTO public.accounts
                        (id, owner_cpf, password, agency, agency_digit, account, account_digit, balance) 
                    VALUES 
                        ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
                    `;
                        const result2 = yield client2.query(insertAccountQuery, [
                            account.id,
                            account.ownerCpf,
                            account.password,
                            account.agency,
                            account.agencyDigit,
                            account.account,
                            account.accountDigit,
                            account.balance
                        ]);
                        yield client2.end();
                        if (result2.rows.length !== 0) {
                            return true;
                        }
                        return false;
                    }
                    return false;
                }
                else {
                    yield client2.connect();
                    console.log('conectado ao banco novamente');
                    const insertAccountQuery = `
                INSERT INTO public.accounts
                    (id, owner_cpf, password, agency, agency_digit, account, account_digit, balance) 
                VALUES 
                    ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
                `;
                    const result2 = yield client2.query(insertAccountQuery, [
                        account.id,
                        account.ownerCpf,
                        account.password,
                        account.agency,
                        account.agencyDigit,
                        account.account,
                        account.accountDigit,
                        account.balance
                    ]);
                    yield client2.end();
                    if (result2.rows.length !== 0) {
                        return true;
                    }
                    return false;
                }
                //return false;
            }
            catch (error) {
                yield client.end();
                yield client2.end();
                throw new Error("503: service temporarily unavailable");
            }
        });
    }
}
exports.OwnerTable = OwnerTable;
