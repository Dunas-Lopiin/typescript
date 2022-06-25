"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameValidator = void 0;
class NameValidator {
    constructor(name) {
        this.errors = '';
        this.name = this.validation(name);
    }
    validation(name) {
        if (!name) {
            this.errors += 'name:name required|';
            return '';
        }
        if (name.trim().length < 3) {
            this.errors += 'name:name too short|';
            return '';
        }
        if (name.length > 60) {
            this.errors += 'name:name too long|';
        }
        if (!name.trim()) {
            this.errors += 'name:the name cannot be only spaces|';
            return '';
        }
        return name.trim();
    }
}
exports.NameValidator = NameValidator;
