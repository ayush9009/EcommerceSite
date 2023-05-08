import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Header from "./component/Header/Header.js"

import {
  BrowserRouter,
  Routes,
  Route,
  Switch
} from "react-router-dom";
import WebFont from "webfontloader"
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"
import { Provider, useDispatch, useSelector } from "react-redux";
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/newProduct';
import UpdateProduct from './component/Admin/UpdateProduct.js'
import OrderList from './component/Admin/OrderList.js'
import ProcessOrder from './component/Admin/ProcessOrder.js';
import UserList from './component/Admin/UserList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from "./component/layout/Not Found/NotFound";
// import ResetPassword from "./component/User/ResetPassword.js"





const AppWrapper = () => {
  // const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


const App = () => {


  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          {/* Since [Elements] is not a <Route> component, it 
          cannot be wrapped inside <Route>. That means Elements should be placed outside <Route>. */}
           {isAuthenticated && <UserOptions user={user} />}
             {stripeApiKey && (  
           <Elements stripe={loadStripe(stripeApiKey)}> 
          <Routes>
          
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/search" element={<Search />} />

              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/account" element={<Profile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/about" element={<About/>} />
        
              <Route path="/shipping" element={<Shipping />} />
             
          
               <Route path="/process/payment" element={<Payment />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<MyOrders />} />
            
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/order/:id" element={<OrderDetails />} /> 
              

            {/* </Switch> */}

             
              
              


              <Route path="/password/forgot" element={<ForgotPassword/>}/>

               <Route isAdmin={true} path="/admin/dashboard" element={<Dashboard/>} />
              <Route isAdmin={true} path="/admin/products" element={<ProductList/>} />
              <Route isAdmin={true} path="/admin/product" element={<NewProduct/>} /> 
              <Route isAdmin={true} path="/admin/product/:id" element={<UpdateProduct/>} /> 
              <Route isAdmin={true} path="/admin/orders" element={<OrderList/>} /> 
              <Route isAdmin={true} path="/admin/order/:id" element={<ProcessOrder/>} /> 
              <Route isAdmin={true} path="/admin/users" element={<UserList/>} /> 
              <Route isAdmin={true} path="/admin/user/:id" element={<UpdateUser/>} /> 
              <Route isAdmin={true} path="/admin/reviews" element={<ProductReviews/>} /> 
            

              {/* protected route mtlb jo login hai sirf unhe hi dekega aqur kisiko nhi */}
            </Route>
            
         
            
           
            <Route path="/password/forgot" element={<ForgotPassword />} />
            {/* <Route path="/password/reset/:token" element={<ResetPassword/>}/> */}
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/cart" element={<Cart />} />
            
            
          


            {/* is routes mai islsiye wrap kara kuki version 6 and version 5 of react-router dom is different lit bit,aur aapke vale version 6 hai to usme aise wrap karna pade */}

          </Routes>
          
          </Elements>  
              )}

          <Footer />
          {/* rootElement */}
        </BrowserRouter>
        {/* rootElement */}
      </Provider>
    </React.StrictMode>
  );
}
export default AppWrapper;

//10-12-22
// kya karna rahta hai
//loading vala scene jo matlab loading hoke gol gol ghume vo bhi ni chlra abhi use bhi sahi karo
// aur dang se show bhi ni ho rai,(carousel work ni kar ra dang se us pe kaam karna jarori hai)
// reset password vala bhi kam karo
// stripe pai ka tha shyd vo page usne background bht acha use kar raka use use karo triangle(home) page vale ki jagah
// sstyling bhi abhi gadbad hai vo bhi karo 
// zbhi  cart ka bhi aisa hi scene hai vo sab kai liye show ho ja to aisa na ho dhyan rako uska
//role bhi abhi kam ni kar rai sahi se user admin vale
// alerts vala scene bhi theek karo uski jagah toastify use karo vo jada badiya tha
// images bhi products mai particluar product ki show ni hori aur orders mai bhi actions vale pai jab click kare to jo
//vaha bhi product nhi dikh ri
//update product vala scene sahi karo
// "proxy": "http://192.168.174.1:4000"















  // const { isAuthenticated, user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // const [stripeApiKey, setStripeKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeKey(data.stripeApiKey);
  // }

  // async function getStripeApiKey() {
  //   try {
  //     const { data } = await axios.get("/api/v1/stripeapikey");
  
  //     setStripeKey(data.stripeApiKey);
  //   } catch(error) {
  //     // handle error, set some error state, display error toast, etc...
  //     console.log(`Error arises in app.js vali file becuse of ${error}`);
  //   }
  // }
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }


  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"]
  //     }
  //   });
  //   // <Provider store={store}>
  //   store.dispatch(loadUser());
  //   getStripeApiKey()

  // }, [])
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: ["Roboto", "Droid Sans", "Chilanka"],
  //     },
  //   });

  //   store.dispatch(loadUser());

  //   // getStripeApiKey();
  // }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // const rootElement = document.getElementById("root");
