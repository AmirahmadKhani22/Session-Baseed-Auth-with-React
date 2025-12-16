import {Link} from "react-router"

function Navbar() {
    return (
        <nav className="relative shrink-0 bg-white px-4 py-2 flex items-center justify-between shadow-lg">
            <div>
                <Link
                    to={"/"}
                    className="text-xl font-bold"
                >
                    Home
                </Link>
            </div>
            <div>

            </div>
        </nav>
    )
}

export default Navbar