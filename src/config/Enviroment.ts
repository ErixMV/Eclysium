import * as dotenv from "dotenv"

class Enviroment {
    public dotenv
    private options: {
        path: "../../.env",
        encoding: "utf8",
        debug: true
    }
    constructor() {
        this.dotenv = dotenv.config(this.options);
    }
}

export default new Enviroment().dotenv