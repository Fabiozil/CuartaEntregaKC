import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router as announcements } from "./src/Announcements/announcements.controller";
import bp from "body-parser";
import { validateClass } from "./src/Common/Middleware/classValidatorMiddleware";
import { ValidateProcessId } from "./src/Common/Middleware/ProcessID";
import cors from "cors";
dotenv.config();

import React from "react";
const ReactDOMServer = require("react-dom/server");
const app: Express = express();
const port: string = process.env.PORT || "3000";

//Middleware
app.use(bp.json());
app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(ValidateProcessId);
// app.use(validateClass);

//Announcements routes
app.use("/announcements", announcements);

//Test request
app.get("/test", (req: Request, res: Response) => {
    res.send("Hello World");
});

//Server Initialization
app.listen(port, () => {
    console.log(`Server initialized successfully at port: ${port}`);
});
