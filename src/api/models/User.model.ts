import { Schema, model } from "mongoose"

const UserSchema: Schema = new Schema({
    id: Number,
    name: {
        type: String,
        minlength:[0],
        maxlength: [64],
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 1
    },
    pwd: {
        type: String,
        minlength: 8,
        maxlength: 64,
        required: true
    }
}, {timestamps: true})

export default model("User", UserSchema)