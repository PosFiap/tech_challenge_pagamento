import { CustomError, CustomErrorType } from '../../../utils'

export class NonEmptyString {
  constructor (readonly value: string) {
    if (!NonEmptyString.validate(value)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'O text não deve ser vazio')
    }
  }

  static validate (string: string) {
    if (string === null || string === undefined) return false
    if (string.length === 0) return false
    return true
  }
}
