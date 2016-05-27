export default function api(state = {requests: 0}, action) {
  switch (action.type) {
    case 'SET_JWT':
      return {...state, token: action.payload.token};
    case 'API/LOADING':
      return {...state, loading: true};
    case 'API/DONE':
      return {...state, loading: false};
    default:
      return state;
  }
}
