/**
 * 校验器
 */
export interface IValidator {
  (numberString: string): {
    numberValue: number
    validateMsg: string
  }
}

export const isNumberString = (s: string): boolean =>
  /^\s*-?\d+(\.\d+)?\s*$/.test(s)

export const defaultNumberValidator: IValidator = (
  numberString: string,
): {
  numberValue: number
  validateMsg: string
} => {
  const isNumber = isNumberString(numberString)
  const value = parseFloat(numberString)
  return {
    numberValue: value,
    validateMsg: isNumber && value > 0 ? '' : '请输入大于0的数值',
  }
}
