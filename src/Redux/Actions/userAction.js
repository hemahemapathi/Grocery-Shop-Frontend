import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  CLEAR_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  LOAD_LOGIN_USER_REQUEST,
  LOAD_LOGIN_USER_FAIL,
  LOAD_LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  SEND_PASSWORD_REST_EMAIL_REQUEST,
  SEND_PASSWORD_REST_EMAIL_SUCCESS,
  SEND_PASSWORD_REST_EMAIL_FAIL,
  USER_PASSWORD_REST_REQUEST,
  USER_PASSWORD_REST_SUCCESS,
  USER_PASSWORD_REST_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
} from "../Constants/userConstants";

import axios from "axios";

export const userRegisterAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post("https://grocery-shop-backend-ihni.onrender.com/api/user/register", userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, error: error.response.data.message });
  }
};

export const userLoginAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("https://grocery-shop-backend-ihni.onrender.com/api/user/login", userData);
    localStorage.setItem('token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, error: error.response.data.message });
  }
};

export const loadUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_LOGIN_USER_REQUEST });
    const token = localStorage.getItem('token');
    const { data } = await axios.get("https://grocery-shop-backend-ihni.onrender.com/api/user/getloggeduser", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({
      type: LOAD_LOGIN_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_LOGIN_USER_FAIL,
      error: error.response.data.message,
    });
  }
};

export const logOutUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const token = localStorage.getItem('token');
    const { data } = await axios.get("https://grocery-shop-backend-ihni.onrender.com/api/user/logOut", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, error: error.response.data.message });
  }
};

export const userPasswordUpdateAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });
    
    // Log what's being sent to help debug
    console.log("Password update data being sent:", userData);
    
    const token = localStorage.getItem('token');
    const { data } = await axios.put("https://grocery-shop-backend-ihni.onrender.com/api/user/changePassword", userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log("Password update response:", data);
    dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS, payload: data });
    return { success: true, message: data.message };

  } catch (error) {
    console.error("Password update error:", error.response?.data || error.message);
    
    const errorMessage = error.response?.data?.message || "Failed to update password";
    dispatch({
      type: USER_PASSWORD_UPDATE_FAIL,
      error: errorMessage,
    });
    return { success: false, message: errorMessage };
  }
};




export const restPasswordSendEmailAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_PASSWORD_REST_EMAIL_REQUEST });
    const { data } = await axios.post("https://grocery-shop-backend-ihni.onrender.com/api/user/send-reset-password-email", {
      email,
    });
    dispatch({ type: SEND_PASSWORD_REST_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEND_PASSWORD_REST_EMAIL_FAIL,
      error: error.response.data.message,
    });
  }
};

export const restPasswordAction =
  (id, token, password, confirm_password) => async (dispatch) => {
    try {
      dispatch({ type: USER_PASSWORD_REST_REQUEST });
      const { data } = await axios.post(
        `https://grocery-shop-backend-ihni.onrender.com/api/user/reset-password/${id}/${token}`,
        {
          password,
          confirm_password,
        }
      );
      dispatch({ type: USER_PASSWORD_REST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_PASSWORD_REST_FAIL,
        error: error.response.data.message,
      });
    }
  };

export const getAllUsersAdminAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });
    const token = localStorage.getItem('token');
    const { data } = await axios.get("https://grocery-shop-backend-ihni.onrender.com/api/user/admin/user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      error: error.response.data.message,
    });
  }
};

export const deleteUserAdminAction = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const token = localStorage.getItem('token');
    const { data } = await axios.delete(`https://grocery-shop-backend-ihni.onrender.com/api/user/admin/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, error: error.response.data.message });
  }
};

export const adminUpdateUserAction = (userId, UserRole) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_ROLE_REQUEST });
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`https://grocery-shop-backend-ihni.onrender.com/api/user/admin/user/${userId}`, {
      UserRole,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      error: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
