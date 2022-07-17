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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOwnerService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const owner_and_account_1 = require("../client/dao/postgres/owner_and_account");
const account_1 = require("../client/dao/postgres/account");
const search_owner_1 = require("../client/dao/postgres/search_owner");
const utils_2 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(8);
const uuid_1 = require("uuid");
class CreateOwnerService {
    constructor() {
        this.ownerDataValidator = validators_1.OwnerDataValidator;
        this.ownerTable = owner_and_account_1.OwnerTable;
        this.accountTable = account_1.AccountTable;
    }
    execute(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let insertOwner;
                const validOwnerData = new this.ownerDataValidator(owner);
                const newAccount = (0, utils_2.GenerateAccount)(owner.cpf);
                let bancAccount = newAccount;
                let password = bancAccount.password;
                const hash = bcrypt_1.default.hashSync(bancAccount.password, salt);
                bancAccount.password = hash;
                console.log(hash);
                if (validOwnerData.errors) {
                    throw new Error(`400: ${validOwnerData.errors}`);
                }
                validOwnerData.owner.id = (0, uuid_1.v4)();
                const searchOwner = yield (0, search_owner_1.SearchOwner)(owner.cpf);
                console.log(searchOwner);
                if (!searchOwner) {
                    console.log('insertOwner');
                    insertOwner = yield new this.ownerTable().insert(validOwnerData.owner, bancAccount);
                }
                else {
                    insertOwner = yield new this.accountTable().insert(bancAccount);
                    validOwnerData.owner.id = searchOwner;
                }
                if (insertOwner) {
                    newAccount.password = password;
                    return {
                        data: { owner: validOwnerData.owner,
                            account: newAccount },
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["an error occurred while creating the owner"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while inserting owner on database");
            }
        });
    }
}
exports.CreateOwnerService = CreateOwnerService;
