import React, { Component } from 'react';
import { Container } from 'reactstrap';
import style from "./Layout.module.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
