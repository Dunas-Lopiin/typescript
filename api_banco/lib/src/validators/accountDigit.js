"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDigitValidator = void 0;
class AccountDigitValidator {
    constructor(accountDigit) {
        this.errors = '';
        this.accountDigit = this.validation(accountDigit);
    }
    validation(accountDigit) {
        if (!accountDigit) {
            this.errors += 'account digit:account digit required|';
            return '';
        }
        if (accountDigit.trim().length !== 1) {
            this.errors += 'account digit:account digit is a single number|';
            return '';
        }
        if (!accountDigit.trim) {
            this.errors += 'account digit:the account digit cannot be only spaces|';
            return '';
        }
        if (isNaN(parseInt(accountDigit))) {
            this.errors += 'account digit:the account digit should be a number|';
            return '';
        }
        return accountDigit.trim();
    }
}
exports.AccountDigitValidator = AccountDigitValidator;
