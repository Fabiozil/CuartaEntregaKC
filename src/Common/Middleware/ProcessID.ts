import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export function ValidateProcessId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.headers["trace-uuid"]) {
            console.log("trace-uuid header not found, generating header");
            req.headers["trace-uuid"] = `self-generated-${uuidv4()}`;
        }
        next();
    } catch (err) {
        console.error(err);
        res.json({ status: "Error", message: `Validations error. ${err}` });
    }
}
