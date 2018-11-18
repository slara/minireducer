// @flow
import React, { Component } from 'react';
import { Card, Elevation } from '@blueprintjs/core';

export default class Status extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <Card elevation={Elevation.ONE} />
      </div>
    );
  }
}
