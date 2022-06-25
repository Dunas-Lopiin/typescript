"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDataValidator = void 0;
const _1 = require(".");
class AccountDataValidator {
    constructor(account) {
        this.accountValidator = _1.AccountValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.balanceValidator = _1.BalanceValidator;
        this.cpfValidator = _1.CPFValidator;
        this.passwordValidator = _1.PasswordValidator;
        this.errors = '';
        this.account = this.validation(account);
    }
    validation(account) {
        const validAccount = new this.accountValidator(account.account);
        const validCpf = new this.cpfValidator(account.ownerCpf);
        const validPassword = new this.passwordValidator(account.password);
        const validAcountDigit = new this.accountDigitValidator(account.accountDigit);
        const validAgency = new this.agencyValidator(account.agency);
        const validAgencyDigit = new this.agencyDigitValidator(account.agencyDigit);
        const validBalance = new this.balanceValidator(account.balance);
        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}${validBalance.errors}`);
        const accountData = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            password: validPassword.password,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            balance: validBalance.balance
        };
        return accountData;
    }
}
exports.AccountDataValidator = AccountDataValidator;
