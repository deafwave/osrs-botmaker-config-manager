import { createJsonAccessors } from '../shared/accessors.js'
import { getProfileString, setProfileString } from './strings.js'

export const { getJson: getProfileJson, setJson: setProfileJson } = createJsonAccessors(getProfileString, setProfileString)
