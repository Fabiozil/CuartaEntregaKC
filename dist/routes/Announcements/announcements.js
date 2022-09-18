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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const announcemenets_service_1 = require("./announcemenets.service");
exports.router = express_1.default.Router();
const class_validator_1 = require("class-validator");
const mongodb_1 = require("../Common/Helpers/mongodb");
const announcementService = new announcemenets_service_1.AnnouncementsService(new mongodb_1.MongoDBHelper());
exports.router.use((req, res, next) => {
    console.log(`${Date.now()}`);
    next();
});
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield announcementService.getAnnouncements(req.query);
    res.json(response);
}));
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyParams = req.body;
        const validationResponse = yield (0, class_validator_1.validateOrReject)(bodyParams);
        console.log(validationResponse);
        const response = yield announcementService.postAnnouncement(bodyParams);
        res.json(response);
    }
    catch (err) {
        console.error(`Validation errors. ${err}`);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
}));
exports.router.get("/tags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield announcementService.getTags();
    res.send("Get Tags");
}));
