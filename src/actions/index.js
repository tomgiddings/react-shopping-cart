export const UPDATE_CART = 'UPDATE_CART';

export function updateCart(cart) {
  return {
    type: UPDATE_CART,
    cart: cart
  };
};
