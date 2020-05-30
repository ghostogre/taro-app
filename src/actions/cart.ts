import {
  INCREASE,
  DECREASE,
  FETCH
} from '../constants/cart'

export const increase = (id) => ({
  type: INCREASE,
  id
})

export const decrease = (id) => ({
  type: DECREASE,
  id
})

export const fetchCart = data => ({
  type: FETCH,
  data
})
