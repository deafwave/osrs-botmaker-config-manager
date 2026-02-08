import { createJsonAccessors } from '../shared/accessors.js'
import { getConfigString, setConfigString } from './strings.js'

export const { getJson: getConfigJson, setJson: setConfigJson } = createJsonAccessors(getConfigString, setConfigString)
