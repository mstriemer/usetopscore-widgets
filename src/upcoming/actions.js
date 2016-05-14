export function setUpcomingGames(games) {
  return {
    type: 'UPCOMING_GAMES',
    payload: {games},
  };
}

export function addTeam(team) {
  return {
    type: 'ADD_TEAM',
    payload: {team},
  };
}

export function removeTeam(team) {
  return {
    type: 'REMOVE_TEAM',
    payload: {team},
  };
}

export function setMe(me) {
  return {
    type: 'SET_ME',
    payload: {me},
  };
}
