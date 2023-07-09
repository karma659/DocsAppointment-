import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
   return (
      <div className="flex items-center justify-center  h-screen w-screen ">
         <div>
            <h1 className="text-2xl">Welcome to the Appointments App</h1>
            <div className="m-2 p-2 items-center flex justify-evenly">
              <Link to={"/Signup"}>
               <button className="m-2 p-2 border-2 border-black">Signup</button>
               </Link>  
               <Link to={"/Login"}>
               <button className="m-2 p-2 border-2 border-black">Login</button>
               </Link>  
            </div>
         </div>
      </div>
   );
};

export default Home;
