import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsAction } from "../../Redux/Actions/reviewsAction";
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { RiEmotionHappyLine } from "react-icons/ri";
import { Rating } from "@material-ui/lab";
import NotFoundCart from "../../Components/NotFoundCart/NotFoundCart";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { reviews = [], loading, error } = useSelector(
    (state) => state.getAllReviews
  );

  useEffect(() => {
    document.title = `Customer Reviews`;
    dispatch(getAllReviewsAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      {loading ? (
        <Loader LoadingName={"Getting Reviews"} />
      ) : (
        <>
          <div className="all-reviews-container">
            <h1 className="Heading">
              Customer <span>Reviews</span>
            </h1>
            {reviews && reviews.length > 0 ? (
              <div className="all-reviews-box">
                {reviews.map((review) => (
                  <div className="all-review-cart" key={review?._id}>
                    <i>
                      <RiEmotionHappyLine />
                    </i>
                    <h5>
                      {review?.user ? review.user?.firstName + " " + (review.user?.lastName || "") : "Anonymous"}
                    </h5>
                    <p>{review?.comment || "No comment provided"}</p>
                    <div className="all-reviews-stars">
                      <span>{review?.ratings || 0} ★</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NotFoundCart msg={"No Reviews Yet"} />
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AllReviews;