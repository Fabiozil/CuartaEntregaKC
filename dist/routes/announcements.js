"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
exports.router.use((req, res, next) => {
    console.log(`${Date.now()}`);
    next();
});
exports.router.get("/", (req, res) => {
    res.send("Get announcements");
});
exports.router.post("/", (req, res) => {
    res.send("Post announcements");
});
exports.router.get("/tags", (req, res) => {
    res.send("Get Tags");
});
