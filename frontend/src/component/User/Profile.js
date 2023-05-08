import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

// { history }
const Profile = () => {
    // loaduser ki madath se humne sara data user ka state mai save kar rka ,to open hote hi user ka naam ajaga
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    const navigate=useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            // history.push("/login");
            navigate("/login");
        }
    // }, [history, isAuthenticated]);
}, [navigate, isAuthenticated]);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${user.name}'s Profile`} />
                    {/* open hote hi user ka naam ajaga kaise kuki loadUser mai humna sara data already save kar raka */}

                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                                {/* usercreated at se sara pata lag jaga ise sttring mai convert karlunga aur uske bad substring ki madath se sirf date lelunga */}
                            </div>

                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;