import { regExp } from './regExp'

export const isApplyRegExp = (value: string) => value.match(regExp.DEFAULT_TEXT)

export const isApplyDocumentId = (value: string) => value.match(regExp.NUMBER_ID)
