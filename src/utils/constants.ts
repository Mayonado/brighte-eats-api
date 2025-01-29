export const enum ErrorTypeKeys {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNIQUE_CONSTRAINT_ERROR = "UNIQUE_CONSTRAINT_ERROR",
}

interface ErrorType {
  type: string
  title: string
}

export const ErrorTypes: Record<ErrorTypeKeys, ErrorType> = {
  [ErrorTypeKeys.INTERNAL_SERVER_ERROR]: {
    type: "internal-server-error",
    title: "Internal Server Error",
  },
  [ErrorTypeKeys.UNIQUE_CONSTRAINT_ERROR]: {
    type: "unique-constraint-error",
    title: "Unique Constraint Error",
  },
}

export const enum ErrorMessage {
  INTERNAL_SERVER_ERROR = "Something went wrong with this request.",
  UNIQUE_CONSTRAINT_ERROR = "Unable to register. Please ensure your email is unique.",
  CREATE_USER_ERROR = "Error encountered while inserting the user.",
}
