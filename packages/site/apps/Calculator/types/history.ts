export type IHistoryItemContent = string[]

export interface IHistoryItem {
  id: number
  content: IHistoryItemContent
}

export interface IHistoryAdaptor<FormulaField> {
  formula2HistoryItemContent: (
    formulaField: FormulaField,
  ) => IHistoryItemContent
  historyItem2formula: (historyItem: IHistoryItem) => FormulaField
}
