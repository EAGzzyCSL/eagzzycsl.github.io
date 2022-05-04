import React, {
  useState,
  useImperativeHandle,
  PropsWithChildren,
  ForwardedRef,
  useRef,
} from 'react'

import CalculatorPanel from '../parts/CalculatorPanel'
import {
  ExpressionFiled,
  ExpressionResult,
  ExpressionContainer,
  IExpressionFiledHandler,
  OperatorParenthesis,
  OperatorPower,
  OperatorBinary,
  OperatorFraction,
} from '../parts/Expression'
import {
  IExpressionFC,
  IExpressionProps,
  IExpressionHandler,
  TFormula,
} from '../types/expression'
import { IHistoryItem, IHistoryItemContent } from '../types/history'

import { calDPI } from './functions'

const enum DPIFormulaField {
  widthPx = 'widthPx',
  heightPx = 'heightPx',
  diagonalInch = 'diagonalInch',
  dpi = 'dpi',
}

interface DPIFormula extends TFormula<DPIFormulaField> {
  [DPIFormulaField.widthPx]: string
  [DPIFormulaField.heightPx]: string
  [DPIFormulaField.diagonalInch]: string
  [DPIFormulaField.dpi]: string
}

const DPIFormulaLabel = {
  [DPIFormulaField.widthPx]: '长边像素',
  [DPIFormulaField.heightPx]: '短边像素',
  [DPIFormulaField.diagonalInch]: '对角线英寸',
  [DPIFormulaField.dpi]: '屏幕dpi',
}

const DPIExpression: IExpressionFC<DPIFormula> = (
  props: PropsWithChildren<IExpressionProps<DPIFormula>>,
  forwardedRef: ForwardedRef<IExpressionHandler<DPIFormula>>,
): JSX.Element => {
  const { onExecute } = props

  const [formula, setFormula] = useState<DPIFormula>({
    [DPIFormulaField.widthPx]: '',
    [DPIFormulaField.heightPx]: '',
    [DPIFormulaField.diagonalInch]: '',
    [DPIFormulaField.dpi]: '',
  })

  useImperativeHandle<
    IExpressionHandler<DPIFormula>,
    IExpressionHandler<DPIFormula>
  >(forwardedRef, () => ({
    setFormula: (formula: DPIFormula) => {
      setFormula(formula)
    },
  }))

  const handleEvaluate = (): void => {
    const { widthPx, heightPx, diagonalInch } = formula

    const newerFormulaInput = {
      ...formula,
      dpi: `${calDPI(
        parseInt(widthPx, 10),
        parseInt(heightPx, 10),
        parseInt(diagonalInch, 10),
      )}`,
    }

    setFormula(newerFormulaInput)
    onExecute(newerFormulaInput)
  }

  const widthPxFieldRef = useRef<IExpressionFiledHandler>(null)
  const heightPxFieldRef = useRef<IExpressionFiledHandler>(null)
  const diagonalInchFieldRef = useRef<IExpressionFiledHandler>(null)

  const signEnable = !!(
    widthPxFieldRef.current?.isValid() &&
    heightPxFieldRef.current?.isValid() &&
    diagonalInchFieldRef.current?.isValid()
  )

  return (
    <ExpressionContainer
      signEnable={signEnable}
      onEvaluate={handleEvaluate}
      result={
        <div>
          <ExpressionResult
            label={DPIFormulaLabel[DPIFormulaField.dpi]}
            result={formula.dpi}
          />
        </div>
      }
    >
      <OperatorFraction
        molecule={
          <OperatorPower power='½'>
            <OperatorParenthesis>
              <OperatorBinary
                left={
                  <OperatorPower power='2'>
                    <ExpressionFiled<DPIFormula>
                      myRef={widthPxFieldRef}
                      formula={formula}
                      setFormula={setFormula}
                      label={DPIFormulaLabel[DPIFormulaField.widthPx]}
                      fieldKey={DPIFormulaField.widthPx}
                    />
                  </OperatorPower>
                }
                operator='+'
                right={
                  <OperatorPower power='2'>
                    <ExpressionFiled<DPIFormula>
                      myRef={heightPxFieldRef}
                      formula={formula}
                      setFormula={setFormula}
                      label={DPIFormulaLabel[DPIFormulaField.heightPx]}
                      fieldKey={DPIFormulaField.heightPx}
                    />
                  </OperatorPower>
                }
              />
            </OperatorParenthesis>
          </OperatorPower>
        }
        denominator={
          <ExpressionFiled<DPIFormula>
            myRef={diagonalInchFieldRef}
            formula={formula}
            setFormula={setFormula}
            label={DPIFormulaLabel[DPIFormulaField.diagonalInch]}
            fieldKey={DPIFormulaField.diagonalInch}
          />
        }
      />
    </ExpressionContainer>
  )
}

const DPI = (): JSX.Element => (
  <CalculatorPanel<DPIFormula>
    ExpressionFC={DPIExpression}
    historyHead={[
      DPIFormulaLabel[DPIFormulaField.widthPx],
      DPIFormulaLabel[DPIFormulaField.heightPx],
      DPIFormulaLabel[DPIFormulaField.diagonalInch],
      DPIFormulaLabel[DPIFormulaField.dpi],
    ]}
    adaptor={{
      formula2HistoryItemContent: ({
        widthPx,
        heightPx,
        diagonalInch,
        dpi,
      }: DPIFormula): IHistoryItemContent => [
        `${widthPx}`,
        `${heightPx}`,
        `${diagonalInch}`,
        `${dpi}`,
      ],
      historyItem2formula: (historyItem: IHistoryItem): DPIFormula => ({
        widthPx: historyItem.content[0],
        heightPx: historyItem.content[1],
        diagonalInch: historyItem.content[2],
        dpi: historyItem.content[3],
      }),
    }}
  />
)

export default DPI
