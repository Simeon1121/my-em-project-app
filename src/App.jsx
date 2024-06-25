import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import NavBar from "./Layouts/NavBar";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import ForgetPassword from "./Auth/ForgetPassword";
import Hero from "./Components/Hero";
import Profile from "./Pages/Profile";
import FriendProfile from "./Pages/FriendProfile";
import Post from "./Components/Post";
import Error from "./Pages/Error";
import { Toaster } from 'react-hot-toast';
import Community from "./Pages/Community";
import SingleUserProfile from "./Pages/SingleUserProfile";
import Registration from "./Pages/Registration";
import Bio from "./Components/Bio";
import ResetPassword from "./Auth/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<><NavBar /></>}>
          {/* <Route path="/Home" element={<Home />} /> */}
          <Route path="/Hero" element={<Hero/>}/>
          <Route path="Bio" element={<Bio/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/FriendProfile" element={<FriendProfile/>}/>
          <Route path='/singleuserprofile/:userId' element={<SingleUserProfile/>}/>
          {/* <Route Path = "/Home" element={<Home/>}/> */}

          </Route>
          <Route path="/Post" element={<Post/>}/>
          <Route path="/Registration" element={<Registration/>}/>

          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/Community" element={<Community/>}/>
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/resetpasswordlink/:resetToken" element={<ResetPassword/>}/>
          <Route path="*" element = {<Error/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  );
}

export default App;
