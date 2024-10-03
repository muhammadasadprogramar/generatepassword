import { useState, useCallback, useEffect, useRef } from 'react'

const App = () => {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")

  // ref Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "$%&+*-@#~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassword(pass)

  }, [length, number, character, setpassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 14)
    window.navigator.clipboard.writeText(password)
  }, [password])
 
  useEffect(() => {
 passwordGenerator()

  }, [length, number, character, passwordGenerator])
  
  return (
    <div className='f-ull max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-400 bg-gray-700'>
      <h1 className='text-center text-white font-[600] my-3'>Password Generator</h1>
      <div className="flex shadow rounded-md overflow-hidden mb-4">

        <input type="text" value={password} className='outline-none text-black w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 btn'>Copy</button>
      </div>


      <div className="flex text-sm gap-3 justify-center items-center flex-wrap">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={80} value={length} className='cursor-pointer' onChange={e => setlength(e.target.value)} />
          <label htmlFor="length">Length: {length}</label>
        </div>
<div className='flex items-center gap-3'>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={number} id='numberInput' 
          onChange={() => {
            setnumber((prev) => !prev); 
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={character} id='charInput' 
          onChange={() => {
            setcharacter((prev) => !prev); 
          }}
          />
          <label htmlFor="charInput">Characters</label>
      </div>
      </div>       
      </div>

    </div>

  )
}

export default App