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
exports.AnnouncementsService = void 0;
const announcements_1 = require("../../models/announcements");
class AnnouncementsService {
    constructor(mongoHelper) {
        this.mongoHelper = mongoHelper;
    }
    /**
     * Service to fetch for announcements at the database
     * @returns An array with query result
     */
    getAnnouncements(queryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mongoHelper.connect();
            const filters = {};
            const announcementsData = yield announcements_1.Announcement.find({}, null, filters);
            console.log(announcementsData);
            return {
                status: "Success",
                message: "Query executed successfully!",
                data: { response: announcementsData },
            };
        });
    }
    /**
     * Service to create new announcement
     * @param bodyParams - Request body JSON formatted and with CreateAnnouncementDTO structure
     * @returns An array with created posts
     */
    postAnnouncement(bodyParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(bodyParams);
                yield this.mongoHelper.connect();
                const newAnnouncement = new announcements_1.Announcement(bodyParams);
                newAnnouncement.save();
                const response = {
                    status: "Success",
                    message: "Query executed successfully!",
                    data: { response: [bodyParams] },
                };
                return response;
            }
            catch (err) {
                console.error(`Error creating new announcement. ${err}`);
                return {
                    status: "",
                };
            }
        });
    }
    /**
     * Service to fetch for announcements tags
     * @returns An array with tags
     */
    getTags() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: "Success",
                message: "Query executed successfully!",
                data: { response: ["test announcement 1"] },
            };
        });
    }
}
exports.AnnouncementsService = AnnouncementsService;
