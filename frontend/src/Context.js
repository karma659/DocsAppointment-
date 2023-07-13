import React, {createContext, useState, useRef, useEffect} from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://127.0.0.1:5000");

const socket = io("http://localhost:5000", {
   transports: ["websocket"]
});
const ContextProvider = ({data, children}) => {
   const [callAccepted, setCallAccepted] = useState(false);
   const [callEnded, setCallEnded] = useState(false);
   const [stream, setStream] = useState(null);
   const [name, setName] = useState("");
   const [call, setCall] = useState({});
   const [me, setMe] = useState("");

   const myVideo = useRef();
   const userVideo = useRef();
   const connectionRef = useRef();

   useEffect(() => {
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(currentStream => {
         setStream(currentStream);

         if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
         }
      });
      socket.emit("createSocketId", {data});

      socket.on("socketIdCreated", ({socketId}) => {
         setMe(socketId);
         console.log("socket ID", socketId);
      });

      socket.on("callUser", ({from, name: callerName, signal}) => {
         setCall({isReceivingCall: true, from, name: callerName, signal});
      });

      return () => {
         // console.log("end c");
         // if (data.role === "patient") {
         //    window.location.href = "/patientallapp";
         // } else if (data.role === "doctor") {
         //    window.location.href = "/doctorScreen";
         // }
      };
   }, []);

   const answerCall = () => {
      setCallAccepted(true);

      const peer = new Peer({initiator: false, trickle: false, stream});

      peer.on("signal", data => {
         console.log("answercall s ",data)
         socket.emit("answerCall", {signal: data, to: call.from});
      });

      peer.on("stream", currentStream => {
         if(userVideo.current){
         console.log("answercall",currentStream)
         userVideo.current.srcObject = currentStream;
         }
      });

      peer.signal(call.signal);

      connectionRef.current = peer;
   };

   
   const callUser = id => {
      const peer = new Peer({initiator: true, trickle: false, stream});

      peer.on("signal", data => {
         socket.emit("callUser", {userToCall: id, signalData: data, from: me, name});
      });

      peer.on("stream", currentStream => {
         
         if(userVideo.current){
            console.log("calluser",currentStream)
            userVideo.current.srcObject = currentStream;
         }
      });

      socket.on("callAccepted", signal => {
         setCallAccepted(true);

         peer.signal(signal);
      });

      connectionRef.current = peer;
   };

   const leaveCall = () => {
      setCallEnded(true);

      if (connectionRef.current) {
         connectionRef.current.destroy();
      }
      if (stream) {
         stream.getTracks().forEach(track => track.stop());
      }
      socket.emit("hangUp");
      socket.on("closeConnection");
      socket.close();
   };

   return (
      <SocketContext.Provider
         value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall
         }}>
         {children}
      </SocketContext.Provider>
   );
};

export {ContextProvider, SocketContext};
