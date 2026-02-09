import { createJsonAccessors } from '../shared/accessors.js'
import { getGroupRawValue, setGroupString } from './strings.js'

const jsonAccessors = createJsonAccessors(getGroupRawValue, setGroupString)

export const getGroupJson = jsonAccessors.getJson
export const setGroupJson = jsonAccessors.setJson
