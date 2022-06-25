"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccount = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
class CreateAccount {
    constructor() {
        this.accountService = services_1.CreateAccountService;
        this.createResponse = utils_1.CreateResponse;
    }
    handle(req, res) {
        try {
            const response = new this.accountService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch (err) {
            this.createResponse.error(res, err);
        }
    }
}
exports.CreateAccount = CreateAccount;
