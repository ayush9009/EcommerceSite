// import React from 'react'

// const UserOptions = () => {
//   return (
//     <div>hi</div>
//   )
// }

// export default UserOptions
// import React, { Fragment, useState } from "react";
// import "./Header.css";
// import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
// import Backdrop from "@material-ui/core/Backdrop";
// import DashboardIcon from "@material-ui/icons/Dashboard";
// import PersonIcon from "@material-ui/icons/Person";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import ListAltIcon from "@material-ui/icons/ListAlt";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { logout } from "../../../actions/userAction";
// import { useDispatch, useSelector } from "react-redux";

// const UserOptions = ({ user }) => {
//   const { cartItems } = useSelector((state) => state.cart);

//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const alert = useAlert();
//   const dispatch = useDispatch();

//   const options = [
//     { icon: <ListAltIcon />, name: "Orders", func: orders },
//     { icon: <PersonIcon />, name: "Profile", func: account },
//     {
//       icon: (
//         <ShoppingCartIcon
//           style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
//         />
//       ),
//       name: `Cart(${cartItems.length})`,
//       func: cart,
//     },
//     { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
//   ];

//   if (user.role === "admin") {
//     options.unshift({ //shift remove the first element from the array ,aur ye unshift kya karega element ko array mai sabse pahle jod dega
//       icon: <DashboardIcon />,
//       name: "Dashboard",
//       func: dashboard,
//     });
//   }


//   function dashboard() {
//     navigate("/admin/dashboard");
//     // history.push("/admin/dashboard");
//   }

//   function orders() {
//     navigate("/orders");
//     // history.push("/orders");
//   }
//   function account() {
//     navigate("/account");
//     // history.push("/account");
//   }
//   function cart() {
//     navigate("/cart"); 
//     // history.push("/cart");
//   }
//   function logoutUser() {
//     dispatch(logout());
//     alert.success("Logout Successfully");
//   }

//   return (
//     <Fragment>
      // <Backdrop open={open} style={{ zIndex: "10" }} />
//       <SpeedDial
//         ariaLabel="SpeedDial tooltip example"  //ye naam hogya iska
//         onClose={() => setOpen(false)}  //open close bna liye ,open pai open hoja close se close ho ja
//         onOpen={() => setOpen(true)}
//         style={{ zIndex: "11" }}
//         open={open}
//         direction="down"
//         className="speedDial"
// icon={
//   <img
//     className="speedDialIcon"

//     // "/Profile.png"
//     src={user.avatar.url ? user.avatar.url :  "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"}
//     alt="Profile"
//   />
//         }
//       >
//       {/* SpeedDialAction icon={<DashboardIcon/>} tooltipTitle="dshboard" aise karlo aise karne se se hover karogey to dashboard aur baaki icon jo aap chaogey vo show hojagey deklo ab
//       yaha phir map lagakr bhi kar sakte space bachega */}
//         {options.map((item) => (
//           <SpeedDialAction
//             key={item.name}
//             icon={item.icon}
//             tooltipTitle={item.name}
//             onClick={item.func}
//             tooltipOpen={window.innerWidth <= 600 ? true : false}
//           />
//         ))}
//       </SpeedDial>
//     </Fragment>
//   );
// };

// export default UserOptions;

import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import { useAlert } from "react-alert";


const UserOptions = ({ user }) => {
  const {cartItems}=useSelector((state)=>state.cart);
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}/>, name: `Cart(${cartItems.length})`, func: cart },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];


  if (user.role === "admin") {
    options.unshift({ //shift remove the first element from the array ,aur ye unshift kya karega element ko array mai sabse pahle jod dega
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    console.log("aapne orders khol liye hai");
    navigate("/orders");
  }
  function account() {
    console.log("aapne account khol liya hai");
    navigate("/account");
  }
  function cart() {
    console.log("aapne cart khol liya hai");
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    console.log("logout successfully")
  }


  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />  
      {/* is backdrop ko karne se jaise hi aap image pai hover karogey to sab grey se hojga */}

      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{zIndex:"11"}} //ye bhi ek special cheez hai is ki madath se hi sirf image home pai dikegi
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"

            // "/Profile.png"
            src={user.avatar.url ? user.avatar.url : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"}
            alt="Profile"
          />
        }
      >
        {/* <SpeedDialAction icon={<DashboardIcon/>} tooltipTitle="Dashboard"/> */}
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment >
  );
};
export default UserOptions;
