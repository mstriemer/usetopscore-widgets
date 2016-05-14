export default function upcomingGames(state = [], { type, payload }) {
  if (type === 'UPCOMING_GAMES') {
    return payload.games;
  }
  return state;
}
