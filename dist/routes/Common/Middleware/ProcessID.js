"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateProcessId = void 0;
const uuid_1 = require("uuid");
function ValidateProcessId(req, res, next) {
    if (!req.headers["trace-uuid"]) {
        console.log("trace-uuid header not found, generating header");
        req.headers["trace-uuid"] = `self-generated-${(0, uuid_1.v4)()}`;
    }
    next();
}
exports.ValidateProcessId = ValidateProcessId;
