import update from 'immutability-helper';
import { UPDATE_CART } from '../actions';

const initialState = { 
  items: [],
  total: 0.00,
  count: 0,
  random: Math.random()
}

export default function cart (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      let updatedState = update(state, {
        items: {$set: action.cart.items},
        total: {$set: action.cart.total},
        count: {$set: action.cart.count},
        random: {$set: Math.random()}
      });
      return updatedState;
    default:
      return state;
  }
}
