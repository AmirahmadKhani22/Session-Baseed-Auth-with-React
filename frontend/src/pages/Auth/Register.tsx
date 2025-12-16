import {memo , useEffect , useRef , useState , type FormEvent} from "react"
import {Link, useNavigate} from "react-router"
import useAuthStore from "@/stores/auth"
import AuthTemplate from "@/layouts/auth/template"
import PopupsErrors from "@/components/popups/errors"

function RegisterPage() {
  const navigate = useNavigate()
  const [role , setRole] = useState("SELLER")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const ctrl = useRef(new AbortController())
  const registerUser = useAuthStore(state => state.registerUser)
  const [error , setError] = useState<{title: string; message: string} | null>(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(error) {
        setError(null)
      }
      clearTimeout(timeoutId)
    } , 1500)
    return () => {
      clearTimeout(timeoutId)
    }
  } , [error])
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    registerUser({
      registerData: JSON.stringify({role,email,password}),
      onSuccess() {
        navigate("/dashboard")
      },
      onError(error) {
        // handle errors
        setError({
          title: error.cause.type,
          message: error.message
        })
      },
      externalController: ctrl.current
    })
  }

  return (
    <AuthTemplate>
      <div className="m-auto min-w-92 inline-block shadow-2xl rounded-xl p-4 space-y-8">
        <h1 className="text-center font-extrabold text-4xl">Register</h1>
        <form onSubmit={onSubmit} method="POST" className="w-full space-y-4">
          <div className="flex gap-x-5">
            <label className="inline-block text-xl font-bold">
              Role:
            </label>
            <div className="inline-flex gap-x-4">
              <div className="flex items-center">
                <label 
                  htmlFor="role-seller"
                  className="inline-block text-xl px-2 py-0.5"
                >
                  Seller
                </label>
                <input 
                  id="role-seller"
                  name="role"
                  type="radio"
                  required
                  checked={role === "SELLER"}
                  onChange={() => setRole("SELLER")}
                  className="inline-block size-5.5 bg-white border-2 px-1.5 py-0.5"
                />
              </div>
              <div className="inline-flex items-center">
                <label 
                  htmlFor="role-buyer"
                  className="inline-block text-xl px-2 py-0.5"
                >
                  Buyer
                </label>
                <input 
                  id="role-buyer"
                  name="role"
                  type="radio"
                  required
                  checked={role === "BUYER"}
                  onChange={() => setRole("BUYER")}
                  className="inline-block size-5.5 bg-white border-2 px-1.5 py-0.5"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label 
              htmlFor="email"
              className="inline-block text-xl font-bold"
            >
              Email:
            </label>
            <input 
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={event => setEmail(event.target.value)}
              minLength={5}
              maxLength={320}
              className="w-full text-xl border-2 rounded-sm px-1.5 py-0.5"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="inline-block text-xl font-bold"
            >
              Password:
            </label>
            <input 
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={event => setPassword(event.target.value)}
              minLength={8}
              maxLength={32}
              className="w-full min-w-82 text-xl border-2 rounded-sm px-1.5 py-0.5"
            />
          </div>
          <div className="w-full">
            <Link to="/auth/login" className="text-lg font-medium text-blue-600 hover:underline">
              Do you have an account? Login here.
            </Link>
          </div>
          <div className="w-full">
            <button 
              className="w-full inline-block bg-black text-white text-xl text-center font-bold rounded-sm px-1.5 py-1.5 cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        {
          !!error && PopupsErrors({
            title: error.title,
            message: error.message 
          }) 
        }
      </div>
    </AuthTemplate>
  )
}

export default memo(RegisterPage)
