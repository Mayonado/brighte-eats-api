import cors from "cors"
import express, { Router, Request, Response } from "express"
import helmet from "helmet"
import UserHandler from "./graphql/user.graphql"
import * as dotenv from "dotenv"

const router = Router()

dotenv.config()

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

router.get("/", (_: Request, res: Response) => {
  res.status(200).json({ status: "up" })
})

app.use(router)

// GraphQL route
app.all("/user", UserHandler)

export default app
