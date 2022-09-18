"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const announcementSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    sell: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        min: [0, "Price cant be a negative value"],
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        enum: ["Work", "Lifestyle", "Motor", "Mobile"],
        required: true,
    },
}, { timestamps: true });
announcementSchema.statics.list = (filters, skip, limit, fields, sort) => {
    const query = exports.Announcement.find(filters);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
};
exports.Announcement = mongoose_1.default.model("Announcement", announcementSchema);
