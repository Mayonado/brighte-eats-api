// export const shouldCompress = (req: Request, _res: Response) => {
//     const compressionHeader = req.headers[acceptEncoding]
//     if (compressionHeader) {
//       const regExp = new RegExp(`\\b${compressionFormat}\\b`, "gi")
//       if (compressionHeader.toString().match(regExp) !== null) {
//         return true
//       }
//       throw new CustomError(
//         StatusCodes.NOT_ACCEPTABLE,
//         ErrorMessage.UNSUPPORTED_ACCEPT_ENCODING,
//         ErrorTypeKeys.FORBIDDEN
//       )
//     }
//     return false
//   }
