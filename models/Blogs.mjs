import mongoose from "mongoose";

// Title, Description, Blog Category(You can make this as static array),
// Created at(Date), Status(Pending, Approved, Rejected)

const BlogSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    title: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    status: {
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now()
    }
});

export const Blog = mongoose.model('Blog', BlogSchema);