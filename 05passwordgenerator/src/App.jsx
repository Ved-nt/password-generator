import React, { useCallback, useEffect,useRef } from "react";
import { useState } from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(8);
  const[numallowed,setnumAllowed]=useState(false);//whether number is allowed in password or not
  const[charallowed,setcharAllowed]=useState(false);
  const[password,setPassword]=useState("");

  //ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass="";
    let str="ABCDENFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallowed) str+="0123456789";
    if(charallowed) str+="!@#$%^&*-_+=[]{}~`";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);

  },[length,numallowed,charallowed,setPassword]);

  const copyPasswordToClip = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numallowed,charallowed,passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-10 my-8 py-3 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3 bg-white" placeholder="Password" readOnly ref={passwordRef}/>
          <button onClick={copyPasswordToClip}  className="outline-none bg-blue-700 hover:bg-blue-900 text-white px-3 py-0.5 shrink-0">copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input  type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numallowed} id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charallowed} id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev )
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>    
    </>
  )
}

export default App
