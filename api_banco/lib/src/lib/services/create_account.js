"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountService = void 0;
const validators_1 = require("../validators");
const uuid_1 = require("uuid");
class CreateAccountService {
    constructor() {
        this.accountDataValidator = validators_1.AccountDataValidator;
    }
    execute(account) {
        const validAccountData = new this.accountDataValidator(account);
        if (validAccountData.errors) {
            throw new Error(`400: ${validAccountData.errors}`);
        }
        validAccountData.account.id = (0, uuid_1.v4)();
        return {
            data: validAccountData.account,
            messages: []
        };
    }
}
exports.CreateAccountService = CreateAccountService;
