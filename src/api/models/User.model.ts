import { Schema, Document, model } from "mongoose"
import { UserInterface } from "./interfaces/User.interface"


const UserSchema: Schema = new Schema({
    id: Number,
    name: {
        type: String,
        minlength:[0],
        maxlength: [9]
    },
    email: String,
    role: {
        type: String,
        required: true
    },
    pwd: String
}, {timestamps: true})

export default model("User", UserSchema)