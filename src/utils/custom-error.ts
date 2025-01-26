import { StatusCodes } from "http-status-codes"

export class InternalServerError extends Error {
  constructor(public errorType: string) {
    super(errorType)
  }
}
