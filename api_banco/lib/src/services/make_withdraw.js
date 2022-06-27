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
exports.CreateWithdrawService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const withdraw_1 = require("../client/dao/postgres/withdraw");
const uuid_1 = require("uuid");
class CreateWithdrawService {
    constructor() {
        this.withdrawDataValidator = validators_1.WithdrawDataValidator;
        this.withdrawTable = withdraw_1.WithdrawTable;
    }
    execute(withdraw) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validWithdrawData = new this.withdrawDataValidator(withdraw);
                if (validWithdrawData.errors) {
                    throw new Error(`400: ${validWithdrawData.errors}`);
                }
                validWithdrawData.withdraw.id = (0, uuid_1.v4)();
                const makeWithdraw = yield new this.withdrawTable().insert(validWithdrawData.withdraw);
                if (makeWithdraw) {
                    return {
                        data: makeWithdraw,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["an error occurred while making the withdraw"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while making the withdraw");
            }
        });
    }
}
exports.CreateWithdrawService = CreateWithdrawService;
