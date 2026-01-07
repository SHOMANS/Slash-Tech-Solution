'use client'

import { login } from '@/lib/admin-actions'
import { LoginButton } from '@/components/admin/login-button'
import { useFormState } from 'react-dom'

const initialState = { error: '' }

export function LoginForm() {
  const [state, formAction] = useFormState(
    async (prevState: typeof initialState, formData: FormData) => {
      return await login(formData)
    },
    initialState
  )

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {state?.error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <p className="text-sm text-red-800 dark:text-red-200">{state.error}</p>
        </div>
      )}

      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 sm:text-sm"
            placeholder="Email address"
            defaultValue="admin@slashtech.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <LoginButton />
      </div>

      <div className="text-xs text-center text-gray-500 dark:text-gray-400 space-y-1">
        <p>Default credentials:</p>
        <p>Email: admin@slashtech.com</p>
        <p>Password: admin123</p>
      </div>
    </form>
  )
}
