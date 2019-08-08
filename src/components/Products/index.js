import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import './Products.css';
import Cart from '../Cart';

class Products extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      products: [
        { id: 0, name: 'Bag of Chips', price: 1.99 },
        { id: 1, name: 'Portion of Fish', price: 4.49 },
        { id: 2, name: 'Chicken Burger', price: 2.99 },
        { id: 3, name: 'Soft Drink', price: 1.00 }
      ]
    };
  }

  render() {
  	return(
      <ul className="Products">
        {!!this.state.products && this.state.products.map((product, productIndex) => 
          <li key={this.state.products[productIndex].id}><span>{this.state.products[productIndex].name}</span><span><NumberFormat value={this.state.products[productIndex].price} displayType="text" thousandSeparator={true} prefix="£" decimalScale={2} /></span><Cart addCartButton="true" product={ { id: this.state.products[productIndex].id, name: this.state.products[productIndex].name, price: this.state.products[productIndex].price } } /></li>
        )}
      </ul>

  	);
  }
}
export default Products;
