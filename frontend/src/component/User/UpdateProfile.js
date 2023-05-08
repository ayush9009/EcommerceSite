// import React, { Fragment, useState, useEffect } from "react";
// import "./UpdateProfile.css";
// import Loader from "../layout/loader/loader";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import FaceIcon from "@material-ui/icons/Face";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
// import { useNavigate } from "react-router-dom";
// // import { useAlert } from "react-alert";
// import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
// import MetaData from "../layout/MetaData";

// // { history }
// const UpdateProfile = () => {
//     const navigate=useNavigate();
//   const dispatch = useDispatch();
// //   const alert = useAlert();

//   const { user } = useSelector((state) => state.user);
//   const { error, isUpdated, loading } = useSelector((state) => state.profile);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [avatar, setAvatar] = useState();
//   const [avatarPreview, setAvatarPreview] = useState("https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png");

//   const updateProfileSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("avatar", avatar);
//     dispatch(updateProfile(myForm));
//   };

//   const updateProfileDataChange = (e) => {
//     const reader = new FileReader();

//     reader.onload = () => {
//       if (reader.readyState === 2) {
//         setAvatarPreview(reader.result);
//         setAvatar(reader.result);
//       }
//     };

//     reader.readAsDataURL(e.target.files[0]);
//   };

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setAvatarPreview(user.avatar.url);
//     }

//     if (error) {
//     //   alert.error(error);
//     console.log("Bhai error ari UpdateProfile vali file mai");
//       dispatch(clearErrors());
//     }

//     if (isUpdated) {
//     //   alert.success("Profile Updated Successfully");
//      console.log("Profile Updated Successfully");
//       dispatch(loadUser());


//       navigate("/account");
//     //   history.push("/account");

//       dispatch({
//         type: UPDATE_PROFILE_RESET,
//       });
//     }
// //   }, [dispatch, error, alert, navigate, user, isUpdated]);
// }, [dispatch, error, navigate, user, isUpdated]);
//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="Update Profile" />
//           <div className="updateProfileContainer">
//             <div className="updateProfileBox">
//               <h2 className="updateProfileHeading">Update Profile</h2>

//               <form
//                 className="updateProfileForm"
//                 encType="multipart/form-data"
//                 onSubmit={updateProfileSubmit}
//               >
//                 <div className="updateProfileName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <div className="updateProfileEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div id="updateProfileImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={updateProfileDataChange}
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Update"
//                   className="updateProfileBtn"
//                 />
//               </form>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default UpdateProfile;
import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/loader/loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  // const [name,setName]=useState(user.name);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
    console.log("error ari baglo");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully 😃!");
    console.log("update hogi profile bago");
      dispatch(loadUser());

    //   history.push("/account");
    navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error,  navigate,alert, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
























































































































