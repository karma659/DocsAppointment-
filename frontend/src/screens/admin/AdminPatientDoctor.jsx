import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const AdminPatientDoctor = () => {
   const navigate = useNavigate();
   const [Cards, setCards] = useState([]);
   const [Cards1, setCards1] = useState([]);
   const [loading, setLoading] = useState(true);
   const [Patient, setPatient] = useState({});
   const [Doctor, setDoctor] = useState({});
   const [dataa, setdataa] = useState("");
   var token = Cookies.get("token");

   const fetchData = async () => {
      try {
         const response = await axios.get(`/admin/patients`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         const response1 = await axios.get(`/admin/doctors`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         const data = response.data;
         const data1 = response1.data;
         console.log("data", data, data1);
         setCards([...data]);
         setCards1([...data1]);
         setLoading(false);
      } catch (error) {
         console.log("ERROR  ", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handlePatientSelect = card => {
      console.log("Patient", card);
      setPatient(card);
   };
   const handleDoctorSelect = card => {
      console.log("Doctor ", card);
      setDoctor(card);
   };
   const handleClick = async () => {
      if (Doctor && Patient) {
         const data = {
            doctor: Doctor,
            patient: Patient
         };
         console.log(data);
         navigate("/adminCreateApp", {state: data});
      } else {
         setdataa("Select doctor & patient");
      }
   };
   return (
      <div>
         <nav className="flex justify-between items-center shadow py-4 px-8">
            <div className=" text-2xl font-bold"> Select Patient and Doctor </div>
            <div>
               <Link to={"/adminScreen"}>
                  <button className=" border-2 border-black p-2 ml-5 mr-2">All appointments</button>
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
            <div className="flex flex-col justify-center items-center ">
               <h1 className="text-center">Patients</h1>
               <div className=" ml-10 mr-10 flex flex-wrap ">
                  
                  {Cards.map(card => (
                     <button
                        className="m-2 border border-green-300 p-2 shadow hover:bg-gray-200"
                        key={card._id}
                        onClick={() => handlePatientSelect(card)}>
                        <h1>Patient Name : {card.name} </h1>
                        <h1>Patient Email : {card.email} </h1>
                     </button>
                  ))}
               </div>
               <h1 className="text-center">Doctors</h1>
               <div className=" ml-10 mr-10 flex flex-wrap ">
                
                  {Cards1.map(card => (
                     <button
                        className="m-2 border border-red-300 p-2 shadow hover:bg-gray-200 "
                        key={card._id}
                        onClick={() => handleDoctorSelect(card)}>
                        <h1>Doctor Name : {card.name} </h1>
                        <h1>Doctor Email : {card.email} </h1>
                        <h1>Doctor Specialty : {card.specialty} </h1>
                     </button>
                  ))}
               </div>
               <button
                  className="  md:pl-40 md:pr-40  p-2 m-2   content-center   border-2 border-black bg-green-300 "
                  onClick={handleClick}>
                  <div>
                     <h1>CLICK</h1>
                  </div>
                  <div>
                     <h3>SelectedPatient : {Patient.name}</h3>
                     <h3>SelectedDoctor : {Doctor.name}</h3>
                  </div>
               </button>

               <h1>{dataa}</h1>
            </div>
         )}
      </div>
   );
};

export default AdminPatientDoctor;
