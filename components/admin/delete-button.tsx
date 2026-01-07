'use client'

import { useTransition } from 'react'

interface DeleteButtonProps {
  id: string
  action: (id: string) => Promise<void>
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
      startTransition(async () => {
        await action(id)
      })
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  )
}
