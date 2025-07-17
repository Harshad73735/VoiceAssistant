import React, { createContext, useState } from 'react';

import main from '../gemini';

export const DataContext = createContext();

function UserContextProvider({ children }) {
  let [speaking,setSpeaking]=useState(false);
  let [prompt,setprompt]=useState("listining...");
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt){
    let text=await main(prompt);
 let newText = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/google/gi, "Harshad");   
     setprompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(()=>{
    setSpeaking(false);

    },5000);

  }
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  let [response,setResponse]=useState(false);

  recognition.onresult = (e) => {
    console.log("Speech result:", e.results[0][0].transcript);
    setprompt(e.results[0][0].transcript);
    // aiResponse(e.results[0][0].transcript);
    takeCommand(e.results[0][0].transcript.toLowerCase());
  };

  function takeCommand(command){
    if(command.includes("open")&&command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank");
      speak("opening Youtube");
      setprompt("opening Youtube...");
            setResponse(true);

     setTimeout(()=>{
    setSpeaking(false);

    },5000);

    }
      else if(command.includes("open")&&command.includes("insta")){
      window.open("https://www.instagram.com/","_blank");
      speak("opening instagram");
      setprompt("opening  Instagram...");
      setResponse(true);
     setTimeout(()=>{
    setSpeaking(false);

    },5000);

    }
    else if(command.includes("time")){
      let time=new Date().toLocaleString(undefined,
        {hour:"numeric",minute:"numeric"}
        
      )
       speak(time);
      setprompt(time);
            setResponse(true);

     setTimeout(()=>{
    setSpeaking(false);

    },5000);
    }
    else{
      aiResponse(command);
    }
  }
  return (
    <DataContext.Provider value={{ recognition, speak ,speaking,setSpeaking,prompt,setprompt,response,setResponse}}>
      {children}
    </DataContext.Provider>
  );
}

export default UserContextProvider;
