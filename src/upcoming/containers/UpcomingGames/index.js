import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { loadEntities } from 'core/actions';
import { loadMe, upcomingGames } from 'core/api';
import { setMe, setUpcomingGames } from 'upcoming/actions';
import Team from 'upcoming/components/Team';

import './styles.scss';

function formatTime(game) {
  return moment(`${game.start_date} ${game.start_time}`).calendar(null, {
    sameElse: 'dddd, MMM Do \\at h:mm A',
  });
}

function getGames(state) {
  return state.upcomingGames.map((id) => state.entities.games[id]);
}

function getUser(me, dispatch) {
  if (me) {
    return Promise.resolve(me);
  }
  return loadMe()
    .then(({ result }) => {
      dispatch(setMe(result.result[0]));
      return result.result[0];
    });
}

class UpcomingGames extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    games: PropTypes.array,
    me: PropTypes.number,
  }

  componentDidMount() {
    const { dispatch, games, me } = this.props;
    if (games.length === 0) {
      getUser(me, dispatch)
        .then((user) => upcomingGames({user}))
        .then(({ entities, result }) => {
          dispatch(loadEntities(entities));
          dispatch(setUpcomingGames(result.result));
        });
    }
  }

  render() {
    const { games = [] } = this.props;
    return (
        <ul>
        {games.map((game, i) => (
          <li key={game.id} className={i % 2 !== 0 ? 'odd' : ''}>
            <div className="game">
              <div className="game--info">
                <div className="game--field">
                <a href={`https://mods.usetopscore.com/f/${game.Field.slug}`}>{game.Field.name}</a>
                {' '}
                #{game.field_number}
                </div>
                <div className="game--time">{formatTime(game)}</div>
              </div>
              <div className="game--teams">
                <Team {...game.AwayTeam} />
                <span>@</span>
                <Team {...game.HomeTeam} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    me: state.me,
    games: getGames(state),
  };
}

export default connect(mapStateToProps)(UpcomingGames);
