import React, {useState, useContext, useEffect} from "react";

import axios from "axios";

import {SocketContext} from "../Context";
import Cookies from "js-cookie";
import { BACKEND_URL } from "../config";

const Sidebar = ({data, children}) => {
   const {me, callAccepted, name, callEnded, leaveCall, callUser, stream} =
      useContext(SocketContext);
   const [idToCall, setIdToCall] = useState("");
   const [Role, setRole] = useState("");

   const fetchdata = async () => {
      var token = Cookies.get("token");
      console.log(token, data);
      const response = await axios.get(`${BACKEND_URL}/appointment/video/${data.appointmentId}`);
      console.log("response ", response.data);

      if (data.role === "doctor") {
         setRole("doctor");
         setIdToCall(response.data.patientId);
      } else if (data.role === "patient") {
         setRole("patient");
         setIdToCall(response.data.doctorId);
      }
   };

   useEffect(() => {
      fetchdata();
      return () => {
         console.log("end s");
        
      };
   }, []);

   const handleclick = e => {
      e.preventDefault();

      callUser(idToCall);
   };
   const handlecallend = e => {
      e.preventDefault();

      leaveCall();
      if (stream) {
         stream.getTracks().forEach(track => track.stop());
      }

      if (Role === "patient") {
         window.location.href = "/patientallapp";
      } else if (Role === "doctor") {
         window.location.href = "/doctorScreen";
      }
   };

   return (
      <div className="bg-blue-500 ml-5">
         <form className=" text-center flex flex-col items-center justify-center">
            <div className="flex ml-5">
               <div className="flex flex-col w-[50%] mr-5">
                  <h3>Account Info</h3>
                  {/* <input
                     className="Name border border-black"
                     value={name}
                     onChange={e => setName(e.target.value)}
                  /> */}
                  <h1>{name}</h1>
                  <h1>{me}</h1>
               </div>
               <div className=" flex-col ml-10 w-[60%] ">
                  <h3>Make a call </h3>
                  <h1>{idToCall}</h1>
                 </div>
                 <div className="mx-5"> 
                  {callAccepted && !callEnded ? (
                     <button className="bg-red-700" onClick={e => handlecallend(e)}>
                        Hang Up
                     </button>
                  ) : (
                     <button
                        variant="contained"
                        color="primary"
                        onClick={e => handleclick(e)}
                        className="bg-green-500  py-2 px-20 m-2">
                        Call
                     </button>
                  )}
               </div>
            </div>
         </form>
         {children}
      </div>
   );
};

export default Sidebar;
