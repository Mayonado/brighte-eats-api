import { buildSchema } from "graphql"
import { createHandler } from "graphql-http/lib/use/express"
import { Lead, User } from "../model/datamodel"
import UserService from "../services/user/user.service"
import { UserInterface } from "../services/user/user.interface"
import { InternalServerError } from "../utils/custom-error"
import { ErrorMessage } from "../utils/constants"
import logger from "../utils/logger"
import { DatabaseError } from "pg"
import { UniqueConstraintError } from "sequelize"

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
    totalVotes: String
  }
`

const QueryMutation = `
  type Mutation {
    create(name: String!, mobile: String!, email: String!, postcode: String!, service_type: SERVICE_TYPE): User
  }

  type Query {
      lead: Lead
      leads: [Lead]
  }
`

class RootValue {
  constructor(private userService: UserInterface) {}
  async create(user: User): Promise<User> {
    try {
      const registeredUser = await this.userService.create(user)
      return registeredUser
    } catch (err: unknown) {
      if (err instanceof DatabaseError) {
        // handle duplicate email unique constraint
        if (err.code === "23505") {
          throw new UniqueConstraintError({
            message: ErrorMessage.DUPLICATE_EMAIL_ADDRESS,
          })
        }
      }
      logger.error(err)
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR)
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
const rootValue = new RootValue(userService)

export default createHandler({
  schema,
  rootValue,
})
