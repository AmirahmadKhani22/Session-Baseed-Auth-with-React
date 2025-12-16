import {useLocation} from "react-router"

function Notfound() {
    const {pathname} = useLocation()

    return (
        <div className="m-auto inline-block space-y-8">
            <h1 className="text-center text-2xl font-bold">404 - Not Found</h1>
            <div className="w-full flex flex-warp-reverse sm:flex-nowrap items-start justify-center sm:justify-between gap-x-4 gap-y-4">
                <div className="shrink-0 sm:shrink px-4">
                    <img 
                        loading="lazy"
                        decoding="async"
                        src="/images/404.png"
                        alt="not found image"
                        className=""
                    />
                </div>
                <div className="shrink-0 pt-8">
                    <h2 className="text-center sm:text-start text-xl md:text-2xl">The '{pathname}' route does not found!</h2>
                </div>
            </div>
        </div>
    )
}

export default Notfound