import React, { useState } from "react";
import "./AddProduct.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../../../Components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductsAction,
  clearError,
} from "../../../../Redux/Actions/productAction";
import { useEffect } from "react";
import { getAllCategoryAction } from "../../../../Redux/Actions/categoryAction";
import Loader from "../../../../Components/Loader/Loader";

const AddProduct = () => {
  const {
    loading,
    Categories,
    error: categoryError,
  } = useSelector((state) => state.getAllCategory);

  const {
    loading: productLoading,
    success,
    error: productError,
  } = useSelector((state) => {
    return state.addProduct;
  });

  const [productData, SetProductData] = useState({
    name: "",
    rate: "",
    category: "",
    stocks: "",
  });

  const dispatch = useDispatch("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [category, setCategory] = useState("");
  const [stocks, setStocks] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [validationError, setValidationError] = useState([]);
  const [weight, setWeight] = useState([]);

  const handelWeightChecked = (e) => {
    const isChecked = e.target.checked;
    const convertNumber = Number(e.target.value);
    const isExit = weight.includes(convertNumber);
    if (isChecked) {
      weight.push(convertNumber);
    } else {
      const index = weight.indexOf(convertNumber);
      weight.splice(index, 1);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handelImageChange = async (e) => {
    const file = e.target.files[0];
    try {
      const base64Image = await convertToBase64(file);
      setImage(base64Image);
      setPreviewImage(window.URL.createObjectURL(file));
    } catch (error) {
      console.error('Error converting image:', error);
    }
  };

  const handelAddProductSubmit = async (e) => {
    e.preventDefault();
    if (category === "") {
      validationError.push("Category:Select Category..!!");
    } else {
      const productData = {
        name,
        rate,
        stocks,
        category,
        kilogramOption: weight,
        image
      };
      dispatch(AddProductsAction(productData));
    }
  };

  if (productError) {
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }

  if (validationError.length !== 0) {
    setTimeout(() => {
      setValidationError([]);
    }, 5000);
  }

  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {loading || productLoading ? (
          <Loader LoadingName={"Loading Product"} />
        ) : (
          <>
            <div className="dashboard-sub-heading">
              <h1>Add Products</h1>
            </div>
            <div className="add-product-form-box">
              <form
                encType="multipart/form-data"
                onSubmit={(e) => {
                  handelAddProductSubmit(e);
                }}
              >
                <div className="product-name">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="product-rate">
                  <input
                    type="number"
                    placeholder="Rate /Kg"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    required
                  />
                </div>
                <div className="product-stocks">
                  <input
                    type="number"
                    placeholder="Stocks"
                    value={stocks}
                    onChange={(e) => setStocks(e.target.value)}
                    required
                  />
                </div>
                <span>Select Weight </span>
                <div className="product-weight">
                  <br />
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="0.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">0.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="1"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">1 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="1.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">1.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="2"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">2 KG</label>
                  </div>{" "}
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="2.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">2.5 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="3"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">3 KG</label>
                  </div>
                  <div className="weight-check">
                    <input
                      type="checkbox"
                      value="3.5"
                      onChange={(e) => {
                        handelWeightChecked(e);
                      }}
                    />
                    <label htmlFor="">3.5 KG</label>
                  </div>
                </div>
                <br />
                <div className="product-category">
                  <select
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    required
                  >
                    <option value="">Choose Category</option>
                    {Categories &&
                      Categories.map((category) => {
                        return (
                          <option value={category._id}>
                            {category.categoryName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <br />
                <br />
                <div className="product-image">
                  <input
                    type="file"
                    accept="images/*"
                    required
                    onChange={(e) => {
                      handelImageChange(e);
                    }}
                  />
                </div>
                <div className="product-preview">
                  {previewImage ? <img src={previewImage} alt="" /> : ""}
                </div>
                {productError &&
                  productError.map((error) => {
                    return (
                      <>
                        <div className="upload-error">
                          <h1>{error}</h1>
                        </div>
                      </>
                    );
                  })}
                {success ? (
                  <div className="upload-error">
                    <h1>Product Added..!!</h1>
                  </div>
                ) : (
                  ""
                )}
                <div className="add-product-form-btn">
                  <button type="submit">Add Product</button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AddProduct;