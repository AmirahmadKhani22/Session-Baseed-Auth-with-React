import express from "express"
import {notfound , welcomeV1} from "../controllers/index.js"
import authRouters from "./auth.js"
import CheckAuthMiddleware from "../middlewares/auth.js"
import userRouters from "./user.js"

const router = express.Router()

router.get("/v1" , welcomeV1)

router.use("/v1/auth" , authRouters)
router.use(
    "/v1/user",  
    [CheckAuthMiddleware.didLogin.bind(CheckAuthMiddleware)], 
    userRouters
)

router.use(notfound)

export default router
