'use client'

interface ToggleSwitchProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ToggleSwitch({
  id,
  label,
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <div className='flex items-center gap-3'>
      <label
        htmlFor={id}
        className='text-sm font-medium text-gray-300 select-none'
      >
        {label}
      </label>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className='sr-only peer'
        />
        <div className='w-12 h-6 bg-gray-500 rounded-full peer peer-checked:bg-purple-500 transition-colors duration-300 ease-in-out'></div>
        <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ease-in-out peer-checked:translate-x-6'></div>
      </label>
    </div>
  )
}
