export interface UserInterface extends Document {
    id: Number;
    name: {
        type: String,
        maxlength: 1
    };
    email: String;
    role: String;
    pwd: String;
}