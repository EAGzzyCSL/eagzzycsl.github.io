import React, {
  useState,
  PropsWithChildren,
  ForwardedRef,
  useImperativeHandle,
  useRef,
} from 'react'

import BMIStandard from '../parts/BMIStandard'
import CalculatorPanel from '../parts/CalculatorPanel'
import {
  ExpressionFiled,
  ExpressionResult,
  ExpressionContainer,
  IExpressionFiledHandler,
  OperatorFraction,
  OperatorPower,
} from '../parts/Expression'
import {
  IExpressionFC,
  IExpressionProps,
  IExpressionHandler,
  TFormula,
} from '../types/expression'
import { IHistoryItem, IHistoryItemContent } from '../types/history'

import { calBMI } from './functions'

const enum BMIFormulaField {
  weight = 'weight',
  height = 'height',
  bmi = 'bmi',
}

interface BMIFormula extends TFormula<BMIFormulaField> {
  [BMIFormulaField.weight]: string
  [BMIFormulaField.height]: string
  [BMIFormulaField.bmi]: string
}

const BMIFormulaLabel = {
  [BMIFormulaField.weight]: '体重（kg）',
  [BMIFormulaField.height]: '身高（m）',
  [BMIFormulaField.bmi]: '体质指数（BMI）',
}

const BMIExpression: IExpressionFC<BMIFormula> = (
  props: PropsWithChildren<IExpressionProps<BMIFormula>>,
  forwardedRef: ForwardedRef<IExpressionHandler<BMIFormula>>,
): JSX.Element => {
  const { onExecute } = props

  const [formula, setFormula] = useState<BMIFormula>({
    [BMIFormulaField.weight]: '',
    [BMIFormulaField.height]: '',
    [BMIFormulaField.bmi]: '',
  })

  useImperativeHandle<
    IExpressionHandler<BMIFormula>,
    IExpressionHandler<BMIFormula>
  >(forwardedRef, () => ({
    setFormula: (formula: BMIFormula) => {
      setFormula(formula)
    },
  }))

  const handleEvaluate = (): void => {
    const { weight, height } = formula

    const newerFormula = {
      ...formula,
      bmi: `${calBMI(parseFloat(weight), parseFloat(height))}`,
    }

    setFormula(newerFormula)
    onExecute(newerFormula)
  }

  const weightFieldRef = useRef<IExpressionFiledHandler>(null)
  const heightFieldRef = useRef<IExpressionFiledHandler>(null)

  const signEnable = !!(
    weightFieldRef.current?.isValid() && heightFieldRef.current?.isValid()
  )

  return (
    <ExpressionContainer
      signEnable={signEnable}
      onEvaluate={handleEvaluate}
      result={
        <>
          <ExpressionResult
            label={BMIFormulaLabel[BMIFormulaField.bmi]}
            result={formula.bmi}
          />
          <BMIStandard />
        </>
      }
    >
      <OperatorFraction
        alignStart
        molecule={
          <ExpressionFiled<BMIFormula>
            myRef={weightFieldRef}
            formula={formula}
            setFormula={setFormula}
            label={BMIFormulaLabel[BMIFormulaField.weight]}
            fieldKey={BMIFormulaField.weight}
          />
        }
        denominator={
          <OperatorPower power='2'>
            <ExpressionFiled<BMIFormula>
              myRef={heightFieldRef}
              formula={formula}
              setFormula={setFormula}
              label={BMIFormulaLabel[BMIFormulaField.height]}
              fieldKey={BMIFormulaField.height}
            />
          </OperatorPower>
        }
      />
    </ExpressionContainer>
  )
}

const BMI = (): JSX.Element => (
  <CalculatorPanel<BMIFormula>
    ExpressionFC={BMIExpression}
    historyHead={[
      BMIFormulaLabel[BMIFormulaField.weight],
      BMIFormulaLabel[BMIFormulaField.height],
      BMIFormulaLabel[BMIFormulaField.bmi],
    ]}
    adaptor={{
      formula2HistoryItemContent: ({
        weight,
        height,
        bmi,
      }: BMIFormula): IHistoryItemContent => [
        `${weight}`,
        `${height}`,
        `${bmi}`,
      ],
      historyItem2formula: (historyItem: IHistoryItem): BMIFormula => ({
        [BMIFormulaField.weight]: historyItem.content[0],
        [BMIFormulaField.height]: historyItem.content[1],
        [BMIFormulaField.bmi]: historyItem.content[2],
      }),
    }}
  />
)

export default BMI
