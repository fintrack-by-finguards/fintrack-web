// eslint-disable-next-line
export default (state, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case "UPDATE_CONNECT":
      return {
        ...state,
        connect: action.payload,
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
  }
};
