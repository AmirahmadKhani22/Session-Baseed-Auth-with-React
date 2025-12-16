import User from "../stores/user.js"
import retardant from "../utils/retardant.js"

class UserController {
    static async getAll(req , res) {
        const persons = (new User()).getAll()
        await retardant(5500)
        return res.json({
            message: null,
            data: persons.map(item => {
                if(item) {
                    return {
                        ...item,
                        password: undefined
                    }
                } else {
                    return item
                }
            })
        })
    } 

    static async getById(req , res) {
        const {id} = req.params
        const person = (new User()).getById(id)
        if(!person) {
            req.session.destroy(async error => {
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
            })
            await retardant(5500)
            return res.status(401).json({
                error: {
                    type: "UNAUTHORIZED_ERROR",
                    message: "the user doesn't exists"
                }
            })
        } 

        await retardant(5500)
        return res.json({
            message: null,
            data: {
                ...person,
                password: undefined
            }
        })
    }

    static async get(req , res) {
        const {id} = req.session.user
        const person = (new User()).getById(id)
        if(!person) {
            req.session.destroy(async error => {
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
            })
            await retardant(5500)
            return res.status(401).json({
                error: {
                    type: "UNAUTHORIZED_ERROR",
                    message: "the user doesn't exists"
                }
            })
        } 

        await retardant(5500)
        return res.json({
            message: null,
            data: {
                ...person,
                password: undefined
            }
        })
    }
}

export default UserController
