import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../config";

const Signup = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [dataa, setdata] = useState("");
   const [role, setrole] = useState("");

   const handleclick = value => {
      console.log("Button clicked with data:", value);
      setrole(value);
   };

   const handleSignup = async e => {
      e.preventDefault();

      try {
         const response = await axios.post(`${BACKEND_URL}/${role}/signup`, {
            name: username,
            email: email,
            password: password
         });

         if (response.status === 200) {
            // console.log("data",response.data);
            setdata(response.data.msg);
         } else {
            console.log("Sign Up Successful", response.status);
            navigate("/Login",{state: role});
         }
      } catch (error) {
         console.log("ERROR signup ", error);
      }
   };

   return (
      <div className="h-screen">
         <div className=" pl-20 pr-20 pt-2 pb-2 mb-2 fixed w-screen expand-lg h-[50px] flex flex-row-reverse ">
            <div>
               <Link to={"/"}>
                  <button className=" border-2 border-black p-2 m-2">Home</button>
               </Link>
            </div>
            <div>
               <Link to={"/Login"}>
                  <button className=" border-2 border-black p-2 m-2">Login</button>
               </Link>
            </div>
         </div>
         <div className=" flex ">
            <div className=" w-[30%]  flex flex-col  text-center  justify-evenly m-10 ">
               <button
                  className=" md:pl-20 md:pr-20 pt-1 pb-2    border-black  border-2   hover:bg-gray-200"
                  onClick={() => handleclick("patient")}>
                  Patient
               </button>
               <button
                  className=" md:pl-20 md:pr-20 pt-1 pb-2   border-black  border-2   hover:bg-gray-200"
                  onClick={() => handleclick("doctor")}>
                  Doctor
               </button>
               <button
                  className=" md:pl-20 md:pr-20 pt-1 pb-2    border-black  border-2   hover:bg-gray-200"
                  onClick={() => handleclick("admin")}>
                  Admin
               </button>
            </div>

            <div className="w-[60%] flex items-center justify-center h-screen      ">
               {role ? (
                  <div className="">
                     <div>
                        <h1 className="text-3xl text-red-700 ">
                           Sign up as <span className="text-4xl text-bold">{role} !</span>{" "}
                        </h1>
                     </div>
                     <form className=" flex-col  h-[100%] " onSubmit={handleSignup}>
                        <label className=" flex-col ">
                           <h6>{role} name</h6>
                           <input
                              className=" border-2 border-neutral-400"
                              type="text"
                              placeholder="name"
                              value={username}
                              onChange={e => setUsername(e.target.value)}
                           />
                        </label>
                        <br />
                        <label className="flex-col">
                           <h6>{role} email</h6>
                           <input
                              className=" border-2 border-neutral-400"
                              type="text"
                              placeholder="email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                           />
                        </label>
                        <br />
                        <label className="flex-col">
                           <h6>{role} password </h6>
                           <input
                              className=" border-2 border-neutral-400"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                           />
                        </label>
                        <br />
                        <button
                           className="bg-red-700 rounded-md text-white p-2 mt-2 "
                           type="submit">
                           Sign Up
                        </button>
                     </form>
                     <h1>{dataa}</h1>
                  </div>
               ) : (
                  <div>
                     <h1 className="text-3xl text-black "> ← Click to Signup </h1>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Signup;
