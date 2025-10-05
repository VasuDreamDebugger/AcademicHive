import React, { useState,useEffect } from 'react';
import toast,{Toaster} from "react-hot-toast";
import {customAxios} from '../lib/axios.js'
import { useNavigate } from 'react-router-dom';

// const LoginOptions = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginType, setloginType] = useState('Student');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Replace with actual login logic
//     console.log({ email, password,loginType});
//     try{
//         const response =await customAxios.post("/auth/login",{email,password,loginType});
//         toast.success(response.data.message);
//         navigate("/");

//     }catch(error){
//         toast.error(response.data.message);
//       console.error(error.stack);
//     }

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-white">
//         <Toaster />
       
//       <div className="md:w-1/2 bg-indigo-50 flex flex-col items-center justify-center p-10 text-center">
//         <div className="mb-6">
//           <div className="text-4xl font-bold text-indigo-700">InfoSNity</div>
//           <div className="text-gray-600 mt-2">Smart Information Sharing Software</div>
//         </div>
         
//       </div>

      
//       <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
//         <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-purple-300 rounded-lg p-6 shadow-md">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in</h2>

//           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="example.email@gmail.com"
//             className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             placeholder="Enter at least 8+ characters"
//             className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
          

//           <div className="mb-4">
//             <span className="block text-sm font-medium text-gray-700 mb-2">Select Role:</span>
//             <div className="flex gap-4">
//               {['Student', 'Faculty'].map((r) => (
//                 <label key={r} className="flex items-center gap-1 text-sm text-gray-600">
//                   <input
//                     type="radio"
//                     name="loginType"
//                     value={r}
//                     checked={loginType === r}
//                     onChange={() => setloginType(r)}
//                   />
//                   {r}
//                 </label>
//               ))}
//             </div>
//           </div>

           

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
//           >
//             Sign in
//           </button>

         
//         </form>

        
//       </div>
//     </div>
//   );
// }};

// import React, { useState } from 'react';
// import toast, { Toaster } from "react-hot-toast";
// import { customAxios } from '../lib/axios.js';
// import { useNavigate } from 'react-router-dom';





const LoginOptions = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setloginType] = useState('Student');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setloginType('Developer');
         
        toast('Developer mode unlocked..');
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        setloginType('Student'); // or 'Faculty' as default
        //setShowDeveloper(false);
        toast('Switched to normal mode..');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loaderToastId =toast.loading("Waking up the backend..");
    console.log({ email, password, loginType });

    try {
      if(loginType==="Developer"){
          const response = await customAxios.post("/auth/login/developer",{email,password});
          toast.dismiss(loaderToastId);
          toast.success("login success..")
          console.log("Dev s",response.data.data);
          navigate("/devlogin");
      }
      else{
        const response = await customAxios.post("/auth/login", { email, password, loginType });
        toast.dismiss(loaderToastId);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.dismiss(loaderToastId);
      toast.error(error.response?.data?.message || "Login failed");
      console.error(error.stack);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <Toaster />

      <div className="md:w-1/2 bg-indigo-50 flex flex-col items-center justify-center p-10 text-center">
        <div className="mb-6">
          <div className="text-4xl font-bold text-indigo-700">InfoSNity</div>
          <div className="text-gray-600 mt-2">Smart Information Sharing Software</div>
        </div>
      </div>

      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-purple-300 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in</h2>

          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="example.email@gmail.com"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter at least 8+ characters"
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700 mb-2">Select Role:</span>
            <div className="flex gap-4">
              {['Student', 'Faculty'].map((r) => (
                <label key={r} className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="radio"
                    name="loginType"
                    value={r}
                    checked={loginType === r}
                    onChange={() => setloginType(r)}
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label className="text-sm text-gray-600">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginOptions;


 
