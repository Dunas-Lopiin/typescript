"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferDataValidator = void 0;
const _1 = require(".");
class TransferDataValidator {
    constructor(transfer) {
        this.cpfValidator = _1.CPFValidator;
        this.passwordValidator = _1.PasswordValidator;
        this.agencyValidator = _1.AgencyValidator;
        this.agencyDigitValidator = _1.AgencyDigitValidator;
        this.accountValidator = _1.AccountValidator;
        this.accountDigitValidator = _1.AccountDigitValidator;
        this.valueValidator = _1.ValueValidator;
        this.errors = '';
        this.transfer = this.validation(transfer);
    }
    validation(transfer) {
        const validOwnerCpf = new this.cpfValidator(transfer.ownerCpf);
        const validOwnerPassword = new this.passwordValidator(transfer.ownerPassword);
        const validOwnerAgency = new this.agencyValidator(transfer.ownerAgency);
        const validOwnerAgencyDigit = new this.agencyDigitValidator(transfer.ownerAgencyDigit);
        const validOwnerAccount = new this.accountValidator(transfer.ownerAccount);
        const validOwnerAcountDigit = new this.accountDigitValidator(transfer.ownerAccountDigit);
        const validTransferCpf = new this.cpfValidator(transfer.ownerCpf);
        const validTransferAgency = new this.agencyValidator(transfer.transferAgency);
        const validTransferAgencyDigit = new this.agencyDigitValidator(transfer.transferAgencyDigit);
        const validTransferAccount = new this.accountValidator(transfer.transferAccount);
        const validAcountDigit = new this.accountDigitValidator(transfer.transferAccountDigit);
        const validValue = new this.valueValidator(transfer.value);
        this.errors = this.errors.concat(`${validOwnerCpf.errors}${validOwnerPassword.errors}${validOwnerAgency.errors}${validOwnerAgencyDigit.errors}${validOwnerAccount.errors}${validOwnerAcountDigit.errors}${validTransferCpf.errors}${validTransferAgency.errors}${validTransferAgencyDigit.errors}${validTransferAccount.errors}${validAcountDigit.errors}${validValue.errors}`);
        const transferData = {
            ownerCpf: validOwnerCpf.cpf,
            ownerPassword: validOwnerPassword.password,
            ownerAgency: validOwnerAgency.agency,
            ownerAgencyDigit: validOwnerAgencyDigit.agencyDigit,
            ownerAccount: validOwnerAccount.account,
            ownerAccountDigit: validOwnerAcountDigit.accountDigit,
            transferCpf: validTransferCpf.cpf,
            transferAgency: validTransferAgency.agency,
            transferAgencyDigit: validTransferAgencyDigit.agencyDigit,
            transferAccount: validTransferAccount.account,
            transferAccountDigit: validAcountDigit.accountDigit,
            value: validValue.value
        };
        return transferData;
    }
}
exports.TransferDataValidator = TransferDataValidator;
