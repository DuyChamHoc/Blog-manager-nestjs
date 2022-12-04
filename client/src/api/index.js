import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).access_token
    }`;
  }
  return req;
});

export const fetchTodo = (id) => API.get(`/todo/${id}`);
export const fetchTodos = () => API.get(`/todo`);
export const fetchTodosBySearch = (searchDate) =>
  API.get(`todo/search?searchDate=${searchDate}`);
export const createTodo = (newTodo) => API.post(`/todo`, newTodo);
export const updateTodo = (id, updateTodo) =>
  API.patch(`/todo/${id}`, updateTodo);
export const updateStatus = (id, status) =>
  API.patch(`/todo/updateStatus/${id}`, status);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);

export const signIn = (formData) => API.post("/user/login", formData);
export const signUp = (formData) => API.post("/user/register", formData);
