import React, { useState, useImperativeHandle, Ref, useRef } from 'react'

import cx from 'classnames'

import { TextField, Typography, Button } from '@/ui/material'

import theme from '../theme'
import { TFormula } from '../types/expression'
import { defaultNumberValidator } from '../utils/validate'

import styles from './Expression.module.scss'

/**
 * 表达式容器
 */
interface ExpressionContainerProps {
  children: JSX.Element
  signEnable: boolean
  onEvaluate: () => void
  result: JSX.Element
}

export const ExpressionContainer = (
  props: ExpressionContainerProps,
): JSX.Element => {
  const { children, signEnable, onEvaluate: onEvaluateClick, result } = props

  return (
    <section className={styles.expressionContainer}>
      <div className={styles.left}>{children}</div>
      <div className={styles.right}>
        <span className={cx(styles.execute)}>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            disabled={!signEnable}
            onClick={onEvaluateClick}
          >
            =
          </Button>
        </span>
        {result}
      </div>
    </section>
  )
}
/**
 * 表达式中的符号
 */
interface ExpressionSymbolProps {
  content: string
  sup?: boolean
  marginLeft?: boolean
  marginRight?: boolean
}

export const ExpressionSymbol = (props: ExpressionSymbolProps): JSX.Element => {
  const { content, sup, marginLeft, marginRight } = props
  return (
    <Typography
      component={sup ? 'sup' : 'span'}
      color='secondary'
      variant={sup ? 'body1' : 'h4'}
      className={cx(styles.expressionSymbol, {
        [styles.sup]: sup,
        [styles.marginLeft]: marginLeft,
        [styles.marginRight]: marginRight,
      })}
    >
      {content}
    </Typography>
  )
}

ExpressionSymbol.defaultProps = {
  sup: false,
  marginLeft: false,
  marginRight: false,
}

/**
 * 表达式中的数字字段
 */
export interface IExpressionFiledHandler {
  isValid: () => boolean
}

interface ExpressionFiledProps<Formula extends TFormula> {
  label: string
  fieldKey: keyof Formula
  formula: Formula
  setFormula: (f: Formula) => void
  validator?: (numberString: string) => {
    numberValue: number
    validateMsg: string
  }
  myRef: Ref<IExpressionFiledHandler>
}

export const ExpressionFiled = <Formula extends TFormula>(
  props: ExpressionFiledProps<Formula>,
): JSX.Element => {
  const { label, formula, fieldKey, setFormula, validator, myRef } = props

  const fieldValue = formula[fieldKey]

  const [validateInfo, setValidateInfo] = useState<{
    error: boolean
    helperText: string
  }>({
    error: false,
    helperText: '',
  })

  const isValid = useRef<boolean>(!!(fieldValue && !validateInfo.error))

  useImperativeHandle<IExpressionFiledHandler, IExpressionFiledHandler>(
    myRef,
    () => ({
      isValid: () => isValid.current,
    }),
  )

  const theValidator = validator || defaultNumberValidator

  const handleChange = (value: string): void => {
    const { validateMsg } = theValidator(value)
    setValidateInfo({
      error: !!validateMsg,
      helperText: validateMsg,
    })

    isValid.current = !!(value && !validateMsg)

    setFormula({
      ...formula,
      [fieldKey]: value,
    })
  }

  return (
    <div className={styles.expressionField}>
      <TextField
        error={validateInfo.error}
        helperText={validateInfo.helperText}
        variant='outlined'
        size='small'
        label={label}
        value={fieldValue}
        onChange={event => {
          handleChange(event.target.value)
        }}
      />
    </div>
  )
}

ExpressionFiled.defaultProps = {
  validator: defaultNumberValidator,
}

/**
 * 表达式的结果
 */

interface ExpressionResultProps {
  label: string
  result: string
}

export const ExpressionResult = (props: ExpressionResultProps): JSX.Element => {
  const { label, result } = props

  return (
    <div className={styles.expressionResult}>
      <TextField
        variant='outlined'
        size='small'
        label={label}
        value={result}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  )
}

/**
 * 表达式中的括号
 */
interface OperatorParenthesisProps {
  children: JSX.Element
}

export const OperatorParenthesis = (
  props: OperatorParenthesisProps,
): JSX.Element => {
  const { children } = props
  return (
    <div className={styles.operatorParenthesis}>
      <ExpressionSymbol marginRight content='(' />
      {children}
      <ExpressionSymbol marginLeft content=')' />
    </div>
  )
}

/**
 * 表达式中的立方
 */
interface OperatorPowerProps {
  children: JSX.Element
  power: string
}

export const OperatorPower = (props: OperatorPowerProps): JSX.Element => {
  const { children, power } = props
  return (
    <div className={styles.operatorPower}>
      {children}
      <ExpressionSymbol marginLeft content={power} sup />
    </div>
  )
}

/**
 * 表达式中的双目运算符
 */
interface OperatorBinaryProps {
  left: JSX.Element
  right: JSX.Element
  operator: string
}

export const OperatorBinary = (props: OperatorBinaryProps): JSX.Element => {
  const { left, operator, right } = props
  return (
    <div className={styles.operatorBinary}>
      {left}
      <ExpressionSymbol marginLeft marginRight content={operator} />
      {right}
    </div>
  )
}

/**
 * 表达式中的分式
 */
interface OperatorFractionProps {
  alignStart?: boolean
  molecule: JSX.Element
  denominator: JSX.Element
}

export const OperatorFraction = (props: OperatorFractionProps): JSX.Element => {
  const { molecule, denominator, alignStart } = props
  return (
    <div
      className={cx(styles.operatorFraction, {
        [styles.alignStart]: alignStart,
      })}
    >
      <div className={styles.molecule}>{molecule}</div>
      <div
        className={styles.divider}
        style={{
          borderBottom: `solid 2px ${theme.palette.secondary.main}`,
        }}
      />
      <div className={styles.denominator}>{denominator}</div>
    </div>
  )
}

OperatorFraction.defaultProps = {
  alignStart: false,
}
