"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyDigitValidator = void 0;
class AgencyDigitValidator {
    constructor(agencyDigit) {
        this.errors = '';
        this.agencyDigit = this.validation(agencyDigit);
    }
    validation(agencyDigit) {
        if (!agencyDigit) {
            this.errors += 'agency digit: agency digit required|';
            return '';
        }
        if (agencyDigit.trim().length !== 1) {
            this.errors += 'agency digit: agency digit is a single number|';
            return '';
        }
        if (!agencyDigit.trim) {
            this.errors += 'agency digit: the agency digit cannot be only spaces|';
            return '';
        }
        return agencyDigit.trim();
    }
}
exports.AgencyDigitValidator = AgencyDigitValidator;
