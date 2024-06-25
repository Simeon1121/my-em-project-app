import React, { useState } from "react";
import { useEffect } from "react";
import manImg from "../assets/man-Img.png";
import locationImg from "../assets/location-Img.svg";
import occupationImg from "../assets/occupationImg.svg";
import xImg from "../assets/x-Img.svg";
import LinkedInImg from "../assets/linkedIn-Img.svg";
import galleryImg from "../assets/gallery-Img.png";
import TimeAgo from "./TimeAgo";
import { data } from "../../Db";
import { Link } from "react-router-dom";
import Post from "../Components/Post";
import { Spinner } from "react-bootstrap";
// import "../Styles/Hero.css"
import CommentModal from "../Components/Comments";
import NavBar from "../Layouts/NavBar";


import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PostSchema } from "../Utils/ValidationSchema";

const Hero = () => {
  const [timeLine,setTimeLine] = useState([]);
  const [bioProfile, setBioProfile] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);
  const token = localStorage.getItem("clientToken");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(PostSchema),
    defaultValues: {
      text: "",
    },
  });

  const getBioProfile = async () => {
    try {
      const request = await fetch(
        "https://em-backend-project-0fu5.onrender.com/api/v1/users",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.json();
      console.log(response.user);
      setBioProfile(response.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  // 03/06/2024
  // handle post function
  const handlePost = async (data) => {
    try {
      const request = await fetch(
        "http://localhost:5340/api/v1/posts/create-post",{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(data),
        }
      );
      // getTimeLine
      const response = await request.json();
      console.log(response);
      if (!response.success) {
        reset();
        // toast.success(response.message);
        getTimeLine();


      }
    } catch (error) {
      console.log(error);
    }
  };

// TimeLine function
const getTimeLine = async (req,res) => {

  try {
    const request = await fetch("http://localhost:5340/api/v1/posts/timeline", {
    headers: {
      "Content-type": "application/json",
      Authorization:`Bearer ${token}`,
    },
    }

    );

    const response = await request.json();
    console.log(response.posts);
    setTimeLine(response?.posts || []);

  } catch (error) {
    console.log(error.message);
  }
}



  useEffect(() => {
    document.title = "Hero | Page";
    getBioProfile();
    handlePost();
    setTimeLine();
  }, []);

  return (
    <>
      {/* <NavBar/> */}

      <main className="container-fluid bg-light">
        <section className="container">
          <div className="row ">
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

            <div className="rounded mt-3 d-flex flex-wrap gap-2 col-lg-8">
              <form className="bg-white w-100" onSubmit={handleSubmit(handlePost)}>



              <div >
                <div className="d-flex search gap-3 p-3 ">
                  <img
                    src={bioProfile.profilePhoto}
                    alt="profile-pics"
                    className="img-fluid profile rounded-circle "
                  />
                  <input 
                    type="text"
                    placeholder="What do you want to ask or share?"
                    className="bg-light rounded-5  w-100 shift"
                    {...register("text", { required: true })}
                  />
                  
                  {/* <span className="text-danger">{errors.Post?.message}</span> */}
                </div>
                  <p className="text-danger">{errors.text?.message} </p>
                <div className="d-flex justify-content-between p-3 ">
                  <img src={galleryImg} role="button" alt="image-icon" />
                  {/* <Link to={"../Post"}>
                  </Link> */}
                  <button className="button1 btn btn-lg btn-primary text-white rounded-5" onClick={handleSubmit} >
                    <Post />
                  </button>
                </div>
              </div>
              </form>

              {data.map((datum) => {
                const {
                  id,
                  title,
                  time,
                  description,
                  image,
                  profile,
                  statusbar,
                  icon,
                  icon2,
                  icon3,
                } = datum;
                return (
                  <div
                    key={id}
                    className="p-3 my-2 bg-white rounded5 d-flex flex-column"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-2">
                        <img
                          src={profile}
                          alt="profile-image"
                          className=" imgmobile imglg rounded-pill"
                        />
                        <div>
                          <Link
                            to={"../FriendProfile"}
                            className="text-decoration-none text-black"
                          >
                            <h3 role="button" className="title">
                              {title}
                            </h3>
                          </Link>

                          <h6 className="time">{time}</h6>
                        </div>
                      </div>
                      <button className="btn status btn-white border rounded-5 button1 ">
                        {statusbar}
                      </button>
                    </div>
                    <p className="mt-2 description">{description}</p>
                    <img src={image} alt="feed-image" className="img-fluid" />
                    <div
                      role="button"
                      className="d-flex justify-content-between mt-2"
                    >
                      <div className="d-flex gap-2">
                        <img src={icon} alt="heart-icon" className="icon" />
                        {/* <Link to={"../Comments"}>
                        </Link> */}
                        <CommentModal 
                        postId={_id}
                        />
                        {/* <img src={icon2} alt="message-icon" className="icon" /> */}
                      </div>
                      <img src={icon3} alt="send-icon" className="icon" />
                    </div>
                  </div>
                );
              })}
              <div>
                {/* <div className="d-flex flex-wrap gap-3">
            <Fetch/>
            </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;
