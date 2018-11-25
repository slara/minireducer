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
  Position,
  Toaster,
  NumericInput
} from '@blueprintjs/core';

import { connect } from 'net';
import commands from '../constants/commands.json';

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.BOTTOM
});

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

  sendCommand() {
    const { socket, selectedCommand } = this.state;
    commands.forEach((command, i) => {
      if (command.name === selectedCommand.name) {
        commands[i] = selectedCommand;
      }
    });
    this.setState({
      dialogstate: false
    });
    const strcommands = this.makeCommands();
    strcommands.forEach(strcommand => {
      socket.write(strcommand.text);
      AppToaster.show({ message: strcommand.text });
    });
  }

  handleClose() {
    this.setState({ dialogstate: false });
  }

  handleClick(command) {
    this.setState({
      dialogstate: true,
      selectedCommand: command
    });
  }

  makeCommands() {
    const { selectedCommand } = this.state;
    const val = (+selectedCommand.value).toString(16).toUpperCase();
    const chunks = val.match(/.{1,2}/g).reverse();
    const out = [];
    for (let index = 0; index < val.length / 2; index += 1) {
      let chunk = '';
      if (selectedCommand.nibble === 'lo') {
        chunk = chunks[index].padStart(2, '0');
      } else {
        chunk = chunks[index].padEnd(2, '0');
      }
      const reg = (selectedCommand.reg + index).toString().padStart(2, '0');
      out.push({ text: `@001SRG${reg}${chunk}\r\n` });
    }
    return out;
  }

  onInputChange = (_valueAsNumber, valueAsString) => {
    const { selectedCommand } = this.state;
    this.setState({
      selectedCommand: {
        name: selectedCommand.name,
        reg: selectedCommand.reg,
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
