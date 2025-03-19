import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import { MdClose, MdVerifiedUser } from "react-icons/md";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  userPasswordUpdateAction,
  clearError,
  loadUserAction,
  logOutUserAction,
} from "../Redux/Actions/userAction";
import { ImEnter } from "react-icons/im";
import { useEffect } from "react";
import { addToCartAction } from "../Redux/Actions/cartAction";
import { CLEAR_CART_ITEM } from "../Redux/Constants/cartConstants";
import Loader from "../Components/Loader/Loader";

const UpdatePassword = () => {
  const RegisterSuccess = useRef();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const TogglePass = (fieldName) => {
    const targetField = document.getElementById(fieldName);
    if (targetField) {
      targetField.type = targetField.type === "password" ? "text" : "password";
    } else {
      console.error(`Element with ID ${fieldName} not found`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handelPasswordResetSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch the action and get the result
    const result = await dispatch(userPasswordUpdateAction(formData));
    
    // Log the result for debugging
    console.log("Password update result:", result);
  };

  const { loading, error, message, success } = useSelector(
    (state) => state.PasswordUpdate
  );
  
  const closeRegisterPop = () => {
    if (RegisterSuccess.current) {
      RegisterSuccess.current.style.display = "none";
    }
  };

  useEffect(() => {
    document.title = `Update Password`;
    console.log("Password update state:", { loading, error, message, success });
    
    if (success) {
      console.log("Password update successful!");
      if (RegisterSuccess.current) {
        RegisterSuccess.current.style.display = "block";
      }
    }
  }, [success, message, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(logOutUserAction());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <>
      <Header />
      {loading ? <Loader LoadingName={"Updating Password"} /> : ""}
      <div className="login-container">
        <h1 className="Heading regHeading">
          Update <span>Password</span>
        </h1>
        {success ? (
          <div className="RegisterSuccess" ref={RegisterSuccess}>
            <div className="pop-card">
              <button id="close-btn" onClick={closeRegisterPop}>
                <MdClose />
              </button>
              <div className="successLoader">
                <h3 className="loader-text"></h3>
              </div>
              <h1>Password Updated Successfully!</h1>
              <p>You will be logged out shortly. Please login again with your new password.</p>
              <button onClick={() => Navigate("/Login")}>Login</button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="box">
          <div className="login-box">
            <form onSubmit={handelPasswordResetSubmit}>
              <div className="user-password">
                <VscEyeClosed />
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
                <i
                  className="showPassword"
                  onClick={() => {
                    TogglePass("currentPassword");
                  }}
                >
                  <VscEye />
                </i>
              </div>
              <div className="user-password">
                <VscEyeClosed />
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <i
                  className="showPassword"
                  onClick={() => {
                    TogglePass("newPassword");
                  }}
                >
                  <VscEye />
                </i>
              </div>
              <div className="user-password">
                <MdVerifiedUser />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <i
                  className="showPassword"
                  onClick={() => {
                    TogglePass("confirmPassword");
                  }}
                >
                  <VscEye />
                </i>
              </div>
              {error && (
                <div className="validError">
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="validSuccess">
                  <span>{message || "Password updated successfully!"}</span>
                </div>
              )}
              <div className="user-links"></div>
              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePassword;