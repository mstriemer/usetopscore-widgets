import React from 'react';
import { connect } from 'react-redux';

import './index.scss';

class LoadingHeader extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
  }

  render() {
    const { loading } = this.props;
    return (
      <header className="LoadingHeader">
        {loading ? 'Loading...' : 'Upcoming Games'}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.api.loading,
  };
}

export default connect(mapStateToProps)(LoadingHeader);
