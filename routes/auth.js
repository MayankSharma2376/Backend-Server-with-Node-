const express = require("express")

const router = express.Router()


const handleLogin = require("../controllers/authController")



router.post("/", handleLogin.handleLogin)

module.exports = router