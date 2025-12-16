import retardant from "../utils/retardant.js"

class ACLMiddleware {
    static roles = ["ADMIN" , "BUYER" , "SELLER"]
    static rolesHierarchy = {
        "ADMIN": ["ADMIN" , "BUYER" , "SELLER"],
        "BUYER": ["BUYER"],
        "SELLER": ["SELLER"],
    }

    static check(lowestRole) {
        const rolesHierarchy = this.rolesHierarchy
        return async function(req , res , next) {
            const {role} = req.session.user
            const isAccessible = !!rolesHierarchy[role]?.includes(lowestRole)
            if(isAccessible) return next()
            await retardant(5500)
            return res.status(403).json({
                error: {
                    type: "ACCESS_DENIED_ERROR",
                    message: "the route access denied"
                }
            })
        }
    }
}

export default ACLMiddleware
