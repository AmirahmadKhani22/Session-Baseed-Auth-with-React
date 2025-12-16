import {memo} from "react"
import {Link} from "react-router"

function HomePage() {

  return (
    <div className="m-auto min-w-92 inline-block bg-white shadow-2xl rounded-xl p-4 space-y-8">
      <ul className="pl-0">
        <li>
          <h3 className="text-2xl font-bold">
            Auth
          </h3>
          <ul className="pl-4">
            <li>
              <Link to="/auth/login" className="text-xl text-blue-900 font-bold underline">
                Login
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="text-2xl font-bold">
            Dashboard
          </h3>
          <ul className="pl-4">
            <li>
              <Link to="/dashboard" className="text-xl text-blue-900 font-bold underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default memo(HomePage)
