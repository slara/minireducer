// @flow
import React, { Component } from 'react';

import {
  Label,
  Button,
  Intent,
  Dialog,
  Classes,
  Card,
  Elevation,
  HTMLTable,
  FormGroup,
  NumericInput
} from '@blueprintjs/core';

import { connect } from 'net';
import commands from '../constants/commands.json';

export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dialogstate: false,
      selectedCommand: { value: 0, name: '' }
    };
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
    this.setState({
      dialogstate: true,
      selectedCommand: command
    });
  }

  sendCommand() {
    const { selectedCommand, value, socket } = this.state;
    socket.write(`${value.toString()}\r\n`);

    commands.forEach((command, i) => {
      if (command.name === selectedCommand.name) {
        commands[i] = selectedCommand;
      }
    });

    this.setState({
      dialogstate: false,
      selectedCommand: { value }
    });
  }

  handleClose() {
    this.setState({ dialogstate: false });
  }

  onInputChange = (_valueAsNumber, valueAsString) => {
    console.log(valueAsString);
    const { selectedCommand } = this.state;
    this.setState({
      value: valueAsString,
      selectedCommand: {
        name: selectedCommand.name,
        value: valueAsString
      }
    });
  };

  render() {
    const { dialogstate, selectedCommand } = this.state;

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
              {commands.map(command => (
                <tr
                  key={command.name}
                  onClick={() => this.handleClick(command)}
                >
                  <td>{command.name}</td>
                  <td>{command.value}</td>
                  <td>{(+command.value).toString(16).toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
          <Dialog
            isOpen={dialogstate}
            icon="info-sign"
            onClose={() => this.handleClose()}
            title="Command configuration"
          >
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label={selectedCommand.name} labelFor="text-input">
                <NumericInput
                  value={selectedCommand.value}
                  onValueChange={this.onInputChange}
                  large
                />
              </FormGroup>
              <Label>
                Hex: {(+selectedCommand.value).toString(16).toUpperCase()}
              </Label>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
              <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                <Button onClick={() => this.handleClose()}>Close</Button>
                <Button
                  intent={Intent.PRIMARY}
                  onClick={() => this.sendCommand()}
                >
                  Update Configuration
                </Button>
              </div>
            </div>
          </Dialog>
        </Card>
      </div>
    );
  }
}
