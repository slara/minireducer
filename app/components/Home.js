// @flow
import React, { Component } from 'react';
import { Card, Elevation, HTMLTable } from '@blueprintjs/core';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  handleClick = e => {
    console.log('click!', e.currentTarget);
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
              <tr onClick={this.handleClick}>
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
