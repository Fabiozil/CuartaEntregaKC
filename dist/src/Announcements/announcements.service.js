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
const announcements_1 = require("../../Models/announcements");
class AnnouncementsService {
    constructor(mongoHelper, logger) {
        this.mongoHelper = mongoHelper;
        this.logger = logger;
    }
    /**
     * Service to fetch for announcements at the database
     * @returns An array with query result
     */
    getAnnouncements(queryParams, traceId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.initialLog(traceId, "Get announcements");
            console.log(queryParams);
            yield this.mongoHelper.connect();
            let filters = {};
            if (queryParams.tag) {
                filters["tags"] = { $in: [queryParams.tag] };
            }
            if (queryParams.minPrice) {
                filters["price"] = { $gt: queryParams.minPrice };
            }
            if (queryParams.maxPrice) {
                filters["price"] = { $lt: queryParams.maxPrice };
            }
            if (queryParams.limit) {
                filters["limit"] = queryParams.limit;
            }
            console.log(filters);
            const announcementsData = yield announcements_1.Announcement.list(filters, queryParams.skip, queryParams.limit, queryParams.fields, queryParams.sort);
            this.logger.finalLog(traceId, "Get announcements");
            return {
                status: "Success",
                message: "Query executed successfully!",
                data: {
                    count: announcementsData.length,
                    response: announcementsData,
                },
            };
        });
    }
    /**
     * Service to create new announcement
     * @param bodyParams - Request body JSON formatted and with CreateAnnouncementDTO structure
     * @returns An array with created posts
     */
    postAnnouncement(bodyParams, traceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(bodyParams);
                this.logger.initialLog(traceId, "Register creation");
                yield this.mongoHelper.connect();
                const newAnnouncement = new announcements_1.Announcement({
                    name: bodyParams.name,
                    price: bodyParams.price,
                    tags: bodyParams.tags,
                    sell: bodyParams.sell,
                    photo: bodyParams.photo,
                });
                const creationIntent = yield newAnnouncement.save();
                console.log(creationIntent);
                this.logger.finalLog(traceId, "Register creation");
                const response = {
                    status: "Success",
                    message: "Query executed successfully!",
                    data: { response: [bodyParams] },
                };
                return response;
            }
            catch (err) {
                this.logger.errorLog(traceId, `Error creating new announcement. ${err}`);
                return {
                    status: "Error",
                    message: `Error creating new announcement. ${err}`,
                };
            }
        });
    }
    /**
     * Service to reset database
     * @param bodyParams - Parameters for the request
     * @returns A response indicating result
     */
    resetDatabase(bodyParams, traceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bodyParams.confirmation !== "Yes") {
                return {
                    status: "Success",
                    message: "If you want to reset database make sure to send a parameter confirmation with Yes value",
                };
            }
            else {
                this.logger.initialLog(traceId, "Resetting database");
                yield this.mongoHelper.connect();
                var deleted = yield announcements_1.Announcement.deleteMany();
                console.log(`Deleted ${deleted.deletedCount} announcements.`);
                // crear agentes iniciales
                var inserted = yield announcements_1.Announcement.insertMany([
                    {
                        name: "Delicious Hamburger",
                        sell: true,
                        price: 10000,
                        tags: ["Lifestyle", "Work"],
                        photo: "DeliciousHamburger.jpg",
                    },
                    {
                        name: "Powerful Clock",
                        sell: false,
                        price: 4000000,
                        tags: ["Lifestyle", "Mobile"],
                        photo: "Omnitrix.png",
                    },
                ]);
                console.log(`Created ${inserted.length} announcements.`);
                this.logger.finalLog(traceId, "Resetting database");
            }
            return {
                status: "Success",
                message: "Query executed successfully!",
                data: {
                    deleted: deleted.deletedCount,
                    created: inserted.length,
                    response: [
                        {
                            name: "Delicious Hamburger",
                            sell: true,
                            price: 10000,
                            tags: ["Lifestyle", "Work"],
                            photo: "DeliciousHamburger.jpg",
                        },
                        {
                            name: "Powerful Clock",
                            sell: false,
                            price: 4000000,
                            tags: ["Lifestyle", "Mobile"],
                            photo: "Omnitrix.png",
                        },
                    ],
                },
            };
        });
    }
    /**
     * Service to fetch for announcements tags
     * @returns An array with tags
     */
    getTags(traceId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.initialLog(traceId, "Get tags");
            yield this.mongoHelper.connect();
            const tags = yield announcements_1.Announcement.find().distinct("tags");
            this.logger.finalLog(traceId, "Get tags");
            return {
                status: "Success",
                message: "Query executed successfully!",
                data: { response: tags },
            };
        });
    }
}
exports.AnnouncementsService = AnnouncementsService;
