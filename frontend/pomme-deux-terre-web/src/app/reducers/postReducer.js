const postReducer = (
  state = {
    post: []
  },
  action
) => {
  switch (action.type) {
    case "SET_POST":
      return {
        ...state,
        post: action.payload
      };
    case "CHANGE_POST":
      return {
        ...state,
        post: action.payload
      };
    default:
      return { ...state };
  }
};
export default postReducer;
