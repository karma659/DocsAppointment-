import React from "react";
import {Link, useNavigate} from "react-router-dom";

const DoctorCard = ({card}) => {
   const navigate = useNavigate();

   const handleclick = card => {
      navigate("/patientAppointmentScreen", {state: card});
   };

   return (
      <div className="ml-20 mr-20 mb-10 mt-10">
         <div className="container p-2 flex flex-col-reverse md:flex-row items-center justify-center border border-gray-300  shadow ">
            <div className=" mx-10 w-[40%]  ">
               <div className="  w-50  rounded  overflow-hidden ">
                  <img src="" alt="image" />
               </div>
            </div>

            <div className="  w-[50%] flex  justify-evenly ">
               <div>
                  <h6 className="  text-xl">
                     <span className=" text-base text-gray-400">Name:</span>
                     {card.name}
                  </h6>
                  <h6 className="  text-xl">
                     <span className=" text-base text-gray-400">Email:</span>
                     {card.email}
                  </h6>
                  <h6 className="  text-xl">
                     <span className=" text-base text-gray-400">Specialty:</span>
                     {card.specialty}
                  </h6>
                  <button
                     className="  pt-1 pb-2 mt-1  border border-gray-300 hover:text-gray-700 shadow  hover:bg-green-300"
                     onClick={() => handleclick(card)}>
                     Book Appointment
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DoctorCard;
