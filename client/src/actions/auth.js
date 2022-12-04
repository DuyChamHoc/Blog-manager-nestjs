import { AUTH, LOGOUT } from "../contants/actionType";
import * as api from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/todo");
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    await api.signUp(formData);
    navigate(-1);
    console.log("register success");
  } catch (error) {
    console.log(error.message);
  }
};
