import Enviroment from "./config/Enviroment"
Enviroment

import App from "./App"

const app = new App()
app.start(process.env.PORT)