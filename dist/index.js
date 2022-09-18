"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const announcements_controller_1 = require("./src/Announcements/announcements.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const ProcessID_1 = require("./src/Common/Middleware/ProcessID");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const ReactDOMServer = require("react-dom/server");
const app = (0, express_1.default)();
const port = process.env.PORT || "3000";
//Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(ProcessID_1.ValidateProcessId);
// app.use(validateClass);
//Announcements routes
app.use("/announcements", announcements_controller_1.router);
//Test request
app.get("/test", (req, res) => {
    res.send("Hello World");
});
//Server Initialization
app.listen(port, () => {
    console.log(`Server initialized successfully at port: ${port}`);
});
