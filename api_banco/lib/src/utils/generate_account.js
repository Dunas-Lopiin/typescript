"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateAccount = void 0;
const uuid_1 = require("uuid");
class GenerateAccount {
    constructor(account) {
        this.account = this.creation(account);
    }
    creation(account) {
        /* account.id = v4();
            account.ownerCpf = req.body.ownerCpf;
            account.password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
            account.agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
            account.agencyDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
            account.account = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
            account.accountDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
            account.balance = String(Math.floor(Math.random() * (9000 - 0) + 0)); */
        const accountId = (0, uuid_1.v4)();
        const password = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const agency = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const agencyDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
        const newAccount = String(Math.floor(Math.random() * (9999 - 1000) + 1000));
        const accountDigit = String(Math.floor(Math.random() * (9 - 0) + 0));
        const balance = String(Math.floor(Math.random() * (9000 - 0) + 0));
        ;
        const accountData = {
            id: accountId,
            password: password,
            account: newAccount,
            accountDigit: accountDigit,
            agency: agency,
            agencyDigit: agencyDigit,
            balance: balance
        };
        return accountData;
    }
}
exports.GenerateAccount = GenerateAccount;
