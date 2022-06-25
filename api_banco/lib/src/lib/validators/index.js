"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDataValidator = exports.OwnerDataValidator = exports.BalanceValidator = exports.AgencyDigitValidator = exports.AgencyValidator = exports.AccountDigitValidator = exports.AccountValidator = exports.CPFValidator = exports.EmailValidator = exports.NameValidator = exports.BirthdateValidator = void 0;
var birthdate_1 = require("./birthdate");
Object.defineProperty(exports, "BirthdateValidator", { enumerable: true, get: function () { return birthdate_1.BirthdateValidator; } });
var name_1 = require("./name");
Object.defineProperty(exports, "NameValidator", { enumerable: true, get: function () { return name_1.NameValidator; } });
var email_1 = require("./email");
Object.defineProperty(exports, "EmailValidator", { enumerable: true, get: function () { return email_1.EmailValidator; } });
var cpf_1 = require("./cpf");
Object.defineProperty(exports, "CPFValidator", { enumerable: true, get: function () { return cpf_1.CPFValidator; } });
var account_1 = require("./account");
Object.defineProperty(exports, "AccountValidator", { enumerable: true, get: function () { return account_1.AccountValidator; } });
var accountDigit_1 = require("./accountDigit");
Object.defineProperty(exports, "AccountDigitValidator", { enumerable: true, get: function () { return accountDigit_1.AccountDigitValidator; } });
var agency_1 = require("./agency");
Object.defineProperty(exports, "AgencyValidator", { enumerable: true, get: function () { return agency_1.AgencyValidator; } });
var agencyDigit_1 = require("./agencyDigit");
Object.defineProperty(exports, "AgencyDigitValidator", { enumerable: true, get: function () { return agencyDigit_1.AgencyDigitValidator; } });
var balance_1 = require("./balance");
Object.defineProperty(exports, "BalanceValidator", { enumerable: true, get: function () { return balance_1.BalanceValidator; } });
var owner_data_1 = require("./owner_data");
Object.defineProperty(exports, "OwnerDataValidator", { enumerable: true, get: function () { return owner_data_1.OwnerDataValidator; } });
var account_data_1 = require("./account_data");
Object.defineProperty(exports, "AccountDataValidator", { enumerable: true, get: function () { return account_data_1.AccountDataValidator; } });
