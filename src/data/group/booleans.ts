import { createBooleanAccessors } from '../shared/accessors.js'
import { getGroupString, setGroupString } from './strings.js'

const booleanAccessors = createBooleanAccessors(getGroupString, setGroupString)

export const getGroupBoolean = booleanAccessors.getBoolean
export const setGroupBoolean = booleanAccessors.setBoolean
