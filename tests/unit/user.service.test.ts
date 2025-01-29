// test create
// - should return inserted user object

// should return single object (lead)
// should return array of object (leads)

import UserService from "../../src/services/user/user.service"
import { UserInterface } from "../../src/services/user/user.interface"
import { query } from "../../src/utils/database"
import { Lead, SERVICE_TYPE, User } from "../../src/model/datamodel"
import serviceLeads from "../mocks/leads.json"
import fakeUser from "../mocks/user.json"
jest.mock("../../src/utils/database")

const leadData = serviceLeads as unknown as Lead[]
const mockedUser: User = {
  ...fakeUser,
  service_type: SERVICE_TYPE.PAYMENT,
}
const randomId = (Math.random() + 1).toString(36).substring(7)
const randomLeadIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0

describe("UserService", () => {
  const userService: UserInterface = new UserService()
  it("should return user object when insert to database succeeded", async () => {
    ;(query as jest.MockedFunction<typeof query<User[]>>).mockResolvedValueOnce(
      [{ ...mockedUser, id: randomId }]
    )

    const registeredUser = await userService.create(mockedUser)
    expect(registeredUser).toHaveProperty("id")
  })

  it("should return an object of lead", async () => {
    // mock the return of database
    ;(query as jest.MockedFunction<typeof query<Lead[]>>).mockResolvedValueOnce(
      [leadData[randomLeadIndex]]
    )

    const lead = await userService.lead()
    console.log(lead)
    expect(lead.service_type).toBeDefined()
    expect(lead.totalNoOfInterests).toBeDefined()
  })

  it("should return an object of lead", async () => {
    // mock the return of database
    ;(query as jest.MockedFunction<typeof query<Lead[]>>).mockResolvedValueOnce(
      leadData
    )

    const lead = await userService.leads()
    expect(lead).toBeInstanceOf(Array)
  })
})
