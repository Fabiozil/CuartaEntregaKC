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
exports.validateClass = void 0;
const class_validator_1 = require("class-validator");
function validateClass(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Validating...");
            const body = req.body;
            yield (0, class_validator_1.validateOrReject)(body);
            next();
        }
        catch (err) {
            console.error(`Validation errors. ${err}`);
            res.json({ status: "Error", message: `Validations error. ${err}` });
        }
    });
}
exports.validateClass = validateClass;
