"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDepositService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const deposit_1 = require("../client/dao/postgres/deposit");
const uuid_1 = require("uuid");
class CreateDepositService {
    constructor() {
        this.depositDataValidator = validators_1.DepositDataValidator;
        this.depositTable = deposit_1.DepositTable;
    }
    execute(deposit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validDepositData = new this.depositDataValidator(deposit);
                if (validDepositData.errors) {
                    throw new Error(`400: ${validDepositData.errors}`);
                }
                validDepositData.deposit.id = (0, uuid_1.v4)();
                const makeDeposit = yield new this.depositTable().insert(validDepositData.deposit);
                if (makeDeposit) {
                    return {
                        data: makeDeposit,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["an error occurred while making the deposit"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while making the deposit");
            }
        });
    }
}
exports.CreateDepositService = CreateDepositService;
