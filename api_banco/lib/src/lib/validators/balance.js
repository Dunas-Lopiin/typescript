"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceValidator = void 0;
class BalanceValidator {
    constructor(balance) {
        this.errors = '';
        this.balance = this.validation(balance);
    }
    validation(balance) {
        if (!balance) {
            this.errors += 'balance: balance required|';
            return '';
        }
        if (!balance.trim()) {
            this.errors += 'balance: the balance cannot be only spaces|';
            return '';
        }
        if (!parseInt(balance)) {
            this.errors += 'balance: the balance should be composed of numbers only|';
            return '';
        }
        return balance;
    }
}
exports.BalanceValidator = BalanceValidator;
