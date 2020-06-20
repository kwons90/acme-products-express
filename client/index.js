import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Link, Route, Redirect } from 'react-router-dom';

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

const { API_URL } = process.env;

const nav = (API_URL) => {
  return (
    <nav>
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

class App extends Component {
  state = { loaded: false, products: [] };

  componentDidMount() {
    fetch(`${API_URL}/api/health`)
      .then((res) => res.json())
      .then(() => {
        this.setState({ loaded: true });
      })
      .catch((e) => {
        console.error(`Failed to load initial health check.`, e);
      });

    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => this.setState({ products: data }));
  }

  render() {
    const { loaded, products } = this.state;
    console.log('products', products);
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" render = {() => nav}/>
          {/* <Route path="/products" render={() => Products(products)} /> */}
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
