import * as mongoose from "mongoose"

export class Connection {
    private readonly dbServer = 'mongodb://localhost:27017/'
    private readonly dbName = 'Eclysium'

    private readonly options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    /**
     ** ATLAS
     * `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBUSERPWD}@eclysiumcluster-twys4.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, this.options
     * 
     ** LOCALHOST
     *  this.dbServer + this.dbName, this.options
     */
    constructor() {
        mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBUSERPWD}@eclysiumcluster-twys4.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, this.options)
    }

    public async close () {
        mongoose.connection.close(() => {
            console.log('Mongoose instance disconnected')
        });
    }
}