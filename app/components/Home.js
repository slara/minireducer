// @flow
import React, { Component } from 'react';
import { Card, Elevation, HTMLTable } from '@blueprintjs/core';
import { connect } from 'net';
import commands from '../constants/commands.json';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
    this.commands = commands;
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
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.destroy();
  }

  initDevice() {
    const { socket } = this.state;
    console.log('connected to server', socket);

    socket.write('@111SAC000\r\n');
    socket.write('@111MFW0\r\n');
    socket.write('@000SAC001\r\n');
    socket.write('@001GMI\r\n');
  }

  handleClick(command) {
    const { socket } = this.state;
    socket.write(`${command.value.toString()}\r\n`);
    console.log('click!', socket);
  }

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
              {this.commands.map(command => (
                <tr
                  key={command.name}
                  onClick={() => this.handleClick(command)}
                >
                  <td>{command.name}</td>
                  <td>{command.value}</td>
                  <td>47 86 BC 00</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </Card>
      </div>
    );
  }
}
