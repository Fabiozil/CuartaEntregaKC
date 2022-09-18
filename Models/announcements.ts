import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true }
);

announcementSchema.statics.list = (filters, skip, limit, fields, sort) => {
    const query = Announcement.find(filters);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
};

export const Announcement = mongoose.model("Announcement", announcementSchema);
