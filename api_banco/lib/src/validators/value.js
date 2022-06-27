"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueValidator = void 0;
class ValueValidator {
    constructor(value) {
        this.errors = '';
        this.value = this.validation(value);
    }
    validation(value) {
        if (!value) {
            this.errors += 'value:value required|';
            return '';
        }
        if (!value.trim()) {
            this.errors += 'value:the value cannot be only spaces|';
            return '';
        }
        if (!parseFloat(value)) {
            this.errors += 'value:the value should be composed of numbers only|';
            return '';
        }
        if (parseFloat(value) < 0) {
            this.errors += 'value:the value should be a positive number|';
            return '';
        }
        return value;
    }
}
exports.ValueValidator = ValueValidator;
