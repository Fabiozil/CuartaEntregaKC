import { Announcement } from "../../Models/announcements";
import { CreateAnnouncementDTO } from "./DTO/announcement.dto";
import { MongoDBHelper } from "../Common/Helpers/mongodb";
import { ResponseDTO } from "../Common/DTO/ResponseDTO.dto";
import { LoggingService } from "../Common/Helpers/LoggingService.service";

export class AnnouncementsService {
    constructor(
        private readonly mongoHelper: MongoDBHelper,
        private readonly logger: LoggingService
    ) {}

    /**
     * Service to fetch for announcements at the database
     * @returns An array with query result
     */
    async getAnnouncements(queryParams, traceId) {
        this.logger.initialLog(traceId, "Get announcements");
        console.log(queryParams);
        await this.mongoHelper.connect();

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
        const announcementsData = await Announcement.list(
            filters,
            queryParams.skip,
            queryParams.limit,
            queryParams.fields,
            queryParams.sort
        );

        this.logger.finalLog(traceId, "Get announcements");
        return {
            status: "Success",
            message: "Query executed successfully!",
            data: {
                count: announcementsData.length,
                response: announcementsData,
            },
        };
    }

    /**
     * Service to create new announcement
     * @param bodyParams - Request body JSON formatted and with CreateAnnouncementDTO structure
     * @returns An array with created posts
     */
    async postAnnouncement(bodyParams: CreateAnnouncementDTO, traceId) {
        try {
            console.log(bodyParams);
            this.logger.initialLog(traceId, "Register creation");
            await this.mongoHelper.connect();
            const newAnnouncement = new Announcement({
                name: bodyParams.name,
                price: bodyParams.price,
                tags: bodyParams.tags,
                sell: bodyParams.sell,
                photo: bodyParams.photo,
            });
            const creationIntent = await newAnnouncement.save();
            console.log(creationIntent);
            this.logger.finalLog(traceId, "Register creation");
            const response: ResponseDTO = {
                status: "Success",
                message: "Query executed successfully!",
                data: { response: [bodyParams] },
            };
            return response;
        } catch (err) {
            this.logger.errorLog(
                traceId,
                `Error creating new announcement. ${err}`
            );
            return {
                status: "Error",
                message: `Error creating new announcement. ${err}`,
            };
        }
    }

    /**
     * Service to reset database
     * @param bodyParams - Parameters for the request
     * @returns A response indicating result
     */
    async resetDatabase(bodyParams, traceId) {
        if (bodyParams.confirmation !== "Yes") {
            return {
                status: "Success",
                message:
                    "If you want to reset database make sure to send a parameter confirmation with Yes value",
            };
        } else {
            this.logger.initialLog(traceId, "Resetting database");
            await this.mongoHelper.connect();
            var deleted = await Announcement.deleteMany();
            console.log(`Deleted ${deleted.deletedCount} announcements.`);

            // crear agentes iniciales
            var inserted = await Announcement.insertMany([
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
    }

    /**
     * Service to fetch for announcements tags
     * @returns An array with tags
     */
    async getTags(traceId) {
        this.logger.initialLog(traceId, "Get tags");
        await this.mongoHelper.connect();
        const tags = await Announcement.find().distinct("tags");
        this.logger.finalLog(traceId, "Get tags");
        return {
            status: "Success",
            message: "Query executed successfully!",
            data: { response: tags },
        };
    }
}
