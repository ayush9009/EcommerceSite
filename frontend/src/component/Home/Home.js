// import React, { Fragment, useEffect } from "react";
// import { CgMouse } from 'react-icons/cg';
// import "./Home.css";
// import Product from "./ProductCard.js"
// import MetaData from "../layout/MetaData";
// import { ClearErrors, getProduct } from "../../actions/productAction";






// //hume ab bad getproduct ko call karna lakin redux mai hum directly call ni kar skate uske liye hume kuch import karna hoga redux se



// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/loader/loader";



// // import {useAlert} from "react-alert"
// // import store from "../redux/Store";
// // import store from "./store"



// const product = {
//   names: "Blue shirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "3000",
//   _id: "aayush",
// };


// const Home = () => {



  // // store?.dispatch(actions.setSocket({ socket }));
  //     // const alert=useAlert();



  // const dispatch = useDispatch();
  // const { loading, error, products } = useSelector(
  //   (state) => state.products  //konsi state mai chlna state.products mai
  // );
  // useEffect(() => {
  //   if (error) {
  //     //  alert.error(error); //useEffect kai andar vo lekha jaga jo change hora uske bd kya karna
  //     console.log("error ari home.js vali mai");
  //     dispatch(ClearErrors());
  //   }
  //   dispatch(getProduct());
  // }, [dispatch]);  //[] ise andar vo cheez ave jo change honi





  // // },[dispatch,error]);

//   return (

//     <Fragment>
//       {loading ? (
//         <Loader />) : (<Fragment>
//           {/* isloading ka istemal karna se hoga ye kuki jab aap load karogey to koi bhi component ni dikega jab sare component load ho jagey tabhi dekengey */}
//           <MetaData title="ECOMMERCE" />
//           <div className="banner">
//             <p>Welcome to Ecommerce</p>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll <CgMouse />
//               </button>
//             </a>
//           </div>
//           <h2 className="homeHeading">Featured Products</h2>
//           <div className="container" id="container">

//             {products && products.map(product => {
//               <Product product={product} />
//             })}
//             {/* <Product product={product} />
//             <Product product={product} />
//             <Product product={product} />
//             <Product product={product} />
//             <Product product={product} />
//             <Product product={product} />
//             <Product product={product} />
//             <Product product={product} /> */}
//           </div>
//         </Fragment>)}
//     </Fragment>
//     // //          //iski jagah aise leekhlo <> </> ek hi bat hai vo to readibility kara taki koi bhi deke use smj aaja
//   );
// };

// export default Home;







// // "react-alert": "^7.0.3",
// // "react": "^18.2.0",
//     // "react-alert-template-basic": "^1.0.2",

// // import {CgMouse} from "react-icons/all";
// //react-icosn all karne se arror aiye thi that requested module conflicting to is error ko react-icons/(yaha vo ayega jo partiuclar cheez chaiye)


// // import React, { Fragment, useEffect } from "react";
// // import { CgMouse } from "react-icons/cg";
// // import "./Home.css";
// // import ProductCard from "./Product.js";
// // import MetaData from "../layout/MetaData";
// // import {  getProduct } from "../../actions/productAction";
// // import { useSelector, useDispatch } from "react-redux";
// // import loader from "../layout/loader/loader";
// // import { useAlert } from "react-alert";

// // const Home = () => {
// //   const alert = useAlert();
// //   const dispatch = useDispatch();
// //   const { loading, error, products } = useSelector((state) => state.products);

// //   useEffect(() => {
// //     if (error) {
// //       alert.error(error);
// //     //   dispatch(clearErrors());
// //     }
// //     dispatch(getProduct());
// //   }, [dispatch, alert]);

// //   return (
// //     <Fragment>
// //       {loading ? (
// //         <loader />
// //       ) : (
// //         <Fragment>
// //           <MetaData title="ECOMMERCE" />

// //           <div className="banner">
// //             <p>Welcome to Ecommerce</p>
// //             <h1>FIND AMAZING PRODUCTS BELOW</h1>

// //             <a href="#container">
// //               <button>
// //                 Scroll <CgMouse />
// //               </button>
// //             </a>
// //           </div>

// //           <h2 className="homeHeading">Featured Products</h2>

// //           <div className="container" id="container">
// //             {products &&
// //               products.map((product) => (
// //                 <ProductCard key={product._id} product={product} />
// //               ))}
// //           </div>
// //         </Fragment>
// //       )}
// //     </Fragment>
// //   );
// // };

// // export default Home;
// import React, { Fragment, useEffect } from "react";
// import { CgMouse } from 'react-icons/cg';
// import "./Home.css";
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
// import { ClearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/loader/loader";
// // import { useAlert } from "react-alert";

// const Home = () => {
// //   const alert = useAlert();
//   const dispatch = useDispatch();
//   const { loading, error, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     if (error) {
//     //   alert.error(error);
//       console.log(`error ari home.js vali mai ${error}`);
//       dispatch(ClearErrors());
//     }
//     dispatch(getProduct());
// //   }, [dispatch, error, alert]);
// }, [dispatch, error]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="ECOMMERCE" />

//           <div className="banner">
//             <p>Welcome to Ecommerce</p>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll <CgMouse />
//               </button>
//             </a>
//           </div>

//           <h2 className="homeHeading">Featured Products</h2>

//           <div className="container" id="container">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Home;


































































import React, { Fragment, useEffect } from "react";
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { ClearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      console.log("you know what type of error i m is");
      dispatch(ClearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, alert,error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;