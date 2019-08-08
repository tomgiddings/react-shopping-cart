import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pluralize from 'react-pluralize'
import NumberFormat from 'react-number-format';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCart } from '../../actions';

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setCart: updateCart
  }, dispatch);
};

class Cart extends Component {

  componentDidMount(props) {
    this.getCart();
  }

  getCart() {
    // If we don't have any items, check localstorage
    if(this.props.cart.items.length === 0) {
      var localStorageCart = localStorage.getItem('cart');
      if(localStorageCart) {
        this.props.setCart(JSON.parse(localStorageCart));
      }
    }
  }

  addToCart(product) {
    var currentCart = this.props.cart;
    var newItem = true;

    // Check cart to see if it's there first, if it is, add to the quantity
    for(var item in currentCart.items) {
      if(currentCart.items[item].name === product.name) {
        currentCart.items[item].quantity++;
        newItem = false;
      }
    }

    if(newItem) {
      currentCart.items.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: parseFloat(product.price),
      });
    }
    currentCart.count = currentCart.count+1;
    currentCart.total = parseFloat(currentCart.total) + parseFloat(product.price);

    // Update redux store
    this.props.setCart(currentCart);

    // Add to localstorage so we persist the cart
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  render() {
    const { ...props } = this.props;
    // This is the cart button you see next to each product
    if(props.addCartButton === 'true') {
      return(
        <span className="cart-add">
          <button onClick={() => this.addToCart(this.props.product) }>Add to Cart</button>
        </span>
      );
    }
    // Else we show the cart summary used in the header
    else {
      return (
        <div className='cart-box right'>
          You have <Pluralize singular="item" count={this.props.cart.count} zero={'nothing'} /> in your cart totalling <NumberFormat value={this.props.cart.total} displayType="text" thousandSeparator={true} prefix="£" decimalScale={2} />. <Link to={`/checkout`}>Checkout</Link>
        </div>
      );

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
