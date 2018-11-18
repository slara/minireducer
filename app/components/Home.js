// @flow
import React, { Component } from 'react';
import { Card, Elevation, HTMLTable } from '@blueprintjs/core';
import { connect } from 'net';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      socket: connect(
        {
          // host: '10.0.0.5',
          host: 'localhost',
          port: 1028
        },
        () => this.initDevice()
      )
    });
  }

  initDevice() {
    const { socket } = this.state;
    console.log('connected to server');

    socket.write('@111SAC000\r\n');
    socket.write('@111MFW0\r\n');
    socket.write('@000SAC001\r\n');
    socket.write('@001GMI\r\n');
  }

  handleClick = data => e => {
    const { socket } = this.state;
    socket.write(data.toString());
    console.log('click!', data, e);
  };

  render() {
    return (
      <div className="content">
        <Card elevation={Elevation.ONE}>
          <HTMLTable interactive="true" striped="true">
            <thead>
              <tr>
                <th style={{ width: '100%' }}>Control Parameters</th>
                <th>Decimal Value</th>
                <th>HEX Value</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={this.handleClick(120000)}>
                <td>Rx Carrier Frequency MOD [Hz]</td>
                <td>1200000000</td>
                <td>47 86 BC 00</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Rx BB Gain MOD [dB]</td>
                <td>15</td>
                <td>XF</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Rx RF Gain MOD [dB]</td>
                <td>619</td>
                <td>0B 6B</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Rx Carrier Frequency SAT [Hz]</td>
                <td>1305000000</td>
                <td>4D C8 B8 40</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Rx BB Gain SAT [dB]</td>
                <td>15</td>
                <td>FX</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Rx RF Gain SAT [dB]</td>
                <td>3344</td>
                <td>0D 10</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Tx Carrier Frequency DEM [Hz]</td>
                <td>1305000000</td>
                <td>4D C8 B8 40</td>
              </tr>
              <tr onClick={this.handleClick}>
                <td>Tx Gain [dB]</td>
                <td>10</td>
                <td>0A</td>
              </tr>
            </tbody>
          </HTMLTable>
        </Card>
      </div>
    );
  }
}
