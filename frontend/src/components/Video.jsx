
import VideoPlayer from "./VideoPlayer";
import Sidebar from "./Sidebar";
import Notifications from "./Notifications";
import {ContextProvider} from "../Context";
import { useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

const Video = () => {
   const navigate=useNavigate();
   const location = useLocation();
   const data = location.state;

   const goback = () => {
      if (data.role === "patient") {
         window.location.href = "/patientallapp";
      } else {
         window.location.href = "/doctorScreen";
      }
   };
   const handleLogout = () => {   
      Cookies.remove("token"); 
      navigate("/");
   };

   return (
      <ContextProvider data={data}>
         <div>
            <nav className="flex justify-between items-center shadow py-2 px-8">
               <div className=" text-2xl font-bold"> Video CALL </div>
               <div>
                  <button className=" border border-black  py-2 px-4 mr-4" onClick={() => goback()}>
                     GO BACK
                  </button>

          
                     <button className="border border-black  py-2 px-4 " onClick={handleLogout}>Logout</button>
                 
               </div>
            </nav>
            <VideoPlayer />
            <Sidebar data={data}>
               <Notifications />
            </Sidebar>
         </div>
         <div className="flex flex-col items-center justify-center">
            <button
               className=" border border-black my-2 py-5 px-10 mr-4 bg-red-700 "
               onClick={() => goback()}>
               END CALL
            </button>
         </div>
      </ContextProvider>
   );
};

export default Video;
