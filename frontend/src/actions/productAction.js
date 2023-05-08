// import axios from "axios";
// import {
//   ALL_PRODUCT_FAIL,
//   ALL_PRODUCT_REQUEST,
//   ALL_PRODUCT_SUCCESS,
//   ADMIN_PRODUCT_REQUEST,
//   ADMIN_PRODUCT_SUCCESS,
//   ADMIN_PRODUCT_FAIL,
//   PRODUCT_DETAILS_REQUEST,
//   PRODUCT_DETAILS_SUCCESS,
//   PRODUCT_DETAILS_FAIL,
//   UPDATE_PRODUCT_REQUEST,
//   UPDATE_PRODUCT_SUCCESS,
//   UPDATE_PRODUCT_FAIL,
//   NEW_PRODUCT_REQUEST,
//   NEW_PRODUCT_SUCCESS,
//   NEW_PRODUCT_FAIL,
//   DELETE_PRODUCT_REQUEST,
//   DELETE_PRODUCT_SUCCESS,
//   DELETE_PRODUCT_FAIL,
//   NEW_REVIEW_REQUEST,
//   NEW_REVIEW_SUCCESS,
//   NEW_REVIEW_FAIL,
//   ALL_REVIEW_REQUEST,
//   ALL_REVIEW_SUCCESS,
//   ALL_REVIEW_FAIL,
//   DELETE_REVIEW_REQUEST,
//   DELETE_REVIEW_SUCCESS,
//   DELETE_REVIEW_FAIL,
//   CLEAR_ERRORS,
// } from "../constants/productConstants";


// export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,id,ratings=0)=>async(dispatch)=>{


// //  export const getProduct = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_PRODUCT_REQUEST });
//     // let link="/api/v1/products/${id}";
//     //  let link=`/api/v1/products/${id}?keyword=${keyword}&page=${currentPage}&price{gte}=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
//     // if(category){
//     //     // link=`/api/v1/products/${id}?keyword=${keyword}&page=${currentPage}&price{gte}=${price[0]}&price[lte]=${price[1]}&category=${category}`;
//     //     link=`/api/v1/products/${id}?keyword=${keyword}&page=${currentPage}&price{gte}=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
//     // }
   
    // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
   

    // if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    // }

    // const {data} = await axios.get(link);

    
    // const {id}=useParams();
    // /${id}";
    // let link = "/api/v1/products";
    // const { data } = await axios.get("/api/v1/products");


    // let link = "/api/v1/products";
    // const { data } = await axios.get("/api/v1/products");


//     // const {data}=await axios.get(`/api/v1/products/${id}`);


//     // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//     // if (category) {
//     //   link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
//     // }

//     // const { data } = await axios.get("/api/v1/products");




//     // let link=`/api/v1/products/${id}?keyword=${keyword}&page=${currentPage}&price{gte}=${price[0]}&price[lte]=${price[1]}`;
//     //lte less than gte greater than agr price hai ,(intially ki bat karte hai hum yaha) agr greter than 0 hai and less than 25000
//     // const {data} = await axios.get(`/api/v1/products/${id}?keyword=${keyword}`);

//     dispatch({
//       type: ALL_PRODUCT_SUCCESS,
//       payload: data.product.data,
//       // payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: ALL_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// // Get All Products For Admin
// export const getAdminProduct = () => async (dispatch) => {
//   try {
//     dispatch({ type: ADMIN_PRODUCT_REQUEST });

//     const { data } = await axios.get("/api/v1/admin/products");

//     dispatch({
//       type: ADMIN_PRODUCT_SUCCESS,
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// //get product details
// export const getProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });
//     const { data } = await axios.get("/api/v1/products/${id}");
//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.product,
//     })
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// // Create Product
// export const createProduct = (productData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.post(
//       `/api/v1/admin/product/new`,
//       productData,
//       config
//     );

//     dispatch({
//       type: NEW_PRODUCT_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// // Update Product
// export const updateProduct = (id, productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/product/${id}`,
//       productData,
//       config
//     );

//     dispatch({
//       type: UPDATE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// // Delete Product
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/product/${id}`); //backend se bhi delete kar diya

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// // NEW REVIEW
// export const newReview = (reviewData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_REVIEW_REQUEST });

//     const config = {
//       headers: { "Content-Type": "application/json" },
//     };

//     const { data } = await axios.put(`/api/v1/review`, reviewData, config);

//     dispatch({
//       type: NEW_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Get All Reviews of a Product
// export const getAllReviews = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_REVIEW_REQUEST });

//     const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

//     dispatch({
//       type: ALL_REVIEW_SUCCESS,
//       payload: data.reviews,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Delete Review of a Product
// export const deleteReviews = (reviewId, productId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/reviews?id=${reviewId}&productId=${productId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// //CLearing errors
// export const ClearErrors = () => async (dispatch) => {
//   dispatch({ type: CLEAR_ERRORS });
// };

//front end kai package.json mai maine proxy add kar diya kuki humara frontend port pai chl ra tha aur backend alg port ppai ,ab agr mai refresh karta tha to koi ek hi chlta tha ,
// lakin proxy add karne ki vazah se ab dono refresh ho sakte hai

































































































































import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";


// export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,id,ratings=0)=>async(dispatch)=>{
//   try {
//     dispatch({ type: ALL_PRODUCT_REQUEST });

    // let link="/api/v1/products";
    // const {data}=await axios.get(link);

   
    // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
   

    // if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    // }

    
    // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    // if (category) {
    //   link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    // }



    // let link="api"
    // const {data} = await axios.get("/api/v1/products");
    // let link= "/api/v1/products/${id}";
    // let link="/api/v1/products";
    // const {data}=await axios.get(link);
    // const {data}=await axios.get("/api/v1/products");

//     dispatch({
//       type: ALL_PRODUCT_SUCCESS,
//       payload: data.product.data,
//       // payload: data,
//     })
//   } catch (error) {
//     dispatch({
//       type: ALL_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// // Get All Products
// export const getProduct =
//   (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: ALL_PRODUCT_REQUEST });

//       let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//       if (category) {
//         link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
//       }
//     //  let link=`/api/v1/products`;
//       const { data } = await axios.get(link);

//       dispatch({
//         type: ALL_PRODUCT_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: ALL_PRODUCT_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };


// Get All Products
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get product details
// export const getProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });
//     // const { data } = await axios.get(`/api/v1/product/${id}`); ye woh hai jis ey badla tha jab sab sahi chl ra tha
//     const { data } = await axios.get(`/api/v1/product/${id}`);  
//     console.log("saale ut ja ");
//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.product,
//     })
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`); //backend se bhi delete kar diya

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CLearing errors
export const ClearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};


































































































































