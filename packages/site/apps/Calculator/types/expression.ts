import { ForwardRefRenderFunction } from 'react'

export type TFormula<Keys extends string = never> = Record<Keys, string>

/**
 * 抽象的表达式组件定义
 */
export interface IExpressionProps<Formula extends TFormula> {
  onExecute: (formula: Formula) => void
}
export interface IExpressionHandler<Formula> {
  setFormula: (formula: Formula) => void
}

export type IExpressionFC<Formula extends TFormula> = ForwardRefRenderFunction<
  IExpressionHandler<Formula>,
  IExpressionProps<Formula>
>
