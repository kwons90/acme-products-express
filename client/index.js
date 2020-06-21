import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Link, Route, Redirect } from 'react-router-dom';

const axios = require('axios');

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

const { API_URL } = process.env;

const nav = (API_URL) => {
  return (
    <nav className="nav">
      <Link to="/" className={API_URL === '/' ? 'selected' : ''}>
        Home
      </Link>
      <Link
        to="/products"
        className={API_URL === '/products' ? 'selected' : ''}
      >
        Products
      </Link>
      <Link
        to="/products/create"
        className={API_URL === '/products/create' ? 'selected' : ''}
      >
        Create A Product
      </Link>
    </nav>
  );
};

class CreateProduct extends Component {
  state = {
    productName: '',
  };

  post(name) {}

  render() {
    nav();
    return (
      <div>
        <input
          type="text"
          className="inputBar"
          value={this.state.productName}
          onChange={(e) => this.setState({ productName: e.target.value })}
        />
        <button
          type="submit"
          className="submitbutton"
          onClick={(e) => {
            e.preventDefault();
            const obj = { name: e.target.value };
            axios.post('http://localhost:3000/api/products', obj);
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

const productList = (products) => {
  console.log(products);
  return (
    <ul>
      {products.map((product) => {
        return (
          <div className="productContainer">
            <h3>{product.name}</h3>
            <button
              type="submit"
              onClick={() => {
                axios.delete(
                  `http://localhost:3000/api/products/${product.name}`
                );
              }}
            >
              Destroy
            </button>
          </div>
        );
      })}
    </ul>
  );
};

class App extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3000/api/products').then((res) => {
      this.setState({ products: res.data });
    });
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" render={() => nav()} />
        <Switch>
          <Route
            exact
            path="/products"
            render={() => productList(this.state.products)}
          />
          <Route
            exact
            path="/products/create"
            render={() => <CreateProduct />}
          />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
