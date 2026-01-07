'use client'

import { useState, useTransition } from 'react'

interface ToggleSwitchProps {
  id: string
  checked: boolean
  action: (id: string, active: boolean) => Promise<void>
}

export function ToggleSwitch({ id, checked, action }: ToggleSwitchProps) {
  const [isPending, startTransition] = useTransition()
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    startTransition(async () => {
      await action(id, newValue)
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isChecked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isChecked ? 'translate-x-6' : 'translate-x-1'
          }`}
      />
    </button>
  )
}
