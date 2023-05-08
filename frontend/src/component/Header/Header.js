import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";


const Header = () => {
  return (
    <ReactNavbar

      logo={logo}
      burgerColor="#eb4034"
      burgerColorHover="#a62d24"
      logoWidth="20vmax"
      navColor1="white"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35, 35, 35,0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"

      searchIcon={true}
      SearchIconElement={FaSearch}
      cartIcon={true}
      CartIconElement={FaShoppingCart}
      profileIcon={true}
      ProfileIconElement={FaUserAlt}

      // profileIconUrl="/login" ye filhal kai liye kara bad mai ise change kar lena ,ye redirect hona choaiye profile
      profileIconUrl="/account"  

      profileIconColor="rgba(35, 35, 35,0.8)"
      searchIconColor="rgba(35, 35, 35,0.8)"
      cartIconColor="rgba(35, 35, 35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
    />
  );
};



export default Header;