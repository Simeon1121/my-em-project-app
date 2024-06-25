import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Bio from "../Components/Bio"

const SingleUserProfile = () => {
    const [data,setData] = useState([])
    const {userId} = useParams();
    console.log(userId);
    const getData = async()=>{
        const request = await fetch(`https://em-backend-project-0fu5.onrender.com/api/v1/users/userprofile/${userId}`);
        const response = await request.json();
        console.log(response.user);
        setData(response.user)
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <>
    <main className='container'>
        <div className='row'>
            <section className='border   bg-white rounded mt-3 h-50 stick1 col-lg-4 d-none d-lg-block'>
              <Bio/> 
              <p>{data?.following?.length} Following</p> 
              <p>{data?.followers?.length} Followers</p> 
            </section>
            <section className='mt-3  col-lg-8'>
                <h2>Single user</h2>
            </section>
        </div>
    </main>
    
    
    </>
  )
}

export default SingleUserProfile