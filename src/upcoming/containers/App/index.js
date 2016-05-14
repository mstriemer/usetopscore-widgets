import React, { PropTypes } from 'react';

import './App.scss';


export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <div className="upcoming-games">
        {children}
      </div>
    );
  }
}
