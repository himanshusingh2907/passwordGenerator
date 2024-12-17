import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength] =useState(8);
  const [numberAllowed,setNumber]=useState(false);
  const  [charAllowed,setChar]=useState(false);
  const [password,setPassword]=useState("");
  // ref hook
  const passwordRef=useRef(null);

  

  const Passwordgenertaor = useCallback( ()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str +="0123456789"
    if (charAllowed) str +="!@#$%^&*?|}{"
    for (let i=0;i<length;i++) {
      let char=Math.floor(Math.random() * str.length+1);
      pass += str.charAt(char);


    }
    setPassword(pass)
  } , [length,numberAllowed,charAllowed,setPassword])

const copyPasswordToClipboard =useCallback( () => {
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100)
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(()=>{
    Passwordgenertaor()
  },[length,numberAllowed,charAllowed,Passwordgenertaor])

  return (
    <>
     
     <div className='w-full max-w-md text-orange-600 bg-gray-800 mx-auto shadow-md rounded-lg '>
      <h1 className='text-white text-center my-3 '>Password Generator</h1>
   <div className='flex shadow rounded-lg overflow-hidden mb-4 ml-1'>

    <input type="text"
      value ={password}
      placeholder='password'
      className='outline-none w-full  py-1 px-3'
      readOnly
      ref={passwordRef}
    
    />
    <button onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

   </div>
   <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-2 ml-1 mb-1'>
      <input 
      type="range"
      min={10}
      max={100}
      value={length}
      className='cursor-pointer '
      onChange={(e) => {setLength(e.target.value)}}
        />
        <label >Length:{length}</label>

    </div>
    <div className='flex items-center gap-x-2 ml-1 mb-1'>
    <input 
      type="checkbox"
      defaultChecked={numberAllowed}
      id="numberInput"
      
      onChange={(e) => {setNumber((prev) => !prev)}}
        />
        <label >Numbers</label>
    </div>
    <div className='flex items-center gap-x-2 ml-1 mb-1'>
    <input 
      type="checkbox"
      defaultChecked={charAllowed}
      id="charInput"
      
      onChange={(e) => {setChar((prev) => !prev)}}
        />
        <label >Characters</label>
    </div>
   </div>
     </div>
    </>
  )
}

export default App

