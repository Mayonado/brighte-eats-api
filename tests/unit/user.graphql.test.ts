import { SERVICE_TYPE, User } from "../../src/model/datamodel"
import UserService from "../../src/services/user/user.service"
import { UserResolver } from "../../src/graphql/user.graphql"
import { DatabaseError } from "pg"
import logger from "../../src/utils/logger"
import fakeUser from "../mocks/user.json"
import { CustomError } from "../../src/utils/custom-error"

const mockedUser: User = {
  ...fakeUser,
  service_type: SERVICE_TYPE.PAYMENT,
}
const randomId = (Math.random() + 1).toString(36).substring(7)

jest.mock("../../src/services/user/user.service", () => {
  const mockedLead = {
    totalNoOfInterests: "12",
    service_type: SERVICE_TYPE.DELIVERY,
  }
  return jest.fn().mockImplementation(() => {
    return {
      create: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ ...mockedUser, id: randomId })
        ),
      lead: jest.fn().mockResolvedValueOnce(mockedLead),
      leads: jest.fn().mockResolvedValueOnce([mockedLead]),
    }
  })
})

describe("UserResolverQueriesAndMutations", () => {
  const userService: UserService = new UserService()
  const userResolver: UserResolver = new UserResolver(userService)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should call logger.info and return user object when user successfully inserted into database", async () => {
    const user = await userResolver.register(mockedUser)
    expect(user.id).toBeDefined()
  })

  it("should throw DatabaseError and call logger.error when encounters a database error", async () => {
    ;(
      userService.create as jest.MockedFunction<typeof userService.create>
    ).mockRejectedValueOnce(
      new DatabaseError(
        "Anything related to database error",
        expect.any(Number),
        "error"
      )
    )
    const errorLoggerSpy = jest.spyOn(logger, "error")
    try {
      await userResolver.register(mockedUser)
    } catch (error) {
      expect(error).toBeInstanceOf(DatabaseError)
      expect(errorLoggerSpy).toHaveBeenCalled()
    }
  })

  it("should throw CustomError and call logger.error when encounters a database unique constraint error", async () => {
    const databaseError = new DatabaseError(
      "Unique Constraint Error",
      expect.any(Number),
      "error"
    )
    databaseError.code = "23505"
    ;(
      userService.create as jest.MockedFunction<typeof userService.create>
    ).mockRejectedValueOnce(databaseError)
    const errorLoggerSpy = jest.spyOn(logger, "error")

    try {
      await userResolver.register(mockedUser)
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError)
      expect(errorLoggerSpy).toHaveBeenCalled()
    }
  })

  it("should return a lead object with service_type and totalNoOfInterests", async () => {
    const leading = await userResolver.lead()
    expect(leading).toMatchObject({
      totalNoOfInterests: "12",
      service_type: SERVICE_TYPE.DELIVERY,
    })
  })

  it("should return a list of lead object", async () => {
    const leadings = await userResolver.leads()
    expect(leadings).toMatchObject([
      { totalNoOfInterests: "12", service_type: SERVICE_TYPE.DELIVERY },
    ])
  })
})
