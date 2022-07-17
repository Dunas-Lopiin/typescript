"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAccount = void 0;
const uuid_1 = require("uuid");
function GenerateAccount(cpf) {
    const accountId = (0, uuid_1.v4)();
    const password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const agencyDigit = String(Math.floor(Math.random() * (9 - 1) + 1));
    const newAccount = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
    const accountDigit = String(Math.floor(Math.random() * (9 - 1) + 1));
    const balance = String(Math.floor(Math.random() * (9000 - 1000) + 1000));
    ;
    const accountData = {
        id: accountId,
        ownerCpf: cpf,
        password: password,
        account: newAccount,
        accountDigit: accountDigit,
        agency: agency,
        agencyDigit: agencyDigit,
        balance: balance
    };
    return accountData;
}
exports.GenerateAccount = GenerateAccount;
