export const calDPI = (
  widthPx: number,
  heightPx: number,
  diagonalInch: number,
): number =>
  Math.round((widthPx ** 2 + heightPx ** 2) ** (1 / 2) / diagonalInch)

/**
 * 保留固定小数位数的同时取上整
 */
export const ceilFixed = (num: number, n: number): string =>
  (Math.ceil(num * 10 ** n) / 10 ** n).toFixed(n)

/**
 * 获取BMI的计算数值
 */
export const calBMIValue = (weight: number, height: number): number =>
  weight / height ** 2

/** 根据BMI数值获取BMI区间 */
export const getBMIString = (bmiValue: number): string => {
  const bmiString = ceilFixed(bmiValue, 2)
  let type = '体重过低'
  const value = Number(bmiString)
  if (value >= 28.0) {
    type = '肥胖'
  } else if (value >= 24.0) {
    type = '超重'
  } else if (value >= 18.5) {
    type = '体重正常'
  }

  return `${bmiString}（${type}）`
}

/**
 * 获取BMI的计算数值
 */
export const calBMI = (weight: number, height: number): string =>
  getBMIString(calBMIValue(weight, height))
