export default function me(state = null, { type, payload }) {
  if (type === 'SET_ME') {
    return payload.me;
  }
  return state;
}
