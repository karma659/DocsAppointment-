import React, {useContext} from "react";

import {SocketContext} from "../Context";

const Notifications = () => {
   const {answerCall, call, callAccepted} = useContext(SocketContext);

   return (
      <div className="bg-green-500">
         {call.isReceivingCall && !callAccepted && (
            <div style={{display: "flex", justifyContent: "space-around"}}>
               <h1>{call.name} is calling:</h1>
               <button className="bg-blue-400" onClick={answerCall}>
                  Answer
               </button>
            </div>
         )}
      </div>
   );
};

export default Notifications;
