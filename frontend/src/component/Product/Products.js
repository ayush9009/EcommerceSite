import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { ClearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import {useAlert} from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = ({ match }) => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
      const [category, setCategory] = useState("");

      const [ratings, setRatings] = useState(0);//usestate(0)means 0 se upr jiske rating vo show ho ja




    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    //   let count = filteredProductsCount;

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);
    const { keyword } = useParams();
    // const keyword=match.param.keyword;
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(ClearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price,category,ratings));
    }, [dispatch, keyword, currentPage, price,category,ratings,alert,error]);
    // [dispatch, keyword, currentPage, price,category,ratings,alert,error])

          let count = filteredProductsCount;
    // , [dispatch,keyword]);
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                <MetaData title="PRODUCTS -- ECOMMERCE" />

                    <h2 className="productsHeading">Products</h2>
                    <div className="products">
                        {products &&
                            products.map((product) => (
                             
                                <ProductCard key={product._id} product={product} />
                                
                                
                            ))}
                    </div>
                    {/* {keyword && } ,agr aap jaha raha rai filter vala jabhi aye jab aap search pai click karogey to ,ye keyword vala scne laga do*/}
                    <div className="filterBox">
                        <Typography>Price</Typography>
                        {/* console.log("price",details[index]); */}
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"//agr yaha auto ki jagah on kar diya to vo gyubara sa dikta rahega,us gubare mai 0 ya 25000
                            aria-labelledby="range-slider" //range slider kuki range select ki 100-25000
                            min={0} //inital 0,and max 25000
                            max={25000}
                        />

                         <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (   //kuch category hogi unhi category mai sai select hoga
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
{/* field set is used to group the related elements in a group 
ek dibba sa bnega uske andar jo jo related elements hai vo sab ajaengey*/}
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>
                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            }</Fragment>
    );
}

export default Products
// "proxy": {
//     "/auth/google": {
//       "target": "localhost:4000"
//     }
//   }
// "proxy": "http://192.168.174.1:4000"














































