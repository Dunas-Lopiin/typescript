"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
server_1.app.listen(config_1.config.PORT, () => console.log(`server listening on port ${config_1.config.PORT}`));
