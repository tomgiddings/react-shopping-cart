import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NumberFormat from 'react-number-format';
import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

import './Checkout.css';
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

class Checkout extends Component {
  getCart() {
    // If we don't have any items, check localstorage
    if(this.props.cart.items.length === 0) {
      var localStorageCart = localStorage.getItem('cart');
      if(localStorageCart) {
        this.props.setCart(JSON.parse(localStorageCart));
      }
    }
  }
  componentDidMount(props) {
    this.getCart();
  }
  updateCartItemQuantity(index, quantity) {
    var currentCart = this.props.cart;

    // Update the quantity if above zero, otherwise, delete the row
    if(quantity > 0) {
      currentCart.count = currentCart.count - (currentCart.items[index].quantity-quantity);
      currentCart.items[index].quantity = quantity;
    }
    else {
      currentCart.count = currentCart.count - currentCart.items[index].quantity;
      currentCart.items.splice(index, 1);
    }

    this.setState({ cart: currentCart });

    // loop through all the items and recalculate total
    currentCart.total = 0.00;

    for(var item in this.props.cart.items) {
      currentCart.total = currentCart.total + (this.props.cart.items[item].price * this.props.cart.items[item].quantity);
    }

    // Dispatch to the store
    this.props.setCart(currentCart);

    // Add to localstorage so we persist the cart
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
  render() {
    // Only show products in the cart if there are any
    if(this.props.cart.count > 0) {
      return(
        <div className="Cart">
          <table>
            <thead>
              <tr>
              <th>Quantity</th>
              <th>Description</th>
              <th>Price</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.items.map((product, index) =>
              <tr key={product.id}>
                <td><NumberFormat value={product.quantity} displayType="input" allowNegative={false} thousandSeparator={true} isAllowed={(values) => { if(values.value>0){return true}else{return false;} }} onValueChange={(values) => {
                this.updateCartItemQuantity(index, values.floatValue);
                }}/></td>
                <td>{product.name}</td>
                <td><NumberFormat value={product.price} displayType="text" thousandSeparator={true} prefix="£" decimalScale={2} /></td>
                <td><Link to="#" onClick={() => { this.updateCartItemQuantity(index, 0) }}>Remove</Link></td>
              </tr>
              )}
              <tr className="total">
                <td></td>
                <td>Total:</td>
                <td><NumberFormat value={this.props.cart.total} displayType="text" thousandSeparator={true} prefix="£" decimalScale={2} /></td>
              </tr>
            </tbody>
          </table>
          <p><Link to={`/`}>&#8249; Back to Products</Link></p> 
        </div>
      );
    }
    // Nothing in the cart, so hide it
    else {
      return(
        <div className="Cart">
          <h3>There are no items in your cart.</h3>
          <p><Link to={`/`}>&#8249; Back to Products</Link></p>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);