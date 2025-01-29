export class CustomError extends Error {
  constructor(
    public message: string,
    public type: string,
    public title: string
  ) {
    super(message)
  }
}
