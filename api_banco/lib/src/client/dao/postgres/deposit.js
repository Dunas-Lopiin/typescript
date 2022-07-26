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
exports.DepositTable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
const uuid_1 = require("uuid");
class DepositTable {
    insert(deposit) {
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
                const check = yield client.query(selectBalanceQuery, [deposit.ownerCpf, deposit.agency, deposit.agencyDigit, deposit.account, deposit.accountDigit]);
                const balance = check.rows[0];
                const id = balance.id;
                const atualBalance = parseFloat(balance.balance);
                const depositValue = parseFloat(deposit.value);
                const fee = (depositValue * 0.01);
                const newFee = depositValue - fee;
                const newValue = atualBalance + newFee;
                if (newValue >= 0) {
                    console.log('entrou');
                    const insertDepositQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                    const result = yield client.query(insertDepositQuery, [
                        deposit.id,
                        id,
                        'deposito',
                        deposit.value
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
                    if (feeResult.rows.length !== 0) {
                        console.log("segundo ok");
                    }
                    const alterBalance = `
                UPDATE public.accounts SET balance = balance + $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
                    const final = yield client.query(alterBalance, [
                        newFee,
                        deposit.ownerCpf,
                        deposit.agency,
                        deposit.agencyDigit,
                        deposit.account,
                        deposit.accountDigit
                    ]);
                    const data = {
                        deposit: {
                            id: deposit.id,
                            value: deposit.value,
                            cpf: deposit.ownerCpf,
                            agency: deposit.agency,
                            agencyDigit: deposit.agencyDigit,
                            account: deposit.account,
                            accountDigit: deposit.accountDigit
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
exports.DepositTable = DepositTable;
