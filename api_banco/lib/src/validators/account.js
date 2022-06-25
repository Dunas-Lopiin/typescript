"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountValidator = void 0;
class AccountValidator {
    constructor(account) {
        this.errors = '';
        this.account = this.validation(account);
    }
    validation(account) {
        if (!account) {
            this.errors += 'account:account required|';
            return '';
        }
        if (account.trim().length < 4) {
            this.errors += 'account:account too short|';
            return '';
        }
        if (!account.trim) {
            this.errors += 'account:the account number cannot be only spaces|';
            return '';
        }
        if (!parseInt(account)) {
            this.errors += 'account:the account should be a number|';
            return '';
        }
        return account.trim();
    }
}
exports.AccountValidator = AccountValidator;
