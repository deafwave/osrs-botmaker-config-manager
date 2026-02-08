import { createJsonAccessors } from '../shared/index.js'
import { getConfigString, setConfigString } from './strings.js'

export const { getJson: getConfigJson, setJson: setConfigJson } = createJsonAccessors(getConfigString, setConfigString)
