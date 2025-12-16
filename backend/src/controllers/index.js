import retardant from "../utils/retardant.js"

export async function welcomeV1(req , res) {
  return res.json({
    message: "welcome!",
    data: null
  })
}

export async function notfound(req , res) {
  return res.status(404).json({
    error: {
      type: "NOTFOUND_ERROR",
      message: "the route has not found!"
    }
  })
}

export async function globalErrorHandler(err , req , res , next) {
  console.error(err.stack)
  await retardant(5500)
  return res.status(500).json({
    error: {
      type: "SERVER_ERROR",
      message: "unexpected server error"
    }
  })
}
