import { NextFunction, Request, Response } from "express";
import { validateOrReject } from "class-validator";
import { CreateAnnouncementDTO } from "../../Announcements/DTO/announcement.dto";

export async function validateClass(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        console.log("Validating...");
        const body: CreateAnnouncementDTO = req.body;
        await validateOrReject(body);
        next();
    } catch (err) {
        console.error(`Validation errors. ${err}`);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
}
