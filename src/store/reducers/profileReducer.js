const initState = {
  currentQuiz: "0"
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ITEMS": {
      return {
        ...state,
        items: action.items,
        achievements: action.achievements,
        username: action.username
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
