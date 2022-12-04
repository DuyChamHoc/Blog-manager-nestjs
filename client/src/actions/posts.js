import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../contants/actionType";
import * as api from "../api/index";
import { applyMiddleware } from "redux";

export const getTodos = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTodos();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const { data } = await api.createTodo(todo);
    dispatch({ type: CREATE, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await api.deleteTodo(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const { data } = await api.updateTodo(id, todo);
    dispatch({ type: UPDATE, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTodosBySearch = (search) => async (dispatch) => {
  try {
    const { data } = await api.fetchTodosBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = (id, status) => async (dispatch) => {
  try {
    const { data } = await api.updateStatus(id, status);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
