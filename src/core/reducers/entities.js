export default function entities(state = {}, { payload }) {
  if (payload && payload.entities) {
    const newState = {...state};
    Object.keys(payload.entities).forEach((entityName) => {
      if (!newState[entityName]) {
        newState[entityName] = {};
      }
      Object.keys(payload.entities[entityName]).forEach((record) => {
        newState[entityName][record] = payload.entities[entityName][record];
      });
    });
    return newState;
  }
  return state;
}
