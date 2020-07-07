import { Schema, model } from "mongoose";

const FollowedSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    arrFollowed: {
        type: [String]
    }
});

export default model("Followed", FollowedSchema);