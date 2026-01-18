import { buildSchema } from "graphql"
import { createHandler } from "graphql-http/lib/use/express"
import { Lead, User } from "../model/datamodel"
import UserService from "../services/user/user.service"
import { UserInterface } from "../services/user/user.interface"
import { CustomError } from "../utils/custom-error"
import { ErrorMessage, ErrorTypeKeys, ErrorTypes } from "../utils/constants"
import logger from "../utils/logger"
import { DatabaseError } from "pg"

const Types = `
  enum SERVICE_TYPE {
    DELIVERY
    PICKUP
    PAYMENT
  }

  type User {
    id: ID!
    name: String
    email: String
    postcode: String
    service_type: SERVICE_TYPE
  }

  type Lead {
    service_type: SERVICE_TYPE
    totalNoOfInterests: String
  }
`

const QueryMutation = `
  type Mutation {
    register(name: String!, mobile: String!, email: String!, postcode: String!, service_type: SERVICE_TYPE): User
  }

  type Query {
      lead: Lead
      leads: [Lead]
  }
`

export class UserResolver {
  constructor(private userService: UserInterface) {}
  async register(user: User): Promise<User> {
    try {
      const registeredUser = await this.userService.create(user)
      return registeredUser
    } catch (error: unknown) {
      logger.error(error)
      if (error instanceof DatabaseError) {
        if (error.code === "23505") {
          throw new CustomError(
            ErrorMessage.UNIQUE_CONSTRAINT_ERROR,
            ErrorTypes[ErrorTypeKeys.UNIQUE_CONSTRAINT_ERROR].type,
            ErrorTypes[ErrorTypeKeys.UNIQUE_CONSTRAINT_ERROR].title
          )
        }
      }

      throw error
    }
  }

  async lead(): Promise<Lead> {
    const lead = await this.userService.lead()
    return lead
  }

  async leads(): Promise<Lead[]> {
    const lead = await this.userService.leads()
    return lead
  }
}

const mergedSchema: string = [Types, QueryMutation].join("\n")
const schema = buildSchema(mergedSchema)

// inject dependencies
const userService = new UserService()
const rootValue = new UserResolver(userService)

export default createHandler({
  schema,
  rootValue,
})
