import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passowordRef = useRef(null)

  const copyToClpibord = useCallback(()=>{

    passowordRef.current?.select()
    passowordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  },[password])
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*+_-=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);


  useEffect(()=>{
    passwordgenerator()
  }
  ,[numberAllowed,charAllowed,passwordgenerator, length])

  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center py-5">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passowordRef}
          />
          <button
            className="outline-none text-white px-3 py-0.5 shrink-0 bg-blue-500 hover:active:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300  "
            onClick={copyToClpibord}
          >
            copy
          </button>
        </div>
        <div className="flex gap-4 my-2">
          <div className="flex gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer flex "
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
