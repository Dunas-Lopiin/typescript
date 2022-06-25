"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyValidator = void 0;
class AgencyValidator {
    constructor(agency) {
        this.errors = '';
        this.agency = this.validation(agency);
    }
    validation(agency) {
        if (!agency) {
            this.errors += 'agency: agency required|';
            return '';
        }
        if (agency.trim().length < 3) {
            this.errors += 'agency: agency too short|';
            return '';
        }
        if (!agency.trim) {
            this.errors += 'agency: the agency number cannot be only spaces|';
            return '';
        }
        return agency.trim();
    }
}
exports.AgencyValidator = AgencyValidator;
