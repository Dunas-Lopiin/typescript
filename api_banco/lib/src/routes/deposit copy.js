"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
const express_1 = require("express");
const route = (0, express_1.Router)();
route.route('/deposit')
    .post(new controller_1.MakeDeposit().handle.bind(new controller_1.MakeDeposit()));
exports.default = route;
