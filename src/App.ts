import * as bodyParser from 'body-parser';
import * as controllers from './api/controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Connection } from "./config/Connection"

class App extends Server {

    private readonly SERVER_STARTED = 'Node server started on port: ';

    constructor() {
        super()
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        const connection = new Connection()
        this.setupControllers()
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }

    public start(port: string): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default App