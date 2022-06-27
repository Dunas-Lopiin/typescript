"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawDataValidator = void 0;
const _1 = require(".");
class WithdrawDataValidator {
    constructor(withdraw) {
        this.accountValidator = _1.AccountValidator;
        this.passwordValidator = _1.PasswordValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.cpfValidator = _1.CPFValidator;
        this.valueValidator = _1.ValueValidator;
        this.errors = '';
        this.withdraw = this.validation(withdraw);
    }
    validation(withdraw) {
        const validAccount = new this.accountValidator(withdraw.account);
        const validPassword = new this.passwordValidator(withdraw.password);
        const validCpf = new this.cpfValidator(withdraw.ownerCpf);
        const validValue = new this.valueValidator(withdraw.value);
        const validAcountDigit = new this.accountDigitValidator(withdraw.accountDigit);
        const validAgency = new this.agencyValidator(withdraw.agency);
        const validAgencyDigit = new this.agencyDigitValidator(withdraw.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validValue.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);
        const withdrawData = {
            account: validAccount.account,
            password: validPassword.password,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit,
            value: validValue.value
        };
        return withdrawData;
    }
}
exports.WithdrawDataValidator = WithdrawDataValidator;
