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
exports.MongoDBHelper = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBHelper {
    /***
     * Function to connect with MongoDB
     * @returns The response of the connection try
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionResponse = yield mongoose_1.default.connect(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`);
                return connectionResponse;
            }
            catch (err) {
                console.error(`Error connecting with MongoDB. ${err}`);
                throw err;
            }
        });
    }
}
exports.MongoDBHelper = MongoDBHelper;
