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
exports.SearchExtractService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const extract_1 = require("../client/dao/postgres/extract");
class SearchExtractService {
    constructor() {
        this.extractDataValidator = validators_1.ExtractDataValidator;
        this.extractTable = extract_1.CheckExtract;
    }
    execute(extract) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validExtractData = new this.extractDataValidator(extract);
                if (validExtractData.errors) {
                    throw new Error(`400: ${validExtractData.errors}`);
                }
                const searchExtract = yield this.extractTable(extract.ownerCpf, extract.password, extract.agency, extract.agencyDigit, extract.account, extract.accountDigit);
                console.log(searchExtract);
                if (searchExtract) {
                    return {
                        data: searchExtract,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["an error occurred while searching for the extract"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while searching for the extract2");
            }
        });
    }
}
exports.SearchExtractService = SearchExtractService;
