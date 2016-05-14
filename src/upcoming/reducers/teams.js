export default function teams(state = [121562, 121226], { type, payload }) {
  if (type === 'ADD_TEAM') {
    return [...state, payload.team];
  } else if (type === 'REMOVE_TEAM') {
    return state.filter((team) => team !== payload.team);
  }
  return state;
}