//           {/* is routes mai islsiye wrap kara kuki version 6 and version 5 of react-router dom is different lit bit,aur aapke vale version 6 hai to usme aise wrap karna pade */}


// export default App;





// "react": "^17.0.2",
        // "react-alert": "^7.0.3",
        // "react-alert-template-basic": "^1.0.2",
        // "react-dom": "^18.2.0",
        // .ProductDetails {
        //   background-color: rgb(255, 255, 255);
        //   /* width: 100vw; */
        //   width: 100vw;
        //   max-width: 100%;
        //   padding: 6vmax;
        //   box-sizing: border-box;
        //   display: flex;
        // }
        
        // .ProductDetails > div {
        //   width: 100%;
        //   display: flex;
        //   flex-direction: column;
        //   justify-content: space-evenly;
        //   align-items: center;
        //   padding: 2vmax;
        //   box-sizing: border-box;
        //   border: 1px solid white;
        // }
        
        // .ProductDetails > div:last-child {
        //   align-items: flex-start;
        // }
        
        // .CarouselImage {
        //   width: 20vmax;
        //   /* height: 20vmax; */
        // }
        
        // .detailsBlock-1 > h2 {
        //   color: rgb(54, 54, 54);
        //   font: 600 1.6vmax "Roboto";
        // }
        
        // .detailsBlock-1 > p {
        //   color: rgba(54, 54, 54, 0.582);
        //   font: 200 0.6vmax cursive;
        // }
        
        // .detailsBlock-2 {
        //   display: flex;
        //   justify-content: flex-start;
        //   align-items: center;
        //   border-top: 1px solid rgba(0, 0, 0, 0.205);
        //   border-bottom: 1px solid rgba(0, 0, 0, 0.205);
        //   width: 70%;
        //   padding: 1vmax 0;
        // }
        
        // .detailsBlock-2-span {
        //   font: 200 0.8vmax cursive;
        //   color: rgba(0, 0, 0, 0.699);
        // }
        
        // .detailsBlock-3 {
        //   width: 70%;
        // }
        
        // .detailsBlock-3 > h1 {
        //   color: rgba(17, 17, 17, 0.795);
        //   font: 400 1.8vmax "Franklin Gothic Medium";
        //   margin: 1vmax 0;
        // }
        // .detailsBlock-3-1 {
        //   display: flex;
        //   align-items: center;
        // }
        
        // .detailsBlock-3-1-1 > button {
        //   border: none;
        //   background-color: rgba(0, 0, 0, 0.616);
        //   padding: 0.5vmax;
        //   cursor: pointer;
        //   color: white;
        //   transition: all 0.5s;
        // }
        // .detailsBlock-3-1-1 > button:hover {
        //   background-color: rgba(0, 0, 0, 0.767);
        // }
        
        // .detailsBlock-3-1-1 > input {
        //   border: none;
        //   padding: 0.5vmax;
        //   width: 1vmax;
        //   text-align: center;
        //   outline: none;
        //   font: 400 0.8vmax "Roboto";
        //   color: rgba(0, 0, 0, 0.74);
        // }
        
        // .detailsBlock-3-1 > button:last-child {
        //   border: none;
        //   cursor: pointer;
        //   color: white;
        //   transition: all 0.5s;
        //   background-color: tomato;
        //   font: 500 0.7vmax "Roboto";
        //   border-radius: 20px;
        //   padding: 0.5vmax 2vmax;
        //   margin: 1vmax;
        //   outline: none;
        // }
        
        // .detailsBlock-3-1 > button:last-child:hover {
        //   background-color: rgb(214, 84, 61);
        // }
        
        // .detailsBlock-3 > p {
        //   border-top: 1px solid rgba(0, 0, 0, 0.205);
        //   border-bottom: 1px solid rgba(0, 0, 0, 0.205);
        //   padding: 1vmax 0;
        //   color: rgba(0, 0, 0, 0.651);
        //   font: 400 1vmax "Roboto";
        //   margin: 1vmax 0;
        // }
        
        // .detailsBlock-4 {
        //   color: rgba(0, 0, 0, 0.897);
        //   font: 500 1.2vmax sans-serif;
        // }
        
        // .detailsBlock-4 > p {
        //   color: rgba(0, 0, 0, 0.534);
        //   font: 300 0.8vmax sans-serif;
        // }
        
        // .submitReview {
        //   border: none;
        //   background-color: tomato;
        //   font: 500 0.7vmax "Roboto";
        //   border-radius: 20px;
        //   padding: 0.6vmax 2vmax;
        //   margin: 1vmax 0;
        //   color: white;
        //   cursor: pointer;
        //   transition: all 0.5s;
        //   outline: none;
        // }
        // .submitReview:hover {
        //   background-color: rgb(197, 68, 45);
        //   transform: scale(1.1);
        // }
        
        // .submitDialog {
        //   display: flex;
        //   flex-direction: column;
        // }
        // .submitDialogTextArea {
        //   border: 1px solid rgba(0, 0, 0, 0.082);
        //   margin: 1vmax 0;
        //   outline: none;
        //   padding: 1rem;
        //   font: 300 1rem "Roboto";
        // }
        
        // .reviewsHeading {
        //   color: #000000be;
        //   font: 500 1.4vmax "Roboto";
        //   text-align: center;
        //   border-bottom: 1px solid rgba(0, 0, 0, 0.226);
        //   padding: 1vmax;
        //   width: 20vmax;
        //   margin: auto;
        //   margin-bottom: 4vmax;
        // }
        // .reviews {
        //   display: flex;
        //   overflow: auto;
        // }
        
        // .reviewCard {
        //   flex: none;
        
        //   box-shadow: 0 0 5px rgba(0, 0, 0, 0.226);
        //   border: 1px solid rgba(56, 56, 56, 0.116);
        //   width: 30vmax;
        //   display: flex;
        //   flex-direction: column;
        //   align-items: center;
        //   margin: 1vmax;
        //   padding: 3vmax;
        // }
        // .reviewCard > img {
        //   width: 5vmax;
        // }
        // .reviewCard > p {
        //   color: rgba(0, 0, 0, 0.836);
        //   font: 600 0.9vmax "Roboto";
        // }
        // .reviewCardComment {
        //   color: rgba(0, 0, 0, 0.445);
        //   font: 300 0.8vmax cursive;
        // }
        
        // .noReviews {
        //   font: 400 1.3vmax "Gill Sans";
        //   text-align: center;
        //   color: rgba(0, 0, 0, 0.548);
        // }
        
        // @media screen and (max-width: 600px) {
        //   .ProductDetails {
        //     flex-direction: column;
        //     height: unset;
        //   }
        
        //   .ProductDetails > div:last-child {
        //     align-items: center;
        //   }
        
        //   .detailsBlock-1 > h2 {
        //     font-size: 2.8vmax;
        //     text-align: center;
        //   }
        
        //   .detailsBlock-1 > p {
        //     text-align: center;
        //     font-size: 1vmax;
        //   }
        
        //   .detailsBlock-2 {
        //     justify-content: center;
        //   }
        //   .detailsBlock-2 > span {
        //     font-size: 1.5vmax;
        //   }
        
        //   .detailsBlock-3 > h1 {
        //     font: 700 3vmax "Franklin Gothic Medium";
        //     text-align: center;
        //   }
        
        //   .detailsBlock-3-1 {
        //     flex-direction: column;
        //   }
        
        //   .detailsBlock-3-1-1 {
        //     padding: 2vmax 0;
        //   }
        //   .detailsBlock-3-1-1 > button {
        //     padding: 1.2vmax;
        //     width: 4vmax;
        //   }
        
        //   .detailsBlock-3-1-1 > input {
        //     padding: 1.5vmax;
        //     width: 3vmax;
        //     font: 400 1.8vmax "Roboto";
        //   }
        
        //   .detailsBlock-3-1 > button:last-child {
        //     font: 500 1.7vmax "Roboto";
        //     padding: 1.5vmax;
        //     width: 20vmax;
        //     margin: 3vmax 0;
        //   }
        
        //   .detailsBlock-3 > p {
        //     padding: 2.5vmax 0;
        //     text-align: center;
        //     font: 400 2vmax "Roboto";
        //   }
        
        //   .detailsBlock-4 {
        //     font: 500 2.5vmax sans-serif;
        //   }
        
        //   .detailsBlock-4 > p {
        //     font: 300 1.8vmax sans-serif;
        //   }
        
        //   .submitReview {
        //     font: 500 1.7vmax "Roboto";
        //     padding: 1.5vmax;
        //     width: 20vmax;
        //     margin: 3vmax 0;
        //   }
        
        //   .reviewCard > p {
        //     font: 600 3vw "Roboto";
        //   }
        //   .reviewCardComment {
        //     font: 300 5vw cursive;
        //   }
        // }
        
        
        


























































































































































































































        // import "./App.css";
        // import { useEffect, useState } from "react";
        // import Header from "./component/layout/Header/Header.js";
        // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
        // import WebFont from "webfontloader";
        // import React from "react";
        // import Footer from "./component/layout/Footer/Footer";
        // import Home from "./component/Home/Home";
        // import ProductDetails from "./component/Product/ProductDetails";
        // import Products from "./component/Product/Products";
        // import Search from "./component/Product/Search";
        // import LoginSignUp from "./component/User/LoginSignUp";
        // import store from "./store";
        // import { loadUser } from "./actions/userAction";
        // import UserOptions from "./component/layout/Header/UserOptions";
        // import { useSelector } from "react-redux";
        // import Profile from "./component/User/Profile";
        // import ProtectedRoute from "./component/Route/ProtectedRoute";
        // import UpdateProfile from "./component/User/UpdateProfile";
        // import UpdatePassword from "./component/User/UpdatePassword";
        // import ForgotPassword from "./component/User/ForgotPassword";
        // import ResetPassword from "./component/User/ResetPassword";
        // import Cart from "./component/Cart/Cart";
        // import Shipping from "./component/Cart/Shipping";
        // import ConfirmOrder from "./component/Cart/ConfirmOrder";
        // import axios from "axios";
        // import Payment from "./component/Cart/Payment";
        // import { Elements } from "@stripe/react-stripe-js";
        // import { loadStripe } from "@stripe/stripe-js";
        // import OrderSuccess from "./component/Cart/OrderSuccess";
        // import MyOrders from "./component/Order/MyOrders";
        // import OrderDetails from "./component/Order/OrderDetails";
        // import Dashboard from "./component/Admin/Dashboard.js";
        // import ProductList from "./component/Admin/ProductList.js";
        // import NewProduct from "./component/Admin/NewProduct";
        // import UpdateProduct from "./component/Admin/UpdateProduct";
        // import OrderList from "./component/Admin/OrderList";
        // import ProcessOrder from "./component/Admin/ProcessOrder";
        // import UsersList from "./component/Admin/UsersList";
        // import UpdateUser from "./component/Admin/UpdateUser";
        // import ProductReviews from "./component/Admin/ProductReviews";
        // import Contact from "./component/layout/Contact/Contact";
        // import About from "./component/layout/About/About";
        // import NotFound from "./component/layout/Not Found/NotFound";
        
        // function App() {
        //   const { isAuthenticated, user } = useSelector((state) => state.user);
        
        //   const [stripeApiKey, setStripeApiKey] = useState("");
        
        //   async function getStripeApiKey() {
        //     const { data } = await axios.get("/api/v1/stripeapikey");
        
        //     setStripeApiKey(data.stripeApiKey);
        //   }
        
        //   useEffect(() => {
        //     WebFont.load({
        //       google: {
        //         families: ["Roboto", "Droid Sans", "Chilanka"],
        //       },
        //     });
        
        //     store.dispatch(loadUser());
        
        //     getStripeApiKey();
        //   }, []);
        
        //   window.addEventListener("contextmenu", (e) => e.preventDefault());
        
        //   return (
        //     <Router>
        //       <Header />
        
        //       {isAuthenticated && <UserOptions user={user} />}
        
        //       {stripeApiKey && (
        //         <Elements stripe={loadStripe(stripeApiKey)}>
        //           <ProtectedRoute exact path="/process/payment" component={Payment} />
        //         </Elements>
        //       )}
        
        //       <Switch>
        //         <Route exact path="/" component={Home} />
        //         <Route exact path="/product/:id" component={ProductDetails} />
        //         <Route exact path="/products" component={Products} />
        //         <Route path="/products/:keyword" component={Products} />
        
        //         <Route exact path="/search" component={Search} />
        
        //         <Route exact path="/contact" component={Contact} />
        
        //         <Route exact path="/about" component={About} />
        
        //         <ProtectedRoute exact path="/account" component={Profile} />
        
        //         <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        
        //         <ProtectedRoute
        //           exact
        //           path="/password/update"
        //           component={UpdatePassword}
        //         />
        
        //         <Route exact path="/password/forgot" component={ForgotPassword} />
        
        //         <Route exact path="/password/reset/:token" component={ResetPassword} />
        
        //         <Route exact path="/login" component={LoginSignUp} />
        
        //         <Route exact path="/cart" component={Cart} />
        
        //         <ProtectedRoute exact path="/shipping" component={Shipping} />
        
        //         <ProtectedRoute exact path="/success" component={OrderSuccess} />
        
        //         <ProtectedRoute exact path="/orders" component={MyOrders} />
        
        //         <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        
        //         <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        
        //         <ProtectedRoute
        //           isAdmin={true}
        //           exact
        //           path="/admin/dashboard"
        //           component={Dashboard}
        //         />
        //         <ProtectedRoute
        //           exact
        //           path="/admin/products"
        //           isAdmin={true}
        //           component={ProductList}
        //         />
        //         <ProtectedRoute
        //           exact
        //           path="/admin/product"
        //           isAdmin={true}
        //           component={NewProduct}
        //         />
        
        //         <ProtectedRoute
        //           exact
        //           path="/admin/product/:id"
        //           isAdmin={true}
        //           component={UpdateProduct}
        //         />
        //         <ProtectedRoute
        //           exact
        //           path="/admin/orders"
        //           isAdmin={true}
        //           component={OrderList}
        //         />
        
        //         <ProtectedRoute
        //           exact
        //           path="/admin/order/:id"
        //           isAdmin={true}
        //           component={ProcessOrder}
        //         />
        //         <ProtectedRoute
        //           exact
        //           path="/admin/users"
        //           isAdmin={true}
        //           component={UsersList}
        //         />
        
        //         <ProtectedRoute
        //           exact
        //           path="/admin/user/:id"
        //           isAdmin={true}
        //           component={UpdateUser}
        //         />
        
        //         <ProtectedRoute
        //           exact
        //           path="/admin/reviews"
        //           isAdmin={true}
        //           component={ProductReviews}
        //         />
        
        //         <Route
        //           component={
        //             window.location.pathname === "/process/payment" ? null : NotFound
        //           }
        //         />
        //       </Switch>
        
        //       <Footer />
        //     </Router>
        //   );
        // }
        
        // export default App;














































//differce between with redux and without redux
// redux se state management ho jaa 
// without redux agr kisi component se dusre component mai bejna to hum chaining ka use karte let us suppose ek tree uske kahi sare component hai,to leaf vale component ko sabse upr jo componethai uski jaroart hai to use chaning ka use karke pahle apne vale ki madth ki phir us sey upr and so on or bht jada complec ho jaga is sey
// with redux kya hoga ki ,redux mai hum alg hi store bna denge to hum kisi bhi component se data fetch karne ki bajaye backend se data mangayenge,aur is sey hum kahi bhi kisi bhi component mai use kar skate hai