import React, { useContext, useEffect } from 'react';
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import UserContextProvider, { DataContext } from './context/UserContext';
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
function App() {
  const { recognition,speaking,setSpeaking ,prompt,setprompt,response,setResponse} = useContext(DataContext);

 
  return (
    <div className='main'>
      <img src={va} alt='' id='shifra' />
      <span>I'm Shifra, Your Advanced Virtual Assistant</span>
      {!speaking ?  <button onClick={() =>{
         setprompt("listining...")
         setSpeaking(true);
         setResponse(false);
        recognition.start()
        }}>
        Click here <CiMicrophoneOn />
      </button>
      :
      <div className='response'>
        {!response ? <img src={speakimg} id='speakimg' alt="Speaking animation" />
      
      :
      <img src={aigif} id='aigif'/>
      } <p>{prompt}</p>

      </div>
      } 
     
    </div>
  );
}

export default function RootApp() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}
