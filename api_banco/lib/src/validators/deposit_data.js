"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositDataValidator = void 0;
const _1 = require(".");
class DepositDataValidator {
    constructor(deposit) {
        this.accountValidator = _1.AccountValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.cpfValidator = _1.CPFValidator;
        this.valueValidator = _1.ValueValidator;
        this.errors = '';
        this.deposit = this.validation(deposit);
    }
    validation(deposit) {
        const validAccount = new this.accountValidator(deposit.account);
        const validCpf = new this.cpfValidator(deposit.ownerCpf);
        const validValue = new this.valueValidator(deposit.value);
        const validAcountDigit = new this.accountDigitValidator(deposit.accountDigit);
        const validAgency = new this.agencyValidator(deposit.agency);
        const validAgencyDigit = new this.agencyDigitValidator(deposit.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validCpf.errors}${validValue.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);
        const depositData = {
            account: validAccount.account,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            value: validValue.value
        };
        return depositData;
    }
}
exports.DepositDataValidator = DepositDataValidator;
