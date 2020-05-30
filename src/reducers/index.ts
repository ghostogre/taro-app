import { combineReducers } from 'redux'
import counter from './counter'
import cart from './cart'

export default combineReducers({
  counter,
  cart
})
