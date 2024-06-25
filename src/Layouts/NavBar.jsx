import React, { useState, useCallback, useEffect } from "react";
import FrameImg from "../assets/Frame-Img.svg"
import { RiSearchLine } from "react-icons/ri";
import Form from "react-bootstrap/Form";
import HomeImg from "../assets/home-Img.svg"
import CommunityImg from "../assets/community-Img.svg"
import NotificationImg from "../assets/BellImg.svg"
import manImg from "../assets/man-Img.png"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import debounce from 'lodash.debounce';
import "../Styles/NavBar.css"
import AuthDropDown from "../Auth/AuthDropDown"
import OffCanvas from "../Components/OffCanvas"

const NavBar = () => {
  // updating profile pic
  const [bioProfile, setBioProfile] = useState([]);
  const [authShow, setAuthshow] = useState(false);
  // search bar function to work
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = localStorage.getItem("clientToken")
  // const navigate = useNavigate();
  
  
    
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



  const performSearch = useCallback(
    async (term) => {
      if (term) {
        try {
          const request = await fetch(
            `https://em-backend-project-0fu5.onrender.com/api/v1/users/search?searchTerm=${term}`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await request.json();
          if (response.success) {
            setSearchResults(response.users);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.log(error.message);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    },
    [token]
  );
  const debouncedSearch = useCallback(
    debounce((term) => {
      performSearch(term);
    }, 300),
    [performSearch]
  );
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  useEffect(()=>{
    getBioProfile()
  },[]);



  return (
    <>
      <main className="container-fluid ">
        <nav className="container">
          <div className=" d-md-flex justify-content-between mt-4">
            <div className="d-md-flex gap-3  ">
              <img
                src={FrameImg}
                alt="Frame-Img"
                className="img-fluid logo imgsize  bg-white mt-3 "
              />
              <Form className="mt-3">
                <Form.Group
                  className="mb-3 position-relative d-none d-lg-block"
                  controlId="formGroupEmail"
                >
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="bg-light rounded-5 shift3 "
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="position-absolute top-50 start-0 translate-middle-y p-2 text-secondary ">
                    <RiSearchLine className="my-5  " />
                  </div>

                  <div>
             {searchTerm && (
              <div className="search-results position-absolute z-1 bg-secondary text-white border rounded w-100">
                {searchResults.length ? (
                  searchResults.map(user => (
                    <div key={user._id} className="search-result-item">
                      <Link className="text-decoration-none text-white" to={`/singleuserprofile/${user._id}`}>
                            
                      {user.userName}
                            </Link>
                    </div>
                  ))
                ) : (
                  <div className="search-no-results">No results found</div>
                )}
              </div>
            )}
             </div>


                  
                </Form.Group>
              </Form>
            </div>
            <div className="d-flex nav1 justify-content-sm-between gap-3 text-center">
              <div>
                <Link to="/Hero">
                  <img src={HomeImg} alt="Home-Img" className="profile" />
                </Link>
                <p className="d-none d-lg-block ">Home</p>
              </div>
              <Link to="/Community" className="text-decoration-none">
              
              <div>
                <img
                  src={CommunityImg}
                  alt="Community-Img"
                  role="button"
                  className="profile"
                />
                <p className="d-none d-lg-block">Community</p>
              </div>
              </Link>
              <div>
                <img src={NotificationImg} alt="Notification-Img" className="profile d-md-none d-block" />
                <p className="d-none d-block">Notification</p>
              </div>
              <div className="d-sm-none d-block">
                <OffCanvas/>
              </div>
              <div className="d-none d-md-block">
                <img
                  src={bioProfile?.profilePhoto}
                  alt="notification-icon"
                  className="img-fluid profile rounded-circle"
                />

                {/* dropdown */}
                <div
                  className="position-relative d-flex align-items-center"
                  role="button"
                  onClick={() =>
                    !authShow ? setAuthshow(true) : setAuthshow(false)
                  }
                >
                  <p className="d-none d-lg-block"> Me </p>
                  {!authShow ? (
                    <div className="d-none d-lg-block text-secondary mb-3">
                      <GoChevronUp />

                    </div>
                  ) : (
                    <div className="d-none d-lg-block mb-3 text-secondary">
                      <GoChevronDown />
                    </div>
                  )}
                  <div className="position-absolute top-100 end-0 mt-2">
                    {authShow && <AuthDropDown />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;