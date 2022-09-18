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
const announcements_service_1 = require("./announcements.service");
exports.router = express_1.default.Router();
const mongodb_1 = require("../Common/Helpers/mongodb");
const LoggingService_service_1 = require("../Common/Helpers/LoggingService.service");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./frontend/public/AnnouncementsImages");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
const announcementService = new announcements_service_1.AnnouncementsService(new mongodb_1.MongoDBHelper(), new LoggingService_service_1.LoggingService());
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    const traceId = req.headers["trace-uuid"];
    const response = yield announcementService.getAnnouncements(queryParams, traceId);
    res.json(response);
}));
exports.router.post("/", upload.single("photo"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.photo = req.file.originalname;
        const bodyParams = req.body;
        const traceId = req.headers["trace-uuid"];
        const response = yield announcementService.postAnnouncement(bodyParams, traceId);
        res.json(response);
    }
    catch (err) {
        console.error(`Validation errors. ${err}`);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
}));
exports.router.post("/resetDatabase", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const traceId = req.headers["trace-uuid"];
        const bodyParams = req.body;
        const response = yield announcementService.resetDatabase(bodyParams, traceId);
        res.json(response);
    }
    catch (err) {
        console.error(`Validation errors. ${err}`);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
}));
exports.router.get("/tags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const traceId = req.headers["trace-uuid"];
    const response = yield announcementService.getTags(traceId);
    res.json(response);
}));
