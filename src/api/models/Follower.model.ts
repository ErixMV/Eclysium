import { Schema, model } from "mongoose";

const FollowerSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    arrFollowers: {
        type: [String]
    }
});

export default model("Follower", FollowerSchema);