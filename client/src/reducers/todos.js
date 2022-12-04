import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
} from "../contants/actionType";
export default (state = { todos: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, todos: action.payload };
    case FETCH_BY_SEARCH:
      return { ...state, todos: action.payload };
    case FETCH_POST:
      return { ...state, todos: action.payload };
    case CREATE:
      return { ...state, todos: [...state.todos, action.payload] };
    case UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    case DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    default:
      return state;
  }
};
