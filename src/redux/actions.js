import {
  CLEAR_DATA,
  DELETE_FOOD_FAIL,
  DELETE_FOOD_SUCCESS,
  DELETE_FOOD_UPDATE,
  GET_FOODS_DETAILS_FAILED,
  GET_FOODS_DETAILS_LOADING,
  GET_FOODS_DETAILS_SUCESS,
  ALL_FOODS_DETAILS_FAILED,
  ALL_FOODS_DETAILS_LOADING,
  ALL_FOODS_DETAILS_SUCESS,
  ADD_FOODS_FAILED,
  ADD_FOODS_LOADING,
  ADD_FOODS_SUCESS,
  UPDATE_FOOD_DETAILS_FAILED,
  UPDATE_FOOD_DETAILS_LOADING,
  UPDATE_FOOD_DETAILS_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_LOADING,
  USER_REGISTER_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_LOADING,
  LOAD_USER_SUCCESS,
  DLETED_USER_LOAING,
  DLETED_USER_SUCCESS,
  DLETED_USER_FAIL,
  GET_ALL_USER_LOADING,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_USER_BY_ID_LOADING,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAIL,
  GET_FOODS_BY_USERID_LOADING,
  GET_FOODS_BY_USERID_SUCCESS,
  SEND_FRIENDS_LOADING,
  SEND_FRIENDS_SUCCESS,
  SEND_FRIENDS_FAIL,
  SHOW_WARNING,
} from "./constants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  console.log("email,password", email, password);
  try {
    dispatch({ type: USER_LOGIN_LOADING });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: SHOW_WARNING, payload: "logged in successfully" });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message });
    dispatch({ type: SHOW_WARNING, payload: "logged in failed" });
  }
};

export const register = (name, email, password, limit) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_LOADING });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/register`,
      { name, email, password },
      config
    );

    console.log("data", data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_LOADING });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/me`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: LOAD_USER_FAIL, payload: err?.response?.data?.message });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/logout`,
      {},
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    if (data.success === true) {
      document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "token=token; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    }

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_DATA });
};

export const getAllFoods = (starting, ending) => async (dispatch) => {
  console.log("starting, ending", starting, ending);
  try {
    dispatch({ type: ALL_FOODS_DETAILS_LOADING });

    let url = `${process.env.REACT_APP_API_URL}/api/v1/foods`;

    if (starting && ending) {
      url = `${process.env.REACT_APP_API_URL}/api/v1/foods?createdAt[gte]=${starting}&createdAt[lte]=${ending}`;
    }

    const { data } = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: ALL_FOODS_DETAILS_SUCESS, payload: data });
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: ALL_FOODS_DETAILS_FAILED,
      payload: err.response.data.message,
    });
  }
};

export const getFoodDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FOODS_DETAILS_LOADING });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/foods/${id}`
    );

    dispatch({ type: GET_FOODS_DETAILS_SUCESS, payload: data.food });
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: GET_FOODS_DETAILS_FAILED,
      payload: err.response.data.message,
    });
  }
};

export const addFood = (name, calorie, price) => async (dispatch) => {
  try {
    dispatch({ type: ADD_FOODS_LOADING });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/foods`,
      { calorie, name, price },
      config
    );

    dispatch({ type: ADD_FOODS_SUCESS, payload: data });
    dispatch({ type: SHOW_WARNING, payload: "Item added Successfully" });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: SHOW_WARNING, payload: "Failed to add item" });
    dispatch({ type: ADD_FOODS_FAILED, payload: err.response.data.message });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DLETED_USER_LOAING });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/user/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: DLETED_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DLETED_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USER_LOADING });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/admin/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({ type: GET_ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: GET_ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_ID_LOADING });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/admin/user/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: GET_USER_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getFoodDetailsByUserId = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_FOODS_BY_USERID_LOADING });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/foods/admin/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: GET_FOODS_BY_USERID_SUCCESS, payload: data.foods });
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: GET_FOODS_DETAILS_FAILED,
      payload: err.response.data.message,
    });
  }
};

export const inviteFriends = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_FRIENDS_LOADING });

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/user/invite`,
      { name, email },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: SHOW_WARNING, payload: "invited successfully" });

    dispatch({ type: SEND_FRIENDS_SUCCESS, payload: data.success });
  } catch (err) {
    console.log("err", err);
    dispatch({ type: SHOW_WARNING, payload: "failed to invite" });
    dispatch({
      type: SEND_FRIENDS_FAIL,
      payload: err.response.data.message,
    });
  }
};
