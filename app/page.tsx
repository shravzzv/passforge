'use client'

import generatePassword from '@/utils/generatePassword'
import { useState, useEffect } from 'react'

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
      setTimeout(() => setCopied(false), 1500) // reset after 1.5s
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div>
      <h1 className='text-5xl'>{password}</h1>
      <button className='text-black bg-amber-600' onClick={handleCopy}>
        {copied ? 'copied' : 'copy'}
      </button>

      <label htmlFor='length'>Length</label>
      <input
        type='range'
        name='length'
        id='length'
        min={8}
        max={24}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
      />

      <div>
        <label htmlFor='uppercase'>Uppercase</label>
        <input
          type='checkbox'
          id='uppercase'
          checked={useUppercase}
          onChange={(e) => setUseUppercase(e.target.checked)}
        />
      </div>

      <div>
        <label htmlFor='numbers'>Numbers</label>
        <input
          type='checkbox'
          id='numbers'
          checked={useNumbers}
          onChange={(e) => setUseNumbers(e.target.checked)}
        />
      </div>

      <div>
        <label htmlFor='symbols'>Symbols</label>
        <input
          type='checkbox'
          id='symbols'
          checked={useSymbols}
          onChange={(e) => setUseSymbols(e.target.checked)}
        />
      </div>
    </div>
  )
}
