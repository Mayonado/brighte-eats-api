export class InternalServerError extends Error {
  constructor(public errorType: string) {
    super(errorType)
  }
}
