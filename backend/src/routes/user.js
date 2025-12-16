import express from "express"
import ACLMiddleware from "../middlewares/acl.js"
import UserController from "../controllers/user.js"

const router = express.Router()

router.get(
    "/all",
    [ACLMiddleware.check.bind(ACLMiddleware)("ADMIN")],
    UserController.getAll.bind(UserController)
)
router.get(
    "/:id",
    [ACLMiddleware.check("ADMIN")],
    UserController.getById.bind(UserController)
)

router.get(
    "/", 
    UserController.get.bind(UserController)
)

export default router
