import React, { useState,useEffect } from 'react';
import {useNavigate,Link} from "react-router-dom"
import {customAxios} from "../lib/axios.js"


const LoginComponent =()=> {
  const Navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message,setMessage] =useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
     
   
    try {
        const res = await customAxios.post("/auth/login/developer", { email, password });
        console.log("response",res.data);
        setMessage(res.data.message || 'Login successful');
         
        //Navigate("/");
        setEmail('');
        setPassword('');
      } catch (error) {
        if (error.response) {
          console.error('Login failed:', error.response.data);
           setMessage(error.response.data.message || 'Login Failed');
        } else {
          console.error('Network error:', error.message);
          alert('Network error. Please try again later.');
        }
      }
  };
  return(
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Log In
            </button>
            <p>{message}</p>
          </form>
        </div>
      </div>)
    
}

const UserProfile =(props)=>{
  const {userDetails}=props

  return(
    <div className=" min-h-screen flex flex-col justify-center items-center p-8 rounded-lg shadow-xl mx-auto">
  <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome, {userDetails.name.split("Dev")[0]}</h1>
  <p className="text-lg text-gray-600 mb-2">You're logged in as a developer. Here's what you can do next:</p>
  <p className="text-md text-gray-700 font-medium mb-8">Create an account for:</p>

  <div className="flex gap-6">
    <Link to="/create/student">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300">
        Student
      </button>
    </Link>

    <Link to="/create/faculty">
      <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300">
        Faculty
      </button>
    </Link>
  </div>
</div>

  
  )
}

const DevLoginPage = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userDetails,setUserDetails]=useState('Developer');

 useEffect(()=>{
  
  const getUser =async()=>{
    console.log("useEffe")
  try{  
  const response = await customAxios.get("/auth/user/me");
  setIsLoggedIn(true);
  setUserDetails(response.data.dev);
  console.log("user/me",response.data);
  }
  catch(error){
    console.log(error.stack);
  }
  }
  getUser();
 },[])  

 

  

  return (
    !isLoggedIn ? <LoginComponent /> : <UserProfile  userDetails={userDetails}/>
  );
};

export default DevLoginPage;
