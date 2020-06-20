import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Redirect } from 'react-router-dom';;

const APP_STARTUP_TIME = 'app_startup_time';

console.time(APP_STARTUP_TIME);

const { API_URL } = process.env;

const Products = (products) => {
  return (
    <div className="productContainer">
      {products.map((product) => {
        return (
          <div key={product.id} className="product">
            <h3>{product.name.toUpperCase()}</h3>
            <p className="description">{product.description}</p>
            <p>{`$${product.suggestedPrice.toFixed(2)}`}</p>
          </div>
        );
      })}
    </div>
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
          <Route exact path="/">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100vw',
                alignItems: 'center',
                fontFamily: 'Roboto',
              }}
            >
              <img
                alt="Beaver"
                style={{
                  height: '250px',
                }}
                src="https://pbs.twimg.com/profile_images/2779323089/f1d2488fedff90047a32244dbc624e59_400x400.jpeg"
              />
              <h2>Beaver</h2>
              <span
                style={{
                  color: loaded ? 'green' : 'gray',
                  fontSize: '0.8em',
                }}
              >
                {loaded ? 'Connected!' : 'Connecting to API...'}
              </span>
            </div>
          </Route>
          <Route path="/products" render={() => Products(products)} />
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'), () => {
  console.timeEnd(APP_STARTUP_TIME);
});
