export default function api(state = {requests: 0}, action) {
  switch (action.type) {
    case 'SET_JWT':
      return {...state, token: action.payload.token};
    case 'API/LOADING':
      return {...state, requests: state.requests + 1};
    case 'API/DONE':
      return {...state, requests: state.requests - 1};
    default:
      return state;
  }
}
