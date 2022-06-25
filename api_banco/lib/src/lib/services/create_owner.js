"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOwnerService = void 0;
const validators_1 = require("../validators");
const uuid_1 = require("uuid");
class CreateOwnerService {
    constructor() {
        this.ownerDataValidator = validators_1.OwnerDataValidator;
    }
    execute(owner) {
        const validOwnerData = new this.ownerDataValidator(owner);
        if (validOwnerData.errors) {
            throw new Error(`400: ${validOwnerData.errors}`);
        }
        validOwnerData.owner.id = (0, uuid_1.v4)();
        return {
            data: validOwnerData.owner,
            messages: []
        };
    }
}
exports.CreateOwnerService = CreateOwnerService;
