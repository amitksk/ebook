import mongoose, {Schema} from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            required: true,
        },
        // authorId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User",
        //     required: true,
        // },
        coverImage: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            requied: true,
        },
        genre: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
