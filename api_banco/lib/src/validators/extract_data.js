"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractDataValidator = void 0;
const _1 = require(".");
class ExtractDataValidator {
    constructor(extract) {
        this.accountValidator = _1.AccountValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.cpfValidator = _1.CPFValidator;
        this.passwordValidator = _1.PasswordValidator;
        this.errors = '';
        this.extract = this.validation(extract);
    }
    validation(extract) {
        const validAccount = new this.accountValidator(extract.account);
        const validPassword = new this.passwordValidator(extract.password);
        const validCpf = new this.cpfValidator(extract.ownerCpf);
        const validAcountDigit = new this.accountDigitValidator(extract.accountDigit);
        const validAgency = new this.agencyValidator(extract.agency);
        const validAgencyDigit = new this.agencyDigitValidator(extract.agencyDigit);
        this.errors = this.errors.concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validAcountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);
        const extractData = {
            account: validAccount.account,
            password: validPassword.password,
            ownerCpf: validCpf.cpf,
            accountDigit: validAcountDigit.accountDigit,
            agency: validAgency.agency,
            agencyDigit: validAgencyDigit.agencyDigit
        };
        return extractData;
    }
}
exports.ExtractDataValidator = ExtractDataValidator;
