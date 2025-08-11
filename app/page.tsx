'use client'

import generatePassword from '@/utils/generatePassword'
import { useState, useEffect } from 'react'
import ToggleSwitch from '@/components/toggle-switch'
import Image from 'next/image'

export default function Page() {
  const [length, setLength] = useState<number>(12)
  const [useUppercase, setUseUppercase] = useState<boolean>(false)
  const [useNumbers, setUseNumbers] = useState<boolean>(false)
  const [useSymbols, setUseSymbols] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    setPassword(
      generatePassword(length, {
        uppercase: useUppercase,
        numbers: useNumbers,
        symbols: useSymbols,
      })
    )
  }, [length, useUppercase, useNumbers, useSymbols])

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(password)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 gap-8'>
      <h1 className='font-bold text-3xl md:text-5xl break-all tracking-wide text-center'>
        {password}
      </h1>

      <div className='w-full max-w-md'>
        <label htmlFor='length' className='block mb-2 text-sm text-gray-300'>
          Length: {length}
        </label>
        <input
          type='range'
          id='length'
          className='w-full accent-purple-500 cursor-pointer'
          min={8}
          max={24}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className='flex items-center justify-center gap-6 flex-wrap bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md'>
        <ToggleSwitch
          id='uppercase'
          label='Uppercase'
          checked={useUppercase}
          onChange={setUseUppercase}
        />
        <ToggleSwitch
          id='numbers'
          label='Numbers'
          checked={useNumbers}
          onChange={setUseNumbers}
        />
        <ToggleSwitch
          id='symbols'
          label='Symbols'
          checked={useSymbols}
          onChange={setUseSymbols}
        />
      </div>

      <button
        onClick={handleCopy}
        className='px-6 py-2 cursor-pointer rounded-full font-medium bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl active:scale-95'
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
