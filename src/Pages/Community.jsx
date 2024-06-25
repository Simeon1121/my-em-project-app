import React, { useEffect, useState } from "react";
import NavBar from "../Layouts/NavBar";
import toast from "react-hot-toast";
import LinkedInImg from "../assets/linkedIn-Img.svg";
import xImg from "../assets/x-Img.svg";
import manImg from "../assets/man-Img.png";
import locationImg from "../assets/location-Img.svg";
import occupationImg from "../assets/occupationImg.svg";

const Community = () => {
  const [data, setdata] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [bioProfile, setBioProfile] = useState([]);
  const token = localStorage.getItem("clientToken");


  




  const getUsers = async () => {
    const request = await fetch(
      "http://localhost:5340/api/v1/users/all"
    );
    const response = await request.json();
    console.log(response.users);
    
    setdata(response.users);
  };
  const getCurrentUser = async () => {
    // fetch the current logged-in user
    try {
      const request = await fetch("http://localhost:5340/api/v1/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      

      const response = await request.json();
      console.log(response);
      if (response.success) {
        setCurrentUser(response.user);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };
  // follow function
  const handleFollow = async (userId) => {
    if (!currentUser) return;
    try {
      const response = await fetch(
        `http://localhost:5340/api/v1/users/follow/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setdata((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? { ...user, followers: [...user.followers, currentUser._id] }
              : user
          )
        );
        toast.success(result.message);
      } else {
        console.error(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  // unfollow function
  const handleUnfollow = async (userId) => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `http://localhost:5340/api/v1/users/unfollow/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (result.success) {
        setdata((prevData) =>
          prevData.map((user) =>
            user._id === userId
              ? {
                  ...user,
                  followers: user.followers.filter(
                    (id) => id !== currentUser._id
                  ),
                }
              : user
          )
        );

        toast.success(result.message);
      } else {
        console.error(result.message);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to unfollow user:",error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    if (token) {
      getCurrentUser();
    }

    setBioProfile;

    getUsers();
    document.title = "community | page";
  }, [token]);
  return (
    <>
      <NavBar />

      <main className="container">
        <div className="row gap-2 pt-3">
          <section className="vh-100 col-lg-4 d-none d-lg-block p-2 rounded-2 border profile-section">
            {/* Bio section */}


            <div className="bg-white rounded mt-3 h-50 stick1 col-lg-4 d-none d-lg-block ">
              <div className="d-flex align-items-center mt-3 gap-3">
                <img
                  src={bioProfile.profilePhoto}
                  alt="man-Img"
                  className="img-fluid rounded-circle profile1 w-25"
                />
                <div className="mt-4">
                  <h3>{bioProfile.userName} </h3>
                  <p>
                    {bioProfile?.followers?.length}
                    followers
                  </p>
                </div>
              </div>
              <hr />
              <div>
                <h2>Bio</h2>
                <p>{bioProfile.bio}</p>
              </div>
              <hr />
              <div>
                <h2>Info</h2>
                <div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={locationImg} alt="location-Img" className="" />
                    <p>{bioProfile.location}</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={occupationImg} alt="bag-icon" />
                    <p>{bioProfile.occupation}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h2>Socials</h2>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img src={xImg} alt="twitter-Img" />
                    <p>{bioProfile.x}</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={LinkedInImg} alt="linkedin-icon" />
                    <p>{bioProfile.linkedIn}</p>
                  </div>
                </div>
              </div>
            </div>








            {/* <div className="bg-white rounded mt-3 h-50 stick1 col-lg-4 d-none d-lg-block">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, et?
              </p>
            </div> */}
          </section>
          {/* all users */}
          {/* <h2>community for all users</h2> */}
          <div className="col-lg">
            {data && data.length >= 1 ? (
              <>
                {data?.map((datum) => {
                  const { profilePhoto, followers, userName, _id } = datum;
                  const isFollowing = followers.includes(currentUser?._id);
                  return (
                    <div
                      key={_id}
                      className="d-flex justify-content-between border mb-3 align-items-center p-4"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={profilePhoto}
                          alt=""
                          className="profile-img"
                          style={{
                            borderRadius: "5rem",
                            height: "4rem",
                            width: "5rem",
                          }}
                        />
                        <div className="d-flex flex-column ">
                          <span className=""> {userName} </span>
                          <span className="">{followers?.length} follower</span>
                        </div>
                        <div>
                          {isFollowing ? (
                            <button
                              className="btn rounded-5 border"
                              onClick={() => handleUnfollow(_id)}
                            >
                              Following
                            </button>
                          ) : (
                            <button
                              className="btn rounded-5 border"
                              onClick={() => handleFollow(_id)}
                            >
                              Follow +
                            </button>
                          )}
                        </div>
                      </div>
                      {/* <div>
                          <button className="btn rounded-5 border">
                            follows +
                          </button>
                        </div> */}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <h2>No users yet</h2>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Community;
