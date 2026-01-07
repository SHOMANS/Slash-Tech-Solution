import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { login } from '@/lib/admin-actions'
import { LoginButton } from '@/components/admin/login-button'

export default async function LoginPage() {
  const session = await getSession()
  if (session) {
    redirect('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your website
          </p>
        </div>
        <form className="mt-8 space-y-6" action={login}>
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
      </div>
    </div>
  )
}
