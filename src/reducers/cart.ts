import {
  INCREASE,
  DECREASE,
  FETCH
} from '../constants/cart'

const CART_STATE = {
  ids: [],
  items: {}
}

export default function reducer (state = CART_STATE, action) {
  switch (action.type) {
    case FETCH:
      const ids: string[] = []
      const items = {}
      action.data.forEach((item: any) => {
        items[item.id] = item
        ids.push(item.id as string)
      })
      return {
        ids,
        items
      }
    case INCREASE:
      const newVal = state.items[action.id].count + 1
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            ...state.items[action.id],
            count: newVal
          }
        }
      }
    case DECREASE:
      return {
        ...state,
        items: {
          ...state.items,
          count: state.items[action.id].count - 1
        }
      }
    default:
      return state
  }
}
