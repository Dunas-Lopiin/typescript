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
exports.TransferTable = void 0;
const _1 = require(".");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../../../utils");
class TransferTable extends _1.PostgresDB {
    insert(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new Client();
            try {
                const equal = (0, utils_1.compareAccounts)(transfer.ownerCpf, transfer.transferCpf, transfer.ownerAccount, transfer.transferAccount, transfer.ownerAccountDigit, transfer.transferAccountDigit, transfer.ownerAgency, transfer.transferAgency, transfer.ownerAgencyDigit, transfer.transferAgencyDigit);
                if (equal) {
                    return false;
                }
                yield client.connect();
                console.log('conectado ao banco transfer');
                const selectOwnerBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
            owners_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
            `;
                const check = yield client.query(selectOwnerBalanceQuery, [transfer.ownerCpf, transfer.ownerAgency, transfer.ownerAgencyDigit, transfer.ownerAccount, transfer.ownerAccountDigit]);
                const compare = bcrypt_1.default.compareSync(transfer.ownerPassword, check.rows[0].password);
                if (!compare) {
                    return false;
                }
                console.log('conectado ao banco transfer2');
                const ownerBalance = check.rows[0];
                const ownerId = ownerBalance.id;
                const selectBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                agency=$1 and 
                agency_digit=$2 and
                account=$3 and
                account_digit=$4
            `;
                const check2 = yield client.query(selectBalanceQuery, [transfer.transferAgency, transfer.transferAgencyDigit, transfer.transferAccount, transfer.transferAccountDigit]);
                console.log(check2.rows);
                const transferId = check2.rows[0].id;
                if (!transferId || !ownerId) {
                    return false;
                }
                const ownerAtualBalance = parseFloat(ownerBalance.balance);
                const transferValue = parseFloat(transfer.value);
                const fee = 1;
                const newFee = transferValue + fee;
                const newValue = ownerAtualBalance - newFee;
                if (newValue >= 0) {
                    console.log('entrou');
                    const insertTransferQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                    const result = yield client.query(insertTransferQuery, [
                        transfer.id,
                        ownerId,
                        'transferência',
                        -transfer.value
                    ]);
                    console.log(result.rows);
                    if (result.rows.length !== 0) {
                        console.log("primeiro ok");
                    }
                    const insertTransferExtract = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at) 
                VALUES 
                    ( $1, $2, $3, $4, NOW() ) RETURNING id
                `;
                    const transferTableId = (0, uuid_1.v4)();
                    const depositResult = yield client.query(insertTransferExtract, [
                        transferTableId,
                        transferId,
                        'transferência',
                        transfer.value
                    ]);
                    console.log(result.rows);
                    if (depositResult.rows.length !== 0) {
                        console.log("segundo ok");
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
                        ownerId,
                        'taxa',
                        passFee
                    ]);
                    console.log(feeResult.rows);
                    if (feeResult.rows.length !== 0) {
                        console.log("terceiro ok");
                    }
                    const alterBalanceOwner = `
                UPDATE public.accounts SET balance = balance - $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
                    const ownerBalance = yield client.query(alterBalanceOwner, [
                        newFee,
                        transfer.ownerCpf,
                        transfer.ownerAgency,
                        transfer.ownerAgencyDigit,
                        transfer.ownerAccount,
                        transfer.ownerAccountDigit
                    ]);
                    const alterBalanceTransfer = `
                UPDATE public.accounts SET balance = balance + $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
                    const transferBalance = yield client.query(alterBalanceTransfer, [
                        newFee,
                        transfer.transferCpf,
                        transfer.transferAgency,
                        transfer.transferAgencyDigit,
                        transfer.transferAccount,
                        transfer.transferAccountDigit
                    ]);
                    const data = {
                        transfer_out: {
                            id: transferId.id,
                            value: transfer.value,
                            cpf: transfer.ownerCpf,
                            agency: transfer.ownerAgency,
                            agencyDigit: transfer.ownerAgencyDigit,
                            account: transfer.ownerAccount,
                            accountDigit: transfer.ownerAccountDigit
                        },
                        transfer_in: {
                            id: transferTableId,
                            cpf: transfer.ownerCpf,
                            agency: transfer.transferAgency,
                            agencyDigit: transfer.transferAgencyDigit,
                            account: transfer.transferAccount,
                            accountDigit: transfer.transferAccountDigit
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
exports.TransferTable = TransferTable;
