import React, { PropTypes } from 'react';

import LoadingHeader from 'upcoming/containers/LoadingHeader';

import './App.scss';


export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props;
    return (
      <div className="upcoming-games">
        <LoadingHeader />
        {children}
      </div>
    );
  }
}
