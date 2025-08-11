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
    <div className='flex items-center gap-2'>
      <label htmlFor={id} className='text-sm font-medium'>
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
        <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors'></div>
        <div className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5'></div>
      </label>
    </div>
  )
}
