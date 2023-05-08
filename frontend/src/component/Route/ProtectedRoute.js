//ye bht badiya file hai isliye dhyan se smjna ise
// import React, { Fragment} from "react";
// import { useSelector } from "react-redux";
// import { Navigate,Route }  from "react-router-dom";
// import {  } from "react-router-dom";


// ...rest ka mtlb baki sare componnents
// const ProtectedRoute = ({ element: Component, ...rest }) => {
//     const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//     return (
//         <Fragment>
//             {!loading && (
//                 <Route
//                     {...rest}
//                     render={(props) => {
//                         if (!isAuthenticated) {
//                             return <Navigate to="/login" />;
//                             //redirect react ka component jis sey simply mtlb ye hi redirect to mtlb jispey ye kahra apka page vaha redirect hojaga
//                         }
//                         return <Component {...props} />;
//                     }}
//                 />
//             )}

//         </Fragment>
//     );
// };
// export default ProtectedRoute;





























// import React from 'react';
// import { useSelector } from 'react-redux';

// import { Navigate, Outlet } from 'react-router-dom'

// // const useAuth = () => {
//   //  const user=useSelector((state)=>state.user);
//   const { loading, isAuthenticated,user } = useSelector((state) => state.user);

//   if (!loading) {
//     // laoading===false
//     if (!isAuthenticated) {
//       return false;
//     } else {
//       return true;
//     }
//   }

// const ProtectedRoutes = ({ isAdmin, props: any }) => {

//   const auth = useAuth();
//   // const user = localStorage.getItem('user');
//   if (isAdmin === true && user.login !== "admin") {
//     return <Navigate to="/login" />
//   }
//   // const auth = useAuth();
//   // isAdmin,

//   return auth ? <Outlet /> : <Navigate to="/login" />
// }
// }
// export default ProtectedRoutes;




























import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
   const user=useSelector((state)=>state.user);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (!loading) {
    // laoading===false
    if (!isAuthenticated) {
      return false;
    } else {
      return true;
    }
  }
}

const ProtectedRoutes = ({  props: any} ) => {
  // isAdmin,
  const auth = useAuth();
 

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;








// kya karo hai kaise hora hai smjo
// isme sabse pahle kuch parameters diye hai component,mtlb app.js se jo component bej jare vo yaha receie hojagey aur baki cheeze jaise
// exact path vagera vo rest ki madath se le ra HTMLDocument
// phir kah diya agr loading ni hai to route tag hai,rest laga diya kuki kitne bhi ho sake ,render mai ek function jo ki hum returb karenge