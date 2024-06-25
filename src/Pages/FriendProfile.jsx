import React from 'react'
import woman1 from "../assets/woman1.png"
import followerImg from "../assets/followerImg.svg"
import followingImg from "../assets/followingImg.svg"
import likeImg from "../assets/likeImg.svg"
import locationImg from "../assets/location-Img.svg"
import occupationImg from "../assets/occupationImg.svg"
import xImg from "../assets/x-Img.svg"
import linkedInImg from "../assets/linkedIn-Img.svg"
import { data } from "../../Db";
import { Link } from "react-router-dom";
import Post from "../Components/Post";



const FriendProfile = () => {
  return (
    <>
    <main className="container-fluid bg-light">
      <section className="container">
        <div className="row">
        <div className="bg-white rounded mt-3 h-50 stick1 col-lg-4 d-none d-lg-block ">
              <div className="d-flex align-items-center mt-3 gap-3">
                <img
                  src={woman1}
                  alt="man-Img"
                  className="img-fluid rounded-circle profile1"
                />
                <div className="mt-4">
                  <h3>Yuji Itadori</h3>
                  {/* <p>0 Friends</p> */}
                </div>
              </div>
              <hr />
              <div>
                <h2>Bio</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Mi nec turpis
                  vulputate sed. Tellus quisque pharetra facilisi nisl nisi
                  consectetur. Sed in nisi convallis vitae tortor rhoncus.
                </p>
              </div>
              <hr />
              <div>
                <h2>Activities</h2>
                <span>
                  <div>

                  <img src={followerImg} alt="" />
                  </div>
                  <div>

                  <img src={followingImg} alt="" />
                  </div>
                  <div>

                  <img src={likeImg} alt="" />
                  </div>
                </span>
              </div>

              <div className="rounded mt-3 d-flex flex-wrap gap-2 col-lg-8">
              <div className="bg-white w-100">
                <div className="d-flex search gap-3 p-3 ">
                  <img
                    src={woman1}
                    alt="profile-pics"
                    className="img-fluid profile rounded-circle "
                  />
                  <input
                    type="text"
                    placeholder="What do you want to ask or share?"
                    className="bg-light rounded-5  w-100 shift"
                  />
                </div>
                {/* <div className="d-flex justify-content-between p-3 ">
                  <img src={galleryImg} role="button" alt="image-icon" /> */}
                  {/* <Link to={"../Post"}>
                  </Link> */}
                  {/* <button className='button1 btn btn-lg btn-primary text-white rounded-5'>
                  <Post />

                  </button>
                </div> */}
              </div>

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
                        {/* <CommentModal /> */}
                        <img src={icon2} alt="message-icon"  className="icon"/>
                      </div>
                      <img src={icon3} alt="send-icon" className="icon" />
                    </div>
                  </div>
                );
              })}
              <div>
                <div className="d-flex flex-wrap gap-3">
            {/* <Fetch/> */}
            </div>
              </div>
            </div>








              <div>
                <h2>Info</h2>
                <div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={locationImg} alt="location-Img" className="" />
                    <p>Lagos, Nigeria</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={occupationImg} alt="bag-icon" />
                    <p>Realtor</p>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <h2>Socials</h2>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <img src={xImg} alt="twitter-Img" />
                    <p>Twitter</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src={linkedInImg} alt="linkedin-icon" />
                    <p>LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
    </main>
    </>
  )
}

export default FriendProfile