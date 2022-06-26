"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
class PasswordValidator {
    constructor(password) {
        this.errors = '';
        this.password = this.validation(password);
    }
    validation(password) {
        if (!password) {
            this.errors += 'password:password required|';
            return '';
        }
        if (password.trim().length < 4) {
            this.errors += 'password:password too short|';
            return '';
        }
        if (!parseInt(password)) {
            this.errors += 'password:the password should be a number|';
            return '';
        }
        if (!password.trim) {
            this.errors += 'password:the password cannot be only spaces|';
            return '';
        }
        return password.trim();
    }
}
exports.PasswordValidator = PasswordValidator;
