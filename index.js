import React from 'react';
import ReactDOM from'react-dom';
import Relay from 'react-relay';

class House extends React.Component {
  render() {
    let houses = this.props.store.houses;
    houses = houses.map((house) => {
        return (<div>
        <h1>{house.name}</h1>
        <h2>{house.words}</h2>
        <hr />
        </div>);
      });

    return (
      <div>
      {houses}
      </div>
    );
  }
};

House = Relay.createContainer(House, {
  fragments: {
    store: () => Relay.QL`
    fragment on HousesConnection {
        houses {
          name,
          words
        }
    }
    `
  },
});

class GOTRoute extends Relay.Route {
  static routeName = 'GOTRoute';
  static queries = {
    store: ((Component) => {
      // Component is our Item
      return Relay.QL`
      query root {
 		allHouses {
            ${Component.getFragment('store')}
        },
      }
    `}),
  };
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:5000/')
);

let mountNode = document.getElementById('container');
let rootComponent = <Relay.RootContainer
  Component={House}
  route={new GOTRoute()} />;
ReactDOM.render(rootComponent, mountNode);

// let mountNode = document.getElementById('container');
// let house = {
//   title : 'Stark',
//   words : "Winter is Comming"
// };
// let store = { house };
// let rootComponent = <House store={store} />;
// ReactDOM.render(rootComponent, mountNode);

