import React, {useContext} from "react";

import {SocketContext} from "../Context";

const VideoPlayer = () => {
   const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} =
      useContext(SocketContext);

   return (
      <div className="flex  m-2 w-[100%]">
         {stream && (
            <div className="flex flex-col w-[30%] mr-5">
               <h1>{name || "Name"}</h1>
               <video playsInline ref={myVideo} autoPlay className=" w-50 " />
            </div>
         )}
         {callAccepted && !callEnded && (
            <div className="flex flex-col ml-10 ">
               <h1>{call.name || "Name"}</h1>
               <video playsInline ref={userVideo} autoPlay className=" w-50 " />
            </div>
         )}
      </div>
   );
};

export default VideoPlayer;
