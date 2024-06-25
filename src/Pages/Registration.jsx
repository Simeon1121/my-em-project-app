import React from "react";
import { useState, useEffect } from "react";
import profile from "../assets/profile.svg";
import Form from "react-bootstrap/Form";
import xImg from "../assets/x-Img.svg";
import linkedInImg from "../assets/linkedIn-Img.svg";
import BioImg from "../assets/BioImg.svg";
import ageImg from "../assets/age-Img.svg";
import genderImg from "../assets/gender-Img.svg";
import locationImg from "../assets/location-Img.svg";
import occupationImg from "../assets/occupationImg.svg";
import { Link, useNavigate } from "react-router-dom";

import { IoMailOutline } from "react-icons/io5";
import toast from "react-hot-toast";
// import "../style/Registration.css"

const Registration = () => {
  const [bioProfile, setBioProfile] = useState([]);
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [x, setX] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [selectedFile,setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(profile)
  const navigate = useNavigate()
const token = localStorage.getItem("clientToken")
  const getBioProfile = async () => {
    try {
      const request = await fetch("https://em-backend-project-0fu5.onrender.com/api/v1/users", {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await request.json();
      setBioProfile(response.user);
      setBio(response.user.bio);
      setLocation(response.user.location);
      setOccupation(response.user.occupation);
      setX(response.user.x);
      setLinkedIn(response.user.linkedIn);
      setAge(response.user.age || "");
      setGender(response.user.gender || "");
      setPreview(response.user.profilePhoto || profile)
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
        setPreview(reader.result);
    };
    if (file) {
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("age", age);
    formData.append("location", location);
    formData.append("gender", gender);
    formData.append("occupation", occupation);
    formData.append("x", x);
    formData.append("linkedIn", linkedIn);
    if (selectedFile) {
      formData.append("profilePhoto", selectedFile);
    }
    try {
        const response = await fetch("http://localhost:5340/api/v1/users/update-profile",{
            method: "PATCH",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        console.log(result);
        if(result){
        // setIsClicked(true)
        toast.success(result.message)
        navigate('/Hero')

        }
      
    } catch (error) {
        console.error("Error updating profile:", error)

    }finally {

    }
}

  useEffect(() => {
    getBioProfile();
  }, []);

  return (
    <>
      <main className="container my-5">
        <h4 className=" my-2">
          Hi,<span className="text-primary"> {bioProfile?.userName} </span>
        </h4>
        <h2>Complete Your Profile</h2>
        <section className=" ">
        
              <Form className="row gap-5 p-2" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="col-md-5  d-flex flex-column justify-content-between">
            <img src={preview} alt="profile-img" className="w-100 mb-2 rounded-circle" />
            <div>
              <input
                type="file"
                className="border border-primary rounded fs-6 w-100"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="col-md-5 w-50 ">
            <div>
              <h3 className="mb-3">Basic Information</h3>
                {/* for bio */}
                <Form.Group
                  className="mb-2  position-relative"
                  controlId="BioForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Bio"
                    className="bg-light py-2 w-100 shift3 "
                    value={bio}
                    onChange={(e) => setBio (e.target.value)}
                  />
                  <div className="position-absolute top-0 start-0 translate-middle-y p-2 text-primary ">
                    <img
                      src={BioImg}
                      alt="document-icon"
                      className=" img-fluid w-100 mt-5 "
                    />
                  </div>
                </Form.Group>

                {/* for age */}
                <div className=" d-flex gap-2 ">
                  <div className="w-50">
                    <Form.Group
                      className="mb-2  position-relative"
                      controlId="formGroupEmail"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        className="bg-light py-3 w-100  shift3"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                        <img src={ageImg} alt="" className=" img-fluid" />
                      </div>
                    </Form.Group>
                  </div>

                  {/* for gender */}
                  <div className="w-50">
                    <Form.Group
                      className="mb-2 position-relative"
                      controlId="formGroupEmail"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Gender"
                        className="bg-light py-3 w-100 shift3"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                        <img
                          src={genderImg}
                          alt="linkedin-icon"
                          className=" img-fluid  "
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>

                {/* for location */}

                <Form.Group
                  className="mb-2 position-relative"
                  controlId="formGroupEmail"
                >
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    className="bg-light py-3 w-100 shift3"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                    <img
                      src={locationImg}
                      alt="linkedin-icon"
                      className=" img-fluid w-50  "
                    />
                  </div>
                </Form.Group>

                {/* for occupation */}
                <Form.Group
                  className="mb-3 position-relative"
                  controlId="formGroupEmail"
                >
                  <Form.Control
                    type="text"
                    placeholder="Occupation"
                    className="bg-light py-3 w-100 shift3"
                    value={occupation}
                    onChange={(e) => setOccupation (e.target.value)}
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                    <img
                      src={occupationImg}
                      alt="linkedin-image"
                      className=" img-fluid w-50  "
                    />
                  </div>
                </Form.Group>
            
            </div>
            <div className="my-4">
              <h3>Social</h3>

              {/* socials twitter account */}
              <Form.Group
                className="mb-2 position-relative"
                controlId="formGroupEmail"
              >
                <Form.Control
                  type="text"
                  placeholder="X-App"
                  className="bg-light py-3 mt-3 w-100 shift3"
                  value={x}
                  onChange={(e) =>  setX(e.target.value)}
                />
                <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                  <img
                    src={xImg}
                    alt="twitter-image"
                    className="img-fluid w-50 "
                  />
                </div>
              </Form.Group>

              {/* for linkedIn */}
              <Form.Group
                className="mb-3 position-relative"
                controlId="formGroupEmail"
              >
                <Form.Control
                  type="text"
                  placeholder="LinkedIn"
                  className="bg-light  ps-5 w-100 shift3 "
                  value={linkedIn}
                  onChange={(e) =>  setLinkedIn(e.target.value)}
                />
                <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-primary ">
                  <img
                    src={linkedInImg}
                    alt="linkedin-image"
                    className=" img-fluid w-100  "
                  />
                </div>
              </Form.Group>
            </div>
          
              <button className="btn btn-primary rounded-pill w-100 btn-lg">
                Continue
              </button>
          </div>
          </Form>
        </section>
      </main>
    </>
  );
};

export default Registration;
