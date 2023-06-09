import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";  //connect karne kai liye
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer,myOrdersReducer } from "./reducers/orderReducer";


const reducer=combineReducers({
    products:productsReducer,
    // products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    
});  //yo bnaliya humne  combine karke rakte rahenge hum isme 

let initialState = {
    //mtlb agr localstoreage mai data hai to vo rak do nhi to empty rako
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };

const middleware=[thunk];
const store=createStore(   //createStore kai andar vo ayega jo kuch hume fetch  educer(product kaise fetch karni to uska reducer bna diya)
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;

//redux kai sath kam karte huve hume do teen cheezo ka dhyna rakna pade store reducer action