import cors from "cors"
import express from "express"
import helmet from "helmet"
import { postBodyLimit } from "./utils/constants"
import UserHandler from "./graphql/user.graphql"
import * as dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json({ limit: postBodyLimit }))
app.use(express.urlencoded({ extended: false }))

// Create and use the GraphQL handler.
app.all("/user", UserHandler)

export default app
