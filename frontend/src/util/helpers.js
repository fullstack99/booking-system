import {
	pipe, converge, find, nthArg, propEq, all, contains, toLower, split,
} from 'ramda'
import moment from 'moment'

export const formatDate = (value, format) =>
	value ? moment(value).format(format || 'DD/MM/YYYY HH:mm') : ''

export const findById = converge(
	find,
	[pipe(nthArg(0), propEq('id')), nthArg(1)]
)

export const searchInString = (string, { value }) => all(
	keyword => contains(toLower(keyword), toLower(string))
)(split(' ', value))

export const searchInArray = (string, { value }) => contains(string, value)

export const sortDecimal = (a, b) => (a - b)
