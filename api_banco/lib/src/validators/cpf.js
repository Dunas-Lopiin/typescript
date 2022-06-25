"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPFValidator = void 0;
class CPFValidator {
    constructor(cpf) {
        this.regex = /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/gm;
        this.errors = '';
        this.cpf = this.validation(cpf);
    }
    validation(cpf) {
        if (cpf.length === 0) {
            this.errors += 'cpf:cpf required|';
            return '';
        }
        if (!this.regex.test(cpf)) {
            this.errors += 'cpf:cpf invalid|';
            return '';
        }
        return cpf.trim();
    }
}
exports.CPFValidator = CPFValidator;
