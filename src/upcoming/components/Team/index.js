import React, { PropTypes } from 'react';

import './styles.scss';

export default class Team extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
  }

  render() {
    const { name, images } = this.props;
    const imageSize = 40;
    return (
      <div className="team">
        <img src={images[imageSize]} height={imageSize}width={imageSize} alt={name}
             className="team--logo" />
        <div className="team--name">{name}</div>
      </div>
    );
  }
}
