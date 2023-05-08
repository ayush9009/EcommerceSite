// import React from "react";
// import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";

// const ProductCard = ({ product }) => {
//   const options = {
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   return (
//     <Link className="productCard" to={`/product/${product._id}`}>
//       <img src={product.images[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       <div>
//         <Rating {...options} />{" "}
//         <span className="productCardSpan">
//           {" "}
//           ({product.numOfReviews} Reviews)
//         </span>
//       </div>
//       <span>{`₹${product.price}`}</span>
//     </Link>
//   );
// };

// export default ProductCard;
// import React from "react";
// import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";

// const ProductCard = ({ product }) => {
//   const options = {
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };
//   console.log(product.images[0].url);
//   return (
//     <Link className="productCard" to={`/api/v1/product/${product._id}`}>
//       <img src={product.images[0].url} alt={product.name} />
//       <p>{product.name}</p>
//       {/* console.log("product.name"); */}
//       <div>
//         <Rating {...options} />
//         <span className="productCardSpan">
//           ({product.numOfReviews} Reviews)
//         </span>
//       </div>
//       <span>{`₹${product.price}`}</span>
//     </Link>
//   );
// };
import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  console.log(product.images[0].url);
  return (

    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      {/* <h1>{product.name}</h1> */}
      {/* <h1>{product.price}</h1> */}
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};


export default ProductCard;