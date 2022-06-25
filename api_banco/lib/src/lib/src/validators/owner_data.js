"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerDataValidator = void 0;
const _1 = require(".");
class OwnerDataValidator {
    constructor(owner) {
        this.nameValidator = _1.NameValidator;
        this.emailValidator = _1.EmailValidator;
        this.birthdateValidator = _1.BirthdateValidator;
        this.cpfValidator = _1.CPFValidator;
        this.errors = '';
        this.owner = this.validation(owner);
    }
    validation(owner) {
        const validName = new this.nameValidator(owner.name);
        const validEmail = new this.emailValidator(owner.email);
        const validBirthdate = new this.birthdateValidator(owner.birthdate);
        const validCpf = new this.cpfValidator(owner.cpf);
        this.errors = this.errors.concat(`${validName.errors}${validEmail.errors}${validBirthdate.errors}${validCpf.errors}`);
        const ownerData = {
            name: validName.name,
            email: validEmail.email,
            birthdate: validBirthdate.birthdate,
            cpf: validCpf.cpf
        };
        return ownerData;
    }
}
exports.OwnerDataValidator = OwnerDataValidator;
