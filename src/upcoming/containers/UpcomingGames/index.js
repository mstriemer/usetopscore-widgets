import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';

import { loadEntities } from 'core/actions';
import { upcomingGames } from 'core/api';
import { setUpcomingGames } from 'upcoming/actions';

class UpcomingGames extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    games: PropTypes.array,
  }

  render() {
    const { games = [] } = this.props;
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

function getGames(state) {
  return state.upcomingGames.map((id) => state.entities.games[id]);
}

function mapStateToProps(state) {
  return {
    games: getGames(state),
  };
}

function loadGamesIfNeeded({ store: { dispatch, getState } }) {
  const games = getGames(getState());
  if (games.length === 0) {
    return upcomingGames()
      .then(({ entities, result }) => {
        dispatch(loadEntities(entities));
        dispatch(setUpcomingGames(result.result));
      });
  }
  return Promise.resolve();
}

export default asyncConnect([{
  promise: loadGamesIfNeeded,
}])(connect(mapStateToProps)(UpcomingGames));
