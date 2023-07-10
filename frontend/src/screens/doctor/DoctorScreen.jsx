import axios from "axios";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const DoctorScreen = () => {
   const navigate=useNavigate();
   const [Cards, setCards] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         var token = Cookies.get("token");

         console.log("token", token);
         const response = await axios.get(`doctor/appointments`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         const data = response.data;
         console.log("data", data, typeof data);
         setCards([...data.Appointments]);
         setLoading(false);
      } catch (error) {
         console.log("ERROR  ", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleclick=(id)=>{
      const data={
         appointmentId:id,
         role:"doctor"
      }
      navigate("/Video",{state:data})
      
      }

      const handleLogout = () => {
       
         Cookies.remove("token"); 

         navigate("/");
      };

   return (
      <div>
         <nav className="flex justify-between items-center shadow py-4 px-8">
            <div className=" text-2xl font-bold"> My appoinments </div>
            <div>
         
                  <button className="border border-black  py-2 px-4 " onClick={handleLogout}>Logout</button>
             
            </div>
         </nav>

         {loading ? (
            <div className="text-center flex justify-center items-center font-extrabold">
               Loading...
            </div>
         ) : (
            <div className=" ml-20 mr-20 flex flex-wrap ">
               {Cards.map(card => (
                  <div className="m-3 border border-black p-2 shadow" key={card._id}>
                     <h1>{card._id}</h1>
                     <h1>Name : {card.patient.name} </h1>
                     <h1>Email : {card.patient.email} </h1>
                 
                     <h1>Date : {card.date} </h1>
                     <h1>Time : {card.time} </h1>
                     <h1>VideoConsultation : {card.isVideoConsultation ? "True" : "False"} </h1>
                     <button className="bg-green-400 p-2 " onClick={()=>handleclick(card._id)}>Call</button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default DoctorScreen;
