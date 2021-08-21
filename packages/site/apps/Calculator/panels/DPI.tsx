import { Button, TextField, Typography } from '@material-ui/core'
import cx from 'classnames'
import React, { useState, useRef } from 'react'

import History, { HistoryItem } from '../parts/History'

import styles from './DPI.module.scss'
import { calDPI } from './functions'

const validateAndParse = (
  numberString: string,
): {
  numberValue: number
  errorMsg: string
} => {
  const value = parseInt(numberString, 10)
  return {
    numberValue: value,
    errorMsg: value > 0 ? '' : '请输入大于0的数值',
  }
}

interface DPITextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  readOnly?: boolean
}

const DPITextField = ({
  value,
  label,
  onChange,
  readOnly,
}: DPITextFieldProps): JSX.Element => {
  const [validateInfo, setValidateInfo] = useState<{
    error: boolean
    helperText: string
  }>({
    error: false,
    helperText: '',
  })
  return (
    <span className={styles.inputFiled}>
      <TextField
        error={validateInfo.error}
        helperText={validateInfo.helperText}
        size='small'
        label={label}
        value={value}
        onChange={event => {
          onChange(event.target.value)
          const { errorMsg } = validateAndParse(event.target.value)
          setValidateInfo({
            error: !!errorMsg,
            helperText: errorMsg,
          })
        }}
        InputProps={{
          readOnly,
        }}
      />
    </span>
  )
}

DPITextField.defaultProps = {
  readOnly: false,
}

interface DPIFormulaInput {
  widthPx: string
  heightPx: string
  diagonalInch: string
  dpi: string
}

const DPIFormulaDescription: {
  label: string
  field: keyof DPIFormulaInput
}[] = [
  {
    label: '屏幕长边像素',
    field: 'widthPx',
  },
  {
    label: '屏幕短边像素',
    field: 'heightPx',
  },
  {
    label: '屏幕对角线英寸',
    field: 'diagonalInch',
  },
  {
    label: '屏幕dpi',
    field: 'dpi',
  },
]

interface ExpressionProps {
  formulaInput: DPIFormulaInput
  onChangeFormulaInput: (formulaInput: DPIFormulaInput) => void
  onExecuted: (formulaInput: DPIFormulaInput) => void
}

const ExpressionSymbol = ({
  content,
  sup,
}: {
  content: string
  sup?: boolean
}): JSX.Element => (
  <Typography
    component={sup ? 'sup' : 'span'}
    variant='inherit'
    color='secondary'
    className={styles.symbol}
  >
    {content}
  </Typography>
)

ExpressionSymbol.defaultProps = {
  sup: false,
}

const Expression = ({
  formulaInput,
  onChangeFormulaInput,
  onExecuted,
}: ExpressionProps): JSX.Element => {
  const handleDPITextFieldChange = (
    field: keyof DPIFormulaInput,
    value: string,
  ): void => {
    onChangeFormulaInput({
      ...formulaInput,
      [field]: value,
    })
  }

  const handleEvaluateClick = (): void => {
    const { widthPx, heightPx, diagonalInch } = formulaInput

    const newerFormulaInput = {
      ...formulaInput,
      dpi: `${calDPI(
        validateAndParse(widthPx).numberValue,
        validateAndParse(heightPx).numberValue,
        validateAndParse(diagonalInch).numberValue,
      )}`,
    }

    onChangeFormulaInput(newerFormulaInput)
    onExecuted(newerFormulaInput)
  }

  const createFormulaField = (
    indexInFormula: number,
    readOnly?: boolean,
  ): JSX.Element => (
    <DPITextField
      readOnly={readOnly}
      label={DPIFormulaDescription[indexInFormula].label}
      value={formulaInput[DPIFormulaDescription[indexInFormula].field]}
      onChange={value => {
        handleDPITextFieldChange(
          DPIFormulaDescription[indexInFormula].field,
          value,
        )
      }}
    />
  )

  const evaluateButtonDisabled = DPIFormulaDescription.slice(0, 3)
    .map(item => formulaInput[item.field])
    .map(value => validateAndParse(value).errorMsg)
    .some(errorMsg => errorMsg)

  return (
    <section className={styles.expression}>
      <ExpressionSymbol content='(' />
      {createFormulaField(0)}
      <ExpressionSymbol content='2' />
      <ExpressionSymbol content='+' />
      {createFormulaField(1)}
      <ExpressionSymbol content='2' sup />
      <ExpressionSymbol content=')' />
      <ExpressionSymbol content='½' sup />
      <ExpressionSymbol content='÷' />
      {createFormulaField(2)}
      <span className={cx(styles.symbol, styles.execute)}>
        <Button
          variant='contained'
          color='secondary'
          disabled={evaluateButtonDisabled}
          onClick={() => handleEvaluateClick()}
        >
          =
        </Button>
      </span>
      {createFormulaField(3, true)}
    </section>
  )
}

const formulaInput2HistoryItem = (
  id: number,
  { widthPx, heightPx, diagonalInch, dpi }: DPIFormulaInput,
): HistoryItem => ({
  id,
  content: [`${widthPx}`, `${heightPx}`, `${diagonalInch}`, `${dpi}`],
})

const historyItem2formulaInput = (
  historyItem: HistoryItem,
): DPIFormulaInput => ({
  widthPx: historyItem.content[0],
  heightPx: historyItem.content[1],
  diagonalInch: historyItem.content[2],
  dpi: historyItem.content[3],
})

const DPI = (): JSX.Element => {
  const [formulaInput, setFormulaInput] = useState<DPIFormulaInput>({
    widthPx: '',
    heightPx: '',
    diagonalInch: '',
    dpi: '',
  })

  const [history, setHistory] = useState<Record<number, HistoryItem>>({})

  const historyCounter = useRef(1)

  const handleOnExpressionExecuted = (
    newerFormulaInput: DPIFormulaInput,
  ): void => {
    setHistory({
      ...history,
      [historyCounter.current]: formulaInput2HistoryItem(
        historyCounter.current,
        newerFormulaInput,
      ),
    })
    historyCounter.current += 1
  }

  const handleOnRemoveHistoryItem = (id: number): void => {
    const historyBackup = { ...history }
    delete historyBackup[id]
    setHistory(historyBackup)
  }

  const handleOnInsertHistoryItem = (historyItem: HistoryItem): void => {
    setHistory({
      ...history,
      [historyItem.id]: historyItem,
    })
  }

  const handleOnUseHistoryItem = (id: number): void => {
    setFormulaInput(historyItem2formulaInput(history[id]))
  }

  return (
    <section className={styles.dpi}>
      <Expression
        formulaInput={formulaInput}
        onChangeFormulaInput={setFormulaInput}
        onExecuted={handleOnExpressionExecuted}
      />
      <History
        data={{
          head: DPIFormulaDescription.map(({ label }) => label),
          list: Object.values(history).sort((a, b) => b.id - a.id),
        }}
        onRemoveItem={handleOnRemoveHistoryItem}
        onReportItem={handleOnUseHistoryItem}
        onInsertItem={handleOnInsertHistoryItem}
      />
    </section>
  )
}

export default DPI
