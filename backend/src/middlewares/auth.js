import retardant from "../utils/retardant.js"

class CheckAuthMiddleware {
    static async didLogin(req , res , next) {
        if(req.session && req.session.user) {
            return next()
        }
        await retardant(5500)
        return res.status(401).json({
            error: {
                type: "UNAUTHORIZED_ERROR",
                message: "the user has not logged in"
            }
        })
    }
    
    static async didNotLogin(req , res , next) {
        if(!req.session?.user) return next()
        await retardant(5500)
        return res.status(403).json({
            error: {
                type: "AUTHORIZED_ERROR",
                message: "the user has logged in"
            }
        })
    }
}

export default CheckAuthMiddleware
