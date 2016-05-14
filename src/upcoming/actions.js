export function setUpcomingGames(games) {
  return {
    type: 'UPCOMING_GAMES',
    payload: {games},
  };
}
