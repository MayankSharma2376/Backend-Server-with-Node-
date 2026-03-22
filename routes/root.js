const express = require("express")
const router = express.Router()
const path = require("path")




router.get("/", (req, res)=>{
    // res.sendFile("./views/404.html", {root: __dirname})
    res.sendFile(path.join(__dirname, "..",  "views", "index.html"))
})

router.get("/new_page.html", (req, res)=>{
    // res.sendFile("./views/404.html", {root: __dirname})
    res.sendFile(path.join(__dirname, "..", "views", "new_page.html"))
})
router.get("/404.html", (req, res)=>{
    // res.sendFile("./views/404.html", {root: __dirname})
    // res.sendFile(path.join(__dirname, "views", "404.html"))
    res.redirect(301, "/new_page.html")
})


module.exports = router
