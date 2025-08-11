'use client'

import generatePassword from '@/utils/generatePassword'
import { useState, useEffect } from 'react'
import ToggleSwitch from '@/components/toggle-switch'

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
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className='space-y-4'>
      <h1>{password}</h1>
      <button
        className='text-black bg-amber-600 px-3 py-1 rounded'
        onClick={handleCopy}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>

      <label htmlFor='length'>Length: {length}</label>
      <input
        type='range'
        id='length'
        min={8}
        max={24}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

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
  )
}
