import { createJsonAccessors } from '../shared/accessors.js'
import { getProfileRawValue, setProfileString } from './strings.js'

const jsonAccessors = createJsonAccessors(getProfileRawValue, setProfileString)

export const getProfileJson = jsonAccessors.getJson
export const setProfileJson = jsonAccessors.setJson
