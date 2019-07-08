import express from "express"
import cors from "cors"
import * as bodyParser from "body-parser"
import "reflect-metadata"
import {useExpressServer} from "routing-controllers"
import {UserController} from "./src/Controller/UserController"

const port: any = process.env.PORT || 8080
const app: express.Application = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

useExpressServer(app, {
    controllers: [
        UserController
    ]
})

app.listen(port, () => {
    console.log("Running on http://localhost:" + port)
})