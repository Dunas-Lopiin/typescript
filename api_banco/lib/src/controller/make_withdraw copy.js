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
exports.MakeWithdraw = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
class MakeWithdraw {
    constructor() {
        this.withdrawService = services_1.CreateWithdrawService;
        this.createResponse = utils_1.CreateResponse;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new this.withdrawService().execute(req.body);
                this.createResponse.success(res, 201, response);
            }
            catch (err) {
                this.createResponse.error(res, err);
            }
        });
    }
}
exports.MakeWithdraw = MakeWithdraw;
