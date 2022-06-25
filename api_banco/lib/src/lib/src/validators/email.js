"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    constructor(email) {
        this.regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
        this.errors = '';
        this.email = this.validation(email);
    }
    validation(email) {
        if (email.length === 0) {
            this.errors += 'email: email required|';
            return '';
        }
        if (!this.regex.test(email)) {
            this.errors += 'email: this email is invalid|';
            return '';
        }
        return email.trim();
    }
}
exports.EmailValidator = EmailValidator;
