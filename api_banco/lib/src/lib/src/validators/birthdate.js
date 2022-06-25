"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdateValidator = void 0;
class BirthdateValidator {
    constructor(birthdate) {
        this.errors = '';
        this.birthdate = this.validation(birthdate);
    }
    validation(birthdate) {
        if (!birthdate) {
            this.errors += 'birthdate: birthdate required|';
            return '';
        }
        if (!new Date(birthdate).getTime()) {
            this.errors += 'birthdate: invalid date|';
            return '';
        }
        return birthdate.trim();
    }
}
exports.BirthdateValidator = BirthdateValidator;
