import React from 'react';
import editImg from "../assets/editImg.svg"
import BellImg from "../assets/BellImg.svg"
import logout from "../assets/logout.svg"
import { Link, useNavigate } from 'react-router-dom';


const AuthDropDown = () => {
  const Navigate = useNavigate()
  const logOut = ()=>{
    localStorage.removeItem("clientToken")
    Navigate("/")
  }
  return (
    <>
    <main className='p-3 rounded-4 shadow bg-white'>
      <div className='d-flex flex-column'>
      <div className='d-flex gap-2'>
        <img src={editImg} alt="edit-icon" />
        <Link to={"../Registration"} className='text-decoration-none text-black'>
        <p className='my-1'>Edit Profile</p>
        </Link>
      </div>
      <hr />
      <div className='text-center d-flex gap-2'>
        <img src={BellImg} alt="BellImg" /> 
        <p className='my-1'>Notification</p>
      </div>
      <hr />
      <div className='d-flex gap-2'>
        <img src={logout} alt="logout-icon" />
        <Link className='text-decoration-none text-black'>
        </Link>
        <p className='my-1' onClick={logOut}>Log Out</p>
      </div>
      <hr />

      </div>
    </main>
    
    </>
  )
}

export default AuthDropDown