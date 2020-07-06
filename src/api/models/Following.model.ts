import { Schema, model } from "mongoose";

const FollowingSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    arrFollowing: {
        type: [String]
    }
});

export default model("Following", FollowingSchema);