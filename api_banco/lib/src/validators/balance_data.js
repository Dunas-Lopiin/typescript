"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceDataValidator = void 0;
const _1 = require(".");
class BalanceDataValidator {
    constructor(balance) {
        this.accountValidator = _1.AccountValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.cpfValidator = _1.CPFValidator;
        this.passwordValidator = _1.PasswordValidator;
        this.errors = '';
        this.balance = this.validation(balance);
    }
    validation(balance) {
        const validAccount = new this.accountValidator(balance.account);
        const validCpf = new this.cpfValidator(balance.ownerCpf);
        const validPassword = new this.passwordValidator(balance.password);
        const validAcountDigit = new this.accountDigitValidator(balance.accountDigit);
        const validAgency = new this.agencyValidator(balance.agency);
        const validAgencyDigit = new this.agencyDigitValidator(balance.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);
        const balanceData = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            password: validPassword.password,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit
        };
        return balanceData;
    }
}
exports.BalanceDataValidator = BalanceDataValidator;
