import {
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCT_FAIL,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../Constants/productConstants";
import axios from "axios";

//Add Products
export const AddProductsAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const { data } = await axios.post("https://grocery-shop-backend-ihni.onrender.com/api/product/add", formData);
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAIL, error: error.response.data.message });
  }
};

//Get All Products
export const getAllProductsAction =
  (price = "0-1000", filterCategory, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
      const UrlLink = keyword 
        ? `https://grocery-shop-backend-ihni.onrender.com/api/product/getAllProducts?keyword=${keyword}`
        : filterCategory && price
        ? `https://grocery-shop-backend-ihni.onrender.com/api/product/getAllProducts?category=${filterCategory}&gte=${price.split("-")[0]}&lte=${price.split("-")[1]}`
        : "https://grocery-shop-backend-ihni.onrender.com/api/product/getAllProducts";
        
      const { data } = await axios.get(UrlLink);
      dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        error: error.response?.data?.message || "Failed to fetch products"
      });
    }
  };
  
  

export const deleteProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`https://grocery-shop-backend-ihni.onrender.com/api/product/delete/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, error: error.response.data.message });
  }
};

export const getSingleProductAction = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PRODUCT_REQUEST });
    const { data } = await axios.get(
      `https://grocery-shop-backend-ihni.onrender.com/api/product/getSingleProduct/${productId}`
    );
    dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PRODUCT_FAIL,
      error: error.response.data.message,
    });
  }
};

//Update Product
export const updateProductAction =
  (productId, updateFormData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const { data } = await axios.put(
        `https://grocery-shop-backend-ihni.onrender.com/api/product/update/${productId}`,
        updateFormData
      );
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      // console.log(error);
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        error: error.response.data.message,
      });
    }
  };

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
