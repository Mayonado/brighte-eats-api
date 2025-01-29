import cors from "cors"
import express from "express"
import helmet from "helmet"
import UserHandler from "./graphql/user.graphql"
import * as dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// GraphQL route
app.all("/user", UserHandler)

export default app
