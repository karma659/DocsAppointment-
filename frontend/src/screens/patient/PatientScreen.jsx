import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import DoctorCard from "../../components/DoctorCard";

const PatientScreen = () => {
   const [Cards, setCards] = useState([]);
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         var token = Cookies.get("token");

         console.log("token", token);
         const response = await axios.get(
            `/patient/dashboard`
            , {
                 headers: {
                    Authorization: `Bearer ${token}`
                 }
              }
         );
         const data = response.data;
         console.log("data", data, typeof data);
         setCards([...data]);
         setLoading(false);
      } catch (error) {
         console.log("ERROR  ", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className=" ">
         <nav className="flex justify-between items-center shadow py-4 px-8">
            <div className=" text-2xl font-bold"> Dashboard </div>
            <div>
               <Link to={"/patientallapp"}>
                  <button className=" border border-black  py-2 px-4 mr-4">My Appointments</button>
               </Link>
               <Link to={"/"}>
                  <button className="border border-black  py-2 px-4 ">Logout</button>
               </Link>
            </div>
         </nav>

         {loading ? (
            <div className="font-extrabold flex items-center justify-center h-screen ">
               <h1>Loading...</h1>
            </div>
         ) : (
            <div className=" ml-20 mr-20 py-10 justify-center  items-center flex flex-wrap ">
               {Cards.map(card => (
                  <div key={card._id}>
                     <DoctorCard card={card} key={card._id} />
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default PatientScreen;
