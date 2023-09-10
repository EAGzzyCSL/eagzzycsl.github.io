import React, { useState, useRef, forwardRef, useMemo } from 'react'

import {
  IExpressionFC,
  IExpressionProps,
  IExpressionHandler,
  TFormula,
} from '../types/expression'
import { IHistoryItem, IHistoryAdaptor } from '../types/history'

import styles from './CalculatorPanel.module.scss'
import History from './History'

interface ICalculatorPanelProps<Formula extends TFormula> {
  ExpressionFC: IExpressionFC<Formula>
  historyHead: string[]
  adaptor: IHistoryAdaptor<Formula>
}

const CalculatorPanel = <Formula extends TFormula>({
  ExpressionFC,
  historyHead,
  adaptor,
}: ICalculatorPanelProps<Formula>): JSX.Element => {
  const ForwardRefExpressionFC = useMemo(
    () =>
      forwardRef<IExpressionHandler<Formula>, IExpressionProps<Formula>>(
        ExpressionFC,
      ),
    [ExpressionFC],
  )

  const [historyList, setHistoryList] = useState<IHistoryItem[]>([])

  const [historyIndex, setHistoryIndex] = useState(1)

  const handleInsertHistoryItem = (formula: Formula): void => {
    setHistoryIndex(historyIndex + 1)
    historyList.push({
      id: historyIndex,
      content: adaptor.formula2HistoryItemContent(formula),
    })
  }

  const expressionRef = useRef<IExpressionHandler<Formula>>(null)

  const handleRemoveHistoryItem = (index: number): void => {
    setHistoryList([
      ...historyList.slice(0, index),
      ...historyList.slice(index + 1),
    ])
  }

  const handleRepealItemDelete = (
    itemOriginalIndex: number,
    historyItem: IHistoryItem,
  ): void => {
    setHistoryList([
      ...historyList.slice(0, itemOriginalIndex),
      historyItem,
      ...historyList.slice(itemOriginalIndex),
    ])
  }

  const handleReuseHistoryItem = (itemIndex: number): void => {
    expressionRef.current?.setFormula(
      adaptor.historyItem2formula(historyList[itemIndex]),
    )
  }

  return (
    <section className={styles.calculatorPanel}>
      <ForwardRefExpressionFC
        ref={expressionRef}
        onExecute={handleInsertHistoryItem}
      />
      <div className={styles.historyPart}>
        <History
          head={historyHead}
          list={historyList}
          onRemoveItem={handleRemoveHistoryItem}
          onReUseItem={itemIndex => {
            handleReuseHistoryItem(itemIndex)
          }}
          onRepealItemDelete={handleRepealItemDelete}
        />
      </div>
    </section>
  )
}

export default CalculatorPanel
