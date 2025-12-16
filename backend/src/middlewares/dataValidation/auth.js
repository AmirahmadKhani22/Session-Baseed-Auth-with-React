import User from "../../stores/user.js"

class AuthDataValidationMiddleware {
    static async login(req , res , next) {
        if(req.session && req.session.user) {
            const temp = new User()
            const user = temp.getById(req.session.user.id)
            await retardant(5500)
            return res.json({
                message: "the user logged in successfully",
                data: {
                    ...user,
                    password: undefined
                }
            })
        }

        // Validate request body

        return next()
    }
    static async register(req, res, next) {

        // Validate request body

        return next()
    }
}

export default AuthDataValidationMiddleware
