import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel";
// import Carousel from 'react-bootstrap/Carousel';/
// import ReactBootstrapCarousel from "react-bootstrap-carousel";
// import "bootstrap/dist/css/bootstrap.css";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { ClearErrors, getProductDetails, newReview } from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import { Rating } from "@material-ui/lab";

import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loader/loader";
import MetaData from '../layout/MetaData';
import {useAlert} from "react-alert";
import { addItemsToCart } from '../../actions/cartAction';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  // product,
  const {  product,loading, error } = useSelector(
    (state) => state.productDetails
  );
  // console.log(product.images);
  
 
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  console.log("i am from productdetails.js");
  console.log(`${product.name}`);
  const options = {
 
    size:"large",
    value:product.ratings,
    readOnly:true,
    precision:0.5,
  };
  
  // const product = Product.find((p) => Number(p._id) === Number(id));
  console.log({id});
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  }
  const addToCartHandler = () => {
    // dispatch(addItemsToCart(match.params.id,quantity));
    alert.success("Item Added To Cart Successfully😃!")
    dispatch(addItemsToCart(id, quantity));
    console.log("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

 
  useEffect(() => {
    //  const { id } = useParams();
    if (error) {
        alert.error(error);
      console.log(`error arises in the file of product detailjs ${error}`);
      dispatch(ClearErrors())
    }
    if (reviewError) {
      console.log(`error arrieses ${reviewError}`);
      dispatch(ClearErrors());
    }
    if (success) {
      alert.success("reviews submitted succesffully 😃!");
      console.log("reviews submitted succesffully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error,alert, reviewError, success]);
  console.log(product);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage" 
                      
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            
              {/* <Carousel> */}
              {/* <Carousel>
              <Carousel.Item>
              {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel.Item>
              </Carousel> */}
               
              {/* </Carousel> */}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );

}

export default ProductDetails


































































   {/* <Carousel>
                {/* caoursel is used for slideshow inside the bunch of content */}
                {/* {product.images &&   //sabsase pahle hum kah rai agr product images hai to product images ko map kar do aur phir usme caoursel laga diya taki sa */}
                  {/* product.images.map((item, i) => ( */}
                    {/* img */}
                      {/* // className="CarouselImage" */}
                      {/* // key={item.url} */}
                      {/* // key={i.url} */}
                      {/* // src={item.url} */}
                      {/* // alt={`${i} Slide`} */}
                    {/* // /> */}
                  {/* ))} */}
              {/* // </Carousel> */} 
              {/* <h1>{product.images}</h1> */}

          //     <div>
          //     <div className="detailsBlock-1">
          //       <h2>{product.name}</h2>
                
          //       <p>Product # {product._id}</p>
          //     </div>
          //     <div className="detailsBlock-2">
          //       <Rating {...options} />
          //       {/* <ReactStars{...options} /> */}
          //      <span className="detailsBlock-2-span">
          //       ({product.numOfReviews} Reviews)
          //       </span>
          //     </div>
          //     <div className="detailsBlock-3">
          //       <h1>{`₹${product.price}`}</h1>
          //       <div className="detailsBlock-3-1">
          //         <div className="detailsBlock-3-1-1">
          //           <button onClick={decreaseQuantity}>-</button>
          //           <input readOnly type="number" value={quantity} />
          //           {/* reeadonly se kya hoga edit ka option hat jaga */}
                   
          //           <button onClick={increaseQuantity}>+</button>
                    
          //         </div>
          //         <button
          //           disabled={product.Stock < 1 ? true : false}
          //           onClick={addToCartHandler}
          //         >
          //           Add to Cart
          //         </button>
          //       </div>

          //       <p>
          //         Status:
          //         <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
          //           {product.Stock < 1 ? "OutOfStock" : "InStock"}
          //         </b>
          //       </p>
          //     </div>

          //     <div className="detailsBlock-4">
          //       Description : <p>{product.description}</p>
          //     </div>

          //     <button onClick={submitReviewToggle}
          //     className="submitReview">  
          //       Submit Review
          //     </button>
          //   </div>
          // </div>
          // <h3 className="reviewsHeading">REVIEWS</h3>
          // <Dialog
          //   aria-labelledby="simple-dialog-title"
          //   open={open}
          //   onClose={submitReviewToggle}
          // >
          //   <DialogTitle>Submit Review</DialogTitle>
          //   <DialogContent className="submitDialog">
          //     <Rating
          //       onChange={(e) => setRating(e.target.value)}
          //       value={rating}
          //       size="large"
          //     />

          //     <textarea
          //       className="submitDialogTextArea"
          //       cols="30"
          //       rows="5"
          //       value={comment}
          //       onChange={(e) => setComment(e.target.value)}
          //     ></textarea>
          //   </DialogContent>
          //   <DialogActions>
          //     <Button onClick={submitReviewToggle} color="secondary">
          //       Cancel
          //     </Button>
          //     <Button onClick={reviewSubmitHandler} color="primary">
          //       Submit
          //     </Button>
          //   </DialogActions>
          // </Dialog>
          // {product.reviews && product.reviews[0] ? (
          //   <div className="reviews">
          //     {product.reviews &&
          //       product.reviews.map((review) => (
          //         <ReviewCard key={review._id} review={review} />
          //       ))}
          //   </div>
          // ) : (
          //   <p className="noReviews">No Reviews Yet</p>
          // )}










































































// import React, { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   ClearErrors,
//   getProductDetails,
//   newReview,
// } from "../../actions/productAction";
// import Loader from "../layout/loader/loader";
// import ReviewCard from "./ReviewCard.js";
// import { useParams } from 'react-router-dom';
// // import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";
// import { addItemsToCart } from "../../actions/cartAction";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// const ProductDetails = ({ match }) => {
//   const dispatch = useDispatch();
//   // const alert = useAlert();

//   const { product, loading, error } = useSelector(
//     (state) => state.productDetails
//   );

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

//   const options = {
//     size: "large",
//     // value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   const id=useParams();
//   const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const increaseQuantity = () => {
//     if (product.Stock <= quantity) return;

//     const qty = quantity + 1;
//     setQuantity(qty);
//   };

//   const decreaseQuantity = () => {
//     if (1 >= quantity) return;

//     const qty = quantity - 1;
//     setQuantity(qty);
//   };

//   const addToCartHandler = () => {
//     dispatch(addItemsToCart(id, quantity));
//     // alert.success("Item Added To Cart");
//   };

//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("productId", id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       // alert.error(error);
//       dispatch(ClearErrors());
//     }

//     if (reviewError) {
//       // alert.error(reviewError);
//       dispatch(ClearErrors());
//     }

//     if (success) {
//       // alert.success("Review Submitted Successfully");
//       dispatch({ type: NEW_REVIEW_RESET });
//     }
//     dispatch(getProductDetails(match.params.id));
//   }, [dispatch, id, error, reviewError, success]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${product.name} -- ECOMMERCE`} />
//           <div className="ProductDetails">
//             <div>
//               <Carousel>
//                 {product.images &&
//                   product.images.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel>
//             </div>

//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{product.name}</h2>
//                 <p>Product # {product._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <Rating {...options} />
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({product.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${product.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={product.Stock < 1 ? true : false}
//                     onClick={addToCartHandler}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
//                     {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{product.description}</p>
//               </div>

//               <button onClick={submitReviewToggle} className="submitReview">
//                 Submit Review
//               </button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           <Dialog
//             aria-labelledby="simple-dialog-title"
//             open={open}
//             onClose={submitReviewToggle}
//           >
//             <DialogTitle>Submit Review</DialogTitle>
//             <DialogContent className="submitDialog">
//               <Rating
//                 onChange={(e) => setRating(e.target.value)}
//                 value={rating}
//                 size="large"
//               />

//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={submitReviewToggle} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={reviewSubmitHandler} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {product.reviews && product.reviews[0] ? (
//             <div className="reviews">
//               {product.reviews &&
//                 product.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ProductDetails;









































































