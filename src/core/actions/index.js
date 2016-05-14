export function setJWT(token) {
  return {
    type: 'SET_JWT',
    payload: {token},
  };
}

export function loadEntities(entities) {
  return {
    type: 'LOAD_ENTITIES',
    payload: {entities},
  };
}
