import { useState , useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");  

  //ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)
  }
  ,[length,number,charAllowed, setPassword])

  const copyPasswordToClick = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{passwordGenerator()}, [length,number,charAllowed,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={Password} className='outline-none w-full py-1 px-3'
          placeholder='password' readOnly ref={passwordRef}/>
          <button className='outlline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClick}>Copy</button>
        </div>
        <div className='flex flex-sm gap-x-2 py-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={number} id='numberInput'
            onChange={()=>{setNumber((prev)=>!prev)}} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput'
            onChange={()=>{setCharAllowed((prev)=>!prev)}} />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
