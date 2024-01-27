import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length,setlength] = useState(8)
  const [num,setNum] = useState(false)
  const [character,setCharacter] = useState(false)
  const [password,setPassword] = useState(null)

  const passwordGenarator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz"
    if(num) str+="0123456789"
    if(character) str+="!@#$%^&*()_+{}><?~,./"
    for(let i = 1;i<=length;i++){
      pass += str.charAt(Math.floor(Math.random()*str.length)+1)
    }
    setPassword(pass)
  },[length,num,character,setPassword])
  useEffect(()=>{
    passwordGenarator()
  },[length,num,character,passwordGenarator])

  const passRef = useRef(null)

  const copy = useCallback(()=>{
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <div className="bg-gray-700 mt-10 rounded-md p-3 w-[520px] flex-col">
        <h1 className="text-center font-bold text-2xl mb-2 text-orange-300">Password Genarator</h1>
        <div className="flex">
          <input type="text" className="w-full outline-none rounded-s-md px-2" readOnly value={password} placeholder="password..." ref={passRef}></input>
          <button className="bg-blue-500 pl-4 pr-4 pt-1 pb-1 text-white rounded-e-md active:shadow-md active:bg-blue-700" onClick={copy}>copy</button>
        </div>
        <div className="mt-5 flex items-center text-orange-300">
          <input type="range" className="mr-[5px] cursor-pointer" min={6} max={100} value={length} onChange={(e)=>setlength(e.target.value)}></input>
          <label className="mr-[10px]">Length ({length})</label>
          <input type="checkBox" className="mr-[5px] cursor-pointer" defaultChecked={num}
          onChange={()=>{setNum(prev=>!prev)}}></input>
          <label className="mr-[10px]">Numbers</label>
          <input type="checkBox" className="mr-[5px] cursor-pointer" defaultChecked={character}
          onChange={()=>{setCharacter((prev) => !prev)
          }}></input>
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
