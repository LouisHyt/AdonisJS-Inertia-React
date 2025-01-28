import type { SharedProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

function NavBar() {
  const { url } = usePage()
  const { user } = usePage<SharedProps>().props

  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MyQuizz</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shell h-8 w-auto"
            >
              <path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44" />
            </svg>
          </Link>
        </div>
        <div className="flex flex-1 justify-end gap-10">
          {!user && (
            <>
              <Link
                href="/register"
                className={`text-base font-semibold leading-6 ${url == '/register' ? 'text-blue-500' : 'text-gray-900'} hover:text-blue-500 transition duration-200`}
              >
                Register
              </Link>
              <Link
                href="/login"
                className={`text-base font-semibold leading-6 ${url == '/login' ? 'text-blue-500' : 'text-gray-900'} hover:text-blue-500 transition duration-200`}
              >
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <div className="user-info flex items-center gap-4">
                <span className="text-base font-semibold leading-6 text-gray-900">
                  {user.username}
                </span>
                <img src={user.avatarUrl} alt="User avatar" className="w-10 h-10 rounded-full" />
              </div>
              <div className="inline-block w-0.5 self-stretch bg-gray-300"></div>
              <Link
                href="/logout"
                method="post"
                className="text-base font-semibold leading-6 text-red-600 hover:text-red-500 transition duration-200"
              >
                Se déconnecter
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
