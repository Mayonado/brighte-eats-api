import { Lead, User } from "../../model/datamodel"
import { UserInterface } from "./user.interface"
import { query } from "../../utils/database"

export default class UserService implements UserInterface {
  constructor() {}
  async create(user: User): Promise<User> {
    const qryString =
      "INSERT INTO users(name, email, mobile, postcode, service_type) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    const { name, email, mobile, postcode, service_type } = user
    const userParams = [name, email, mobile, postcode, service_type]
    const [insertedVote] = await query<User[]>(qryString, userParams)
    return insertedVote
  }

  async lead(): Promise<Lead> {
    const qryString =
      'SELECT service_type, COUNT(id) AS "totalNoOfInterests" FROM users GROUP by service_type ORDER BY "totalNoOfInterests" DESC LIMIT 1'
    const [lead] = await query<Lead[]>(qryString)

    return lead
  }

  async leads(): Promise<Lead[]> {
    const leads = await query<Lead[]>(
      'SELECT service_type, COUNT(id) AS "totalNoOfInterests" FROM users GROUP BY service_type ORDER BY "totalNoOfInterests" DESC'
    )
    return leads
  }
}
