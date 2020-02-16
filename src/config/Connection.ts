import * as mongoose from "mongoose"

export class Connection {
    private readonly dbServer = 'mongodb://localhost:27017/'
    private readonly dbName = 'ReRead'

    private readonly options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    /**
     *
     */
    constructor() {
        mongoose.connect(this.dbServer + this.dbName, this.options)
    }

    public async close () {
        mongoose.connection.close(() => {
            console.log('Mongoose instance disconnected')
        });
    }
}