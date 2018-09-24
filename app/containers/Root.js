// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Navbar, Icon, Alignment, Menu, InputGroup } from '@blueprintjs/core';
import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  handleClick = () => {
    console.log('Menu click!');
  };

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div className="container">
          <header>
            <Navbar className="bp3-dark" elevation="Elevation.TWO">
              <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>TELCOSENIK mR-500L</Navbar.Heading>
                <Navbar.Divider />
              </Navbar.Group>
              <Navbar.Group align={Alignment.RIGHT}>
                <InputGroup
                  leftIcon={<Icon icon="filter" />}
                  placeholder="Filtrar"
                />
              </Navbar.Group>
            </Navbar>
          </header>

          <nav>
            <Menu large="true">
              <Menu.Item
                icon="cog"
                onClick={this.handleClick}
                text="Control Settings"
              />
              <Menu.Item
                icon="eye-open"
                onClick={this.handleClick}
                text="Status"
              />
              <Menu.Item
                icon="timeline-line-chart"
                onClick={this.handleClick}
                text="Monitor"
              />
            </Menu>
          </nav>

          <main>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </main>
        </div>
      </Provider>
    );
  }
}
