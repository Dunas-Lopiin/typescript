"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResponse = void 0;
class CreateResponse {
    static error(res, error) {
        const [statusCode, messages] = error.message.split(": ");
        if (Number(statusCode)) {
            res.status(Number(statusCode)).json({
                data: {},
                messages: messages.split("|").filter((message) => message !== "")
            });
        }
        else {
            res.status(500).json({
                data: {},
                messages: ['an unexpected error occurred']
            });
        }
    }
    static success(res, statusCode, response) {
        res.status(statusCode).json(response);
    }
}
exports.CreateResponse = CreateResponse;
