import User from "../stores/user.js"
import retardant from "../utils/retardant.js"

class AuthController {
    static async Login(req , res) {
        const {email , password} = req.body

        const person = (new User()).getByEmail(email)

        if(!person) {
            await retardant(5500)
            return res.status(401).json({
                error: {
                    type: "WRONG_DATA_ERROR",
                    message: "email or password are wrong"
                }
            })   
        }
        if(person.password !== password) {
            return res.status(401).json({
                error: {
                    type: "WRONG_DATA_ERROR",
                    message: "email or password are wrong"
                }
            })
        }
        
        req.session.user = {
            id: person.id,
            role: person.role
        }
        return res.json({
            message: "the user has logged in successfully",
            data: {
                ...person,
                password: undefined
            }
        })
    }

    static async register(req , res) {
        const {email , role , password} = req.body
        const temp = new User()

        const person = temp.getByEmail(email)

        if(person) {
            await retardant(5500)
            return res.status(403).json({
                error: {
                    type: "USER_EXISTANT_ERROR",
                    message: "the user with this email exists"
                }
            })   
        }

        const newUser = temp.add({email , role , password})

        req.session.user = {
            id: newUser.id,
            role: newUser.role
        }
        await retardant(5500)
        return res.json({
            message: "the user has registered successfully",
            data: {
                ...newUser,
                password: undefined
            }
        })
    }

    static async Logout(req , res) {
        return req.session.destroy(async error => {
            if(error) {
                console.error(error)
                await retardant(5500)
                return res.status(500).json({
                    error: {
                        type: "SERVER_ERROR",
                        message: "server error"
                    }
                })
            }
            
            await retardant(5500)
            return res.json({
                message: "the user has logged out",
                data: null
            })
        })
    }
}

export default AuthController
