import React, { useState,useEffect } from 'react'
import manImg from "../assets/man-Img.png"
import locationImg from "../assets/location-Img.svg";
import occupationImg from "../assets/occupationImg.svg";
import xImg from "../assets/x-Img.svg";
import LinkedInImg from "../assets/linkedIn-Img.svg";

const Bio = () => {
  const [bioProfile,setBioProfile] = useState([]);

   // const bioProfile = 
  const token = localStorage.getItem("clientToken")
  const getBioProfile = async ()=>{
    try {
      const request = await fetch("https://em-backend-project-0fu5.onrender.com/api/v1/users",{
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      const response = await request.json();
      console.log(response.user);
      setBioProfile(response.user)
      
    } catch (error) {
      console.log(error.message);
    }
  }

  

  
  useEffect(() => {
    // document.title = "Home | Page";
    
    getBioProfile()
  },[]); 

  return (
    <>
    <main className='container-fluid bg-light '>
    <div className="row">
            <div className="bg-white rounded mt-3 h-50 stick1 col-lg-4 d-none d-lg-block">
              <img
                src={bioProfile.profilePhoto}
                alt="man-Img"
                className="img-fluid rounded-circle profile1 w-25"
              />
              <div className="my-1">
                <h3>{bioProfile.userName}</h3>
                <h6 className="fw-none">0 Friends</h6>
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
                  <img src={locationImg} alt="location-Img" className="icons" />
                  <p>{bioProfile.location}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src={occupationImg} alt="bag-icon" className="icons" />
                  <p>{bioProfile.occupation}</p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <h2>Socials</h2>
              <div className="mb-3">
                <div className="d-flex align-items-center gap-3">
                  <img src={xImg} alt="twittwer-icon" className="icons" />
                  <p>{bioProfile.x}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <img src={LinkedInImg} alt="linkedIn-Img" className="icons" />
                  <p className="text-center my-2">{bioProfile.linkedIn}</p>
                </div>
              </div>
            </div>
          </div>
    </main>
    </>
  )
}

export default Bio