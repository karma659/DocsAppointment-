import "tailwindcss/tailwind.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import DoctorScreen from "./screens/doctor/DoctorScreen";
import PatientScreen from "./screens/patient/PatientScreen";
import AdminScreen from "./screens/admin/AdminScreen";
import PatientAppointmentScreen from "./screens/patient/PatientAppointmentScreen";
import Patientallapp from "./screens/patient/Patientallapp";
import AdminPatientDoctor from "./screens/admin/AdminPatientDoctor";
import AdminCreateApp from "./screens/admin/AdminCreateApp";
import AdminUpdateApp from "./screens/admin/AdminUpdateApp";
import Video from "./components/Video";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />

               <Route path="/Video" element={<Video />} />

               <Route path="/Signup" element={<Signup />} />
               <Route path="/Login" element={<Login />} />
               <Route path="/doctorScreen" element={<DoctorScreen />} />
               <Route path="/patientScreen" element={<PatientScreen />} />
               <Route path="/patientAppointmentScreen" element={<PatientAppointmentScreen />} />
               <Route path="/patientallapp" element={<Patientallapp />} />
               <Route path="/adminScreen" element={<AdminScreen />} />
               <Route path="/adminCreateApp" element={<AdminCreateApp />} />
               <Route path="/adminUpdateApp" element={<AdminUpdateApp />} />
               <Route path="/adminPatientDoctor" element={<AdminPatientDoctor />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
