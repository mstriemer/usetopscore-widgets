import React, { PropTypes } from 'react';

export default class UpcomingGames extends React.Component {
  static propTypes = {
    games: PropTypes.array,
  }

  render() {
    const { games } = this.props;
    return (
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <div className="teams">{`${game.AwayTeam.name} @ ${game.HomeTeam.name}`}</div>
          </li>
        ))}
      </ul>
    );
  }
}
