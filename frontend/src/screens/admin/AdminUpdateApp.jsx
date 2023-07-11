import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { BACKEND_URL } from "../../config";

const AdminUpdateApp = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const dat = location.state;
   console.log("dat ", dat);
   const doctor = dat.doctor;
   const patient = dat.patient;

   // Initialize state variables
   const [video, setvideo] = useState(false);
   const [selectedSlots, setSelectedSlots] = useState({date: "", time: ""});
   const [availableSlots, setAvailableSlots] = useState([]);
   const [occupiedSlots, setOccupiedSlots] = useState([]);
   const [dataa, setdataa] = useState("");

   useEffect(() => {
      generateAvailableSlots();
   }, []);

   const generateAvailableSlots = () => {
      const currentDate = new Date(); // Get the current date and time
      const occupiedSlots = []; // To store the occupied slots

      // Iterate over the doctors and their appointments

      doctor.appointments.forEach(appointment => {
         const {date, time} = appointment;
         occupiedSlots.push({date, time});
      });

      const availableSlots = [];

      // Generate slots for the next three days
      for (let i = 0; i < 3; i++) {
         const date = new Date(currentDate); // Create a new date object for the current day

         // Increment the date by i days for the next three days
         date.setDate(date.getDate() + i);

         // Set the starting hour based on the current time if it's the first day
         let startHour = i === 0 ? currentDate.getHours() + 1 : 9;

         // Generate slots for each hour from startHour to 4 PM
         for (let hour = startHour; hour <= 16; hour++) {
            const startTime = `${hour}-${hour + 1}`; // Generate the time slot

            const slot = {
               date: date.toISOString().split("T")[0], // Convert date to string in "YYYY-MM-DD" format
               time: startTime
            };

            availableSlots.push(slot);
         }
      }

      setAvailableSlots(availableSlots);
      setOccupiedSlots(occupiedSlots);
   };

   const isSlotOccupied = slot => {
      const {date, time} = slot;
      return occupiedSlots.some(
         occupiedSlot => occupiedSlot.date === date && occupiedSlot.time === time
      );
   };

   // Function to handle slot selection
   const handleSlotSelect = slot => {
      console.log(slot);
      setSelectedSlots(slot);
   };

   const handleClick = async () => {
      try {
         console.log(selectedSlots);

         if (selectedSlots.time) {
            const data = {
               patient: patient._id,
               doctor: doctor._id,
               date: selectedSlots.date,
               time: selectedSlots.time,
               isVideoConsultation: video
            };
            console.log("data", data);
            var token = Cookies.get("token");

            const response = await axios.patch(`${BACKEND_URL}/appointment/update/${dat._id}`, data, {
               headers: {
                  Authorization: `Bearer ${token}`
               }
            });
            console.log(response.data);
            setdataa("done");
            navigate("/adminScreen");
         } else {
            console.log("fill all fields");
            setdataa("select the  slot");
         }
      } catch (error) {
         console.log(" error ", error);
      }
   };

   return (
      <div>
         <div className=" bg-white pl-20 pr-20 pt-2 pb-2 mb-5 fixed w-screen expand-lg h-[50px] flex flex-row-reverse ">
            <div>
               <Link to={"/"}>
                  <button className=" border-2 border-black p-2 ml-5">Logout</button>
               </Link>
            </div>
            <div>
               <Link to={"/AdminScreen"}>
                  <button className=" border-2 border-black p-2 ">All Appointment</button>
               </Link>
            </div>
         </div>
         <h1 className="text-center">appointment</h1>
         <div>
            <h1 className="text-center text-red-500">Select Available Slots</h1>

            <div className="flex mb-5 ">
               {/* Group slots by date */}
               {Object.entries(
                  availableSlots.reduce((groups, slot) => {
                     const {date} = slot;
                     if (!groups[date]) {
                        groups[date] = [];
                     }
                     groups[date].push(slot);
                     return groups;
                  }, {})
               ).map(([date, slots]) => (
                  <div className="border border-gray-300 shadow m-2" key={date}>
                     <h3 className="border-2 border-gray-300 p-2 m-2 justify-center whitespace-nowrap">
                        Date: {date}
                     </h3>
                     {slots.map((slot, index) => (
                        <button
                           className={`m-2 border-2 border-black ${
                              isSlotOccupied(slot)
                                 ? "bg-red-500 text-white"
                                 : "bg-green-500 text-white"
                           }`}
                           key={index}
                           onClick={() => handleSlotSelect(slot)}>
                           Time: {slot.time}
                        </button>
                     ))}
                  </div>
               ))}
            </div>

            <div className="m-2 text-xl flex flex-col items-center justify-center ">
               <div className="m-2 flex">
                  <h3>Selected Slot :</h3>
                  <span className="ml-2  text-green-800">{selectedSlots.date}</span>
                  <span className="ml-2  text-green-800 "> {selectedSlots.time}</span>
               </div>
               <div className="m-2 flex">
                  <h3> Video Consultation :</h3>
                  <input
                     className=" h-6 w-6 ml-2 "
                     type="checkbox"
                     name="video"
                     checked={video}
                     onChange={e => setvideo(e.target.checked)}
                  />
               </div>
               <button
                  className=" md:pl-40 md:pr-40  p-2 m-2   border-black  border-2   hover:bg-gray-200"
                  onClick={() => handleClick()}>
                  Update appointment
               </button>
            </div>
            <h1 className="text-center text-red-300">{dataa}</h1>
         </div>
      </div>
   );
};

export default AdminUpdateApp;
