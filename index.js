"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const express_1 = __importDefault(require("express"));
const config_1 = require("./src/config");
const { port } = config_1.config.app;
const app = (0, express_1.default)();
const server = new server_1.Server(app);
server.start(port);
