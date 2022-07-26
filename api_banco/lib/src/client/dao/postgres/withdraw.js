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
exports.WithdrawTable = void 0;
const _1 = require(".");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class WithdrawTable extends _1.PostgresDB {
    insert(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new Client();
            try {
                yield client.connect();
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
                const check = yield client.query(selectBalanceQuery, [withdraw.ownerCpf, withdraw.agency, withdraw.agencyDigit, withdraw.account, withdraw.accountDigit]);
                const compare = bcrypt_1.default.compareSync(withdraw.password, check.rows[0].password);
                if (!compare) {
                    return false;
                }
                const balance = check.rows[0];
                const id = balance.id;
                const atualBalance = parseFloat(balance.balance);
                const withdrawValue = parseFloat(withdraw.value);
                const fee = 4;
                const newFee = withdrawValue + fee;
                const newValue = atualBalance - newFee;
                if (newValue >= 0) {
                    console.log('entrou');
                    const insertWithdrawQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                    const result = yield client.query(insertWithdrawQuery, [
                        withdraw.id,
                        id,
                        'saque',
                        withdraw.value
                    ]);
                    console.log(result.rows);
                    if (result.rows.length !== 0) {
                        console.log("primeiro ok");
                    }
                    const insertFeeQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                    const passFee = String(fee);
                    const feeId = (0, uuid_1.v4)();
                    const feeResult = yield client.query(insertFeeQuery, [
                        feeId,
                        id,
                        'taxa',
                        passFee
                    ]);
                    console.log(feeResult.rows);
                    if (feeResult.rows.length !== 0) {
                        console.log("segundo ok");
                    }
                    const alterBalance = `
                UPDATE public.accounts SET balance = balance - $1
                WHERE
                    owners_cpf=$2 and 
                    password=$3 and 
                    agency=$4 and 
                    agency_digit=$5 and
                    account=$6 and
                    account_digit=$7
                    RETURNING balance
                `;
                    const final = yield client.query(alterBalance, [
                        newFee,
                        withdraw.id,
                        withdraw.ownerCpf,
                        withdraw.agency,
                        withdraw.agencyDigit,
                        withdraw.account,
                        withdraw.accountDigit
                    ]);
                    const data = {
                        withdraw: {
                            id: withdraw.id,
                            value: withdraw.value,
                            cpf: withdraw.ownerCpf,
                            agency: withdraw.agency,
                            agencyDigit: withdraw.agencyDigit,
                            account: withdraw.account,
                            accountDigit: withdraw.accountDigit
                        },
                        fee: {
                            id: feeId,
                            value: passFee
                        }
                    };
                    yield client.end();
                    return data;
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
exports.WithdrawTable = WithdrawTable;
