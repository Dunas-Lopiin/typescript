"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
server_1.app.listen(config_1.config.port, () => {
    console.log(`[server]: Server is running at: https://localhost:${config_1.config.port}`);
});
