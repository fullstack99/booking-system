import { has, when, identity } from 'ramda'
import Immutable from 'seamless-immutable'

const isImmutable = has('asMutable')

const convertToJs = state => state.asMutable({ deep: true })

const fromImmutable = when(isImmutable, convertToJs)

const toImmutable = raw => Immutable(raw)

export default {
  out: state => {
    state.mergeDeep = identity
    // console.log('oubound', toImmutable(state));
    return toImmutable(state)
  },
  in: raw => {
    // console.log('inbound', fromImmutable(raw));
    return fromImmutable(raw)
  }
}
