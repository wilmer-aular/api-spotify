import { Server } from "./src/server";
import express from "express";
import { config } from "./src/config";

const { port } = config.app;

const app = express();

const server = new Server(app);
server.start(port);
