import axios from "axios";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const AdminScreen = () => {
   const navigate = useNavigate();
   const [Cards, setCards] = useState([]);
   const [loading, setLoading] = useState(true);
   var token = Cookies.get("token");
   console.log("token", token);

   const fetchData = async () => {
      try {
         const response = await axios.get(`/appointment/`, {
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

   const handleEdit = async card => {
      navigate("/adminUpdateApp", {state: card});
   };

   const handleDelete = async Id => {
      try {
         const response = await axios.delete(`/appointment/delete/${Id}`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         console.log(response.data);
         fetchData();
      } catch (err) {
         console.log("ERROR ", err);
      }
   };

   return (
      <div>
         <nav className="flex justify-between items-center shadow py-4 px-8">
            <div className=" text-2xl font-bold"> All appoinments </div>
            <div>
               <Link to={"/adminPatientDoctor"}>
                  <button className="border border-black  py-2 px-4 mr-2">
                     Create Appointment
                  </button>
               </Link>
               <Link to={"/"}>
                  <button className="border border-black  py-2 px-4 ">Logout</button>
               </Link>
            </div>
         </nav>

         {loading ? (
            <div className="text-center flex justify-center items-center font-extrabold">
               Loading...
            </div>
         ) : (
            <div className=" ml-20 mr-20 flex flex-wrap ">
               {Cards.map(card => (
                  <div className="m-3 border border-black p-2 shadow flex" key={card._id}>
                     <div className="w-[50%]">
                        <h1>Doctor Name : {card.doctor.name} </h1>
                        <h1>Doctor Email : {card.doctor.email} </h1>

                        <h1>Patient Name : {card.patient.name} </h1>
                        <h1>Patient Email : {card.patient.email} </h1>
                        <button
                           className="border border-black bg-green-300 py-2 px-4 "
                           onClick={() => handleEdit(card)}>
                           Edit
                        </button>
                     </div>
                     <div className="w-[50%]">
                        <h1>Date : {card.date} </h1>
                        <h1>Time : {card.time} </h1>
                        <h1>VideoConsultation : {card.isVideoConsultation ? "True" : "False"} </h1>
                        <button
                           className="border border-black bg-red-300 py-2 px-4 "
                           onClick={() => handleDelete(card._id)}>
                           Delete
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default AdminScreen;
