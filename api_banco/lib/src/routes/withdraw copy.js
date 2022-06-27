"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../controller");
const express_1 = require("express");
const route = (0, express_1.Router)();
route.route('/withdraw')
    .post(new controller_1.MakeWithdraw().handle.bind(new controller_1.MakeWithdraw()));
exports.default = route;
