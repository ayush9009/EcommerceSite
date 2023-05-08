import React from 'react'
import "./LoginSignUp.css";
import Loader from '../layout/loader/loader';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login,register } from '../../actions/userAction';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {useAlert} from "react-alert";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



// {history}
// {location}
const LoginSignup = () => {
    
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const alert=useAlert();

    const { error, loading, isAuthenticated } = useSelector(state => state.user)

    // react mai hum directly dom kai elmenets ko use ni kar sakta uske liye muje useref ki jarorat pade
    const loginTab = useRef(null);
    // documment.quert selector se use ni kar sakta tha isliye use kiya useRef,aur jab bhi login ki bat hogi to yaha se vo reference le lega
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    console.log(user);
    //user mai initally name,email,password sab empty hai ,aur setuser insabko update kardega
    const {name, email, password} = user;  //ye kar di values set

    const [avatar, setAvatar] = useState();
    
    // /Profile.png
    const [avatarPreview, setAvatarPreview] = useState("https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        // toast.success("Login Successfully done 😃!", {
        //     position: "top-center"
        // });
        alert.success("Login Successfully done 😃!");
        // console.log("Login Form submitted");
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        // const [name, email, password] = user;
        const myForm = new FormData();   //jo form mai user data bhrega vo sab myform mai chla jaga
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register(myForm));
        // console.log("Sign Up Form submitted");
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
    //                 // readystate=0 (inital),readystate=1(processing),readystate=2(done) 
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            // setUser((prev) => [...prev, ...response.data.user.data]);
            setUser({ ...user, [e.target.name]: e.target.value });
            // ...user karne se user ki sari information ajagi
        }
    };
    // const redirect=location.search ? location.search.split("=")[1] : "/account";
    // const redirect="/account";
    // const redirect = [...searchParam][0] ? /${[...searchParam][0][1]}: '/account';
    const location = useLocation();

    //For full URL, you have to use location.pathname + location.search
    //For just the path name :- location.pathname
    const redirect = location.pathname + location.search
    //vo to na login?=shipping to login to ise do hisso mai tod diya ab ,aur 0 vala to login hai and 1 vala shipping

    useEffect(() => {
        if (error) {
                          alert.error(error);
            // console.log(`error arises ${error}`);
            dispatch( clearErrors());
        }
        if (isAuthenticated) {   //mtlb login agr true hai
        // navigate("redirect");  //navigate use hove with react-router-dom version >=6
        navigate("/");
        }
    // }, [dispatch, error,navigate,redirect,isAuthenticated]);
     } ,[dispatch, error, alert, navigate, isAuthenticated, redirect]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");  //kuki neutal mai vo login
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                        <div>
                            <div className="login_signUp_toggle">
                                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password ?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                            
                        </form>
                        {/* <ToastsContainer /> */}
                        <form
                            className="signUpForm"
                            ref={registerTab}
                            encType="multipart/form-data" //kuki is form mai hum sirf string ni bej rai user ki image bhi bej rai isliye multipart
                            onSubmit={registerSubmit}
                        >
                            <div className="signUpName">
                                <FaceIcon />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <LockOpenIcon />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={registerDataChange}
                                />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    );
}

export default LoginSignup



//DEKHO BHAI KCH DER KAI LIYE LINK CHANNGE AKRA ,PRODOCU ACTION JAHA VO LET LINK HAI VO TO BAD MAI CHECK KAR LENA USE
























































































































































