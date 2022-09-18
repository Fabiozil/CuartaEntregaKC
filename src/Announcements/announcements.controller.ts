import express, { NextFunction, Request, Response, Router } from "express";
import { AnnouncementsService } from "./announcements.service";
import {
    CreateAnnouncementDTO,
    GetAnnouncementsDTO,
} from "./DTO/announcement.dto";
export const router: Router = express.Router();
import { validateOrReject } from "class-validator";
import { MongoDBHelper } from "../Common/Helpers/mongodb";
import { LoggingService } from "../Common/Helpers/LoggingService.service";
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

const announcementService: AnnouncementsService = new AnnouncementsService(
    new MongoDBHelper(),
    new LoggingService()
);

router.get("/", async (req: Request, res: Response) => {
    const queryParams: any = req.query;
    const traceId = req.headers["trace-uuid"];
    const response = await announcementService.getAnnouncements(
        queryParams,
        traceId
    );
    res.json(response);
});

router.post(
    "/",
    upload.single("photo"),
    async (req: Request, res: Response) => {
        try {
            req.body.photo = req.file.originalname;
            const bodyParams: CreateAnnouncementDTO = req.body;
            const traceId = req.headers["trace-uuid"];
            const response = await announcementService.postAnnouncement(
                bodyParams,
                traceId
            );
            res.json(response);
        } catch (err) {
            console.error(`Validation errors. ${err}`);
            res.json({ status: "Error", message: `Validations error. ${err}` });
        }
    }
);

router.post("/resetDatabase", async (req: Request, res: Response) => {
    try {
        const traceId = req.headers["trace-uuid"];
        const bodyParams = req.body;
        const response = await announcementService.resetDatabase(
            bodyParams,
            traceId
        );
        res.json(response);
    } catch (err) {
        console.error(`Validation errors. ${err}`);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
});

router.get("/tags", async (req: Request, res: Response) => {
    const traceId = req.headers["trace-uuid"];
    const response = await announcementService.getTags(traceId);
    res.json(response);
});
