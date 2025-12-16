import express from "express"
import AuthDataValidationMiddleware from "../middlewares/dataValidation/auth.js"
import CheckAuthMiddleware from "../middlewares/auth.js"
import AuthController from "../controllers/auth.js"

const router = express.Router()

router.post(
    "/login",
    [
        AuthDataValidationMiddleware.login.bind(AuthDataValidationMiddleware)
    ],
    AuthController.Login.bind(AuthController)
)

router.post(
    "/register",
    [   
        CheckAuthMiddleware.didNotLogin.bind(CheckAuthMiddleware),
        AuthDataValidationMiddleware.register.bind(AuthDataValidationMiddleware)
    ], 
    AuthController.register.bind(AuthController)
)

router.get(
    "/logout",
    [CheckAuthMiddleware.didLogin.bind(CheckAuthMiddleware)], 
    AuthController.Logout.bind(AuthController)
)

export default router
