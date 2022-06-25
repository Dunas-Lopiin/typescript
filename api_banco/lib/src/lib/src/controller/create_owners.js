"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOwner = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
class CreateOwner {
    constructor() {
        this.ownerService = services_1.CreateOwnerService;
        this.createResponse = utils_1.CreateResponse;
    }
    handle(req, res) {
        try {
            const response = new this.ownerService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch (err) {
            this.createResponse.error(res, err);
        }
    }
}
exports.CreateOwner = CreateOwner;
