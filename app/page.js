"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import CopyIcon from "../public/content_copy_FILL0_wght400_GRAD0_opsz24.svg"
import Link from 'next/link'



export default function Home() {

  const [upper, setUpper] = useState("")
  const [upperBol, setUpperBol] = useState(null)
  const [lower, setLower] = useState("")
  const [lowerBol, setLowerBol] = useState(null)
  const [symbols, setSymbols] = useState("")
  const [symbolsBol, setSymbolsBol] = useState(null)
  const [digits, setDigits] = useState("")
  const [digitsBol, setDigitsBol] = useState(null)
  const [gRand, setGrand] = useState()
  const [gRandTitle, setGrandTitle] = useState("")
  const [length, setLength] = useState(0)
  const [resault, setResault] = useState("")
  const [copied, setCopied] = useState(false)
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [localHistory, setLocalHistory] = useState([])
  const disableRightClick = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    document.addEventListener('contextmenu', disableRightClick);
    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
    };
  }, []);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(resault);
    if (resault.length >= 1) {
      setCopied(true)
    }
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  };
  function UpperClick() {
    setUpperBol(true)
    setUpper("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    if (upperBol === true) {
      setUpperBol(false)
      setUpper("")
    }
  }
  function LowerClick() {
    setLowerBol(true)
    setLower("abcdefghijklmnopqrstuvwxyz")
    if (lowerBol === true) {
      setLowerBol(false)
      setLower("")
    }
  }
  function SymbolsClick() {
    setSymbolsBol(true)
    setSymbols("!@#$%^&*()-_=+[]{}|;:,.<>?/'~")
    if (symbolsBol === true) {
      setSymbolsBol(false)
      setSymbols("")
    }
  }
  function DigitsClick() {
    setDigitsBol(true)
    setDigits("0123456789")
    if (digitsBol === true) {
      setDigitsBol(false)
      setDigits("")
    }
  }
  function Generate(string_upper, string_lower, number_digits, special_char) {
    if (!upperBol && !lowerBol && !digitsBol && !symbolsBol) {
      setGrand(true);
      setGrandTitle("You must select filter first");
      setTimeout(() => {
        setGrand(false);
      }, 5500);
    } else if (length < 1) {
      setGrand(true);
      setGrandTitle("Length must be more than 0");
      setTimeout(() => {
        setGrand(false);
      }, 5500);
    } else {
      setGrand(false);
      var rand = string_upper + string_lower + number_digits + special_char;
      var final = "";
      for (var i = 0; i < length; i++) {
        final += rand[Math.floor(Math.random() * rand.length)];
      }
      // Update the state with the new password
      setPasswordHistory(prevHistory => [...prevHistory, final]);
      setResault(final);
    }
  }
  function handleRemoveStorage() {
    setPasswordHistory([])
  }

  return (
    <main className="flex h-auto  flex-col bg-black items-center justify-center py-10 px-0 sm:py-5 sm:px-16">
      <div className="flex  flex-col  w-full border border-purple-500  items-center justify-center px-0 py-20">
        <div className=' flex flex-col h-auto w-full gap-5 px-10 sm:px-20 '>
          <div style={gRand ? { translate: -0 } : { translate: -2000 }} className=' duration-300 flex items-center justify-between gap-4 bg-yellow-300 py-2  px-4 w-96 z-50'>
            <p className=' text-black'>{gRandTitle}</p>
            <span onClick={() => { setGrand(false) }} className=' text-black font-extrabold cursor-pointer'>&#x2715;</span>
          </div>
          <div className=' flex gap-5 w-full'>
            <h1 className=' text-yellow-300 font-bold tracking-wide text-4xl'>CyberPwd</h1>
            <h1 className=' text-yellow-300 font-bold  tracking-wide text-4xl'>Generator</h1>
          </div>
          <div className=' flex flex-col gap-3 w-full'>
            <div className=' w-full flex gap-2  border border-purple-500 pr-2'>
              <input className=' inpfocus py-3  bg-black px-4 w-full' value={resault} placeholder='generate now' type='text' readOnly />
              <button onClick={() => { copyToClipboard() }} className='text-yellow-300 relative'>
                <span style={{ marginTop: -60, marginLeft: -20 }} className={copied === true ? ' bg-yellow-300 p-1 rounded-md  text-center text-black absolute' : "hidden"}>
                  Copied
                  <span style={{ marginLeft: -17, marginTop: 20 }} className=' absolute rotate-45 bg-yellow-300 w-3 h-3 p-1'></span>
                </span>
                Copy
              </button>
            </div>
            <div className=' flex items-center gap-3 '>
              <button onClick={() => { Generate(upper, lower, digits, symbols) }} className=' duration-300 bg-yellow-300 hover:bg-yellow-600 text-black w-36 py-2 font-bold px-3 relative'>
                Generate_
                <span style={{ left: -15, bottom: -15, cursor: "default" }} className=' absolute  bg-black text-white p-3 rotate-45 h-2 w-2'></span>
              </button>
              <button onClick={() => { setResault("") }} className={resault.length >= 1 ? ' text-yellow-300' : "hidden"}>Clear</button>
            </div>
          </div>
          <div className=' flex flex-col '>
            <span className=' text-yellow-300'>length: {length}</span>
            <input type='range' min="0" value={length} onChange={(e) => { setLength(e.target.value); }} max="200" />
          </div>
          <div className='  flex items-center flex-wrap gap-3 justify-start md:justify-between'>
            <div onClick={() => { UpperClick() }} className=' cursor-pointer flex items-center gap-2'>
              <span className={upperBol === true ? ' p-px px-3 h-5 w-2 border bg-yellow-300 rounded border-yellow-300' : ' p-px px-3 h-5 w-2 border rounded border-yellow-300'}></span>
              <p>UpperCase</p>
            </div>
            <div onClick={() => { LowerClick() }} className=' cursor-pointer flex items-center gap-2'>
              <span className={lowerBol === true ? ' p-px px-3 h-5 w-2 border bg-yellow-300 rounded border-yellow-300' : ' p-px px-3 h-5 w-2 border rounded border-yellow-300'}></span>
              <p>lowerCase</p>
            </div>
            <div onClick={() => { SymbolsClick() }} className=' cursor-pointer flex items-center gap-2'>
              <span className={symbolsBol === true ? ' p-px px-3 h-5 w-2 border bg-yellow-300 rounded border-yellow-300' : ' p-px px-3 h-5 w-2 border rounded border-yellow-300'}></span>
              <p>Symbols</p>
            </div>
            <div onClick={() => { DigitsClick() }} className=' cursor-pointer flex items-center gap-2'>
              <span className={digitsBol === true ? ' p-px px-3 h-5 w-2 border bg-yellow-300 rounded border-yellow-300' : ' p-px px-3 h-5 w-2 border rounded border-yellow-300'}></span>
              <p>Digits</p>
            </div>
          </div>
        </div>
        <div className=' flex flex-col h-full w-full p-10 px-10 sm:px-20  gap-3'>
          <div className=' flex justify-between items-center'>
            <h1 className=' text-xl'>Password logs</h1>
            <button onClick={() => { handleRemoveStorage() }}>Clear All</button>
          </div>
          <div style={{ overflowY: "scroll" }} className={passwordHistory.length >= 1 ? "h-60  overflow-hidden flex flex-col px-2 w-full gap-4" : "hidden"}>
            {passwordHistory.map((e, index) => {
              return <div key={e} className=' flex items-center gap-2 px-1 w-full justify-between'>
                <div className=' flex w-full items-center gap-2'>
                  {index + ")"}
                  <input type='text' value={e} className=' bg-black w-full  px-2 text-gray-400' />
                </div>
                <Image alt='d' onClick={() => { navigator.clipboard.writeText(e); }} src={CopyIcon} className=' h-7 duration-300 cursor-pointer w-7 p-1 bg-gray-400 hover:bg-gray-100 text-yellow-300 rounded-lg' />
              </div>
            })}
          </div>
        </div>
        <div className=' flex justify-start items-center  px-20 w-full'>
          <h1 className=' text-yellow-300'>made by <Link className='underline' target='_blank' href={"https://github.com/omarker09"}>omarker09</Link></h1>
        </div>
      </div>
    </main>
  )
}
