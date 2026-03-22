const http = require("http")
const path = require("path")
const fs = require("fs")
const {logEvents, logger} = require("./middlewares/logEvent")
const cors = require("cors")
const corsOptions = require("./config/corsOption")
const errorHandler = require("./middlewares/errorHandler")
const verifyJWT = require("./middlewares/verifyJWT")
const cookieParser = require("cookie-parser")

const express = require("express")

const app = express();


const PORT = process.env.PORT || 3500


// Custom-Built Middlewares
app.use(logger)



// cross origin resource sharing
app.use(cors(corsOptions))







// Inbuilt Middlewares

app.use(express.urlencoded({extended: false}))

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, "/public")))
// app.use("/subdir", express.static(path.join(__dirname, "/public")))



app.use("/", require("./routes/root"))
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT)
app.use("/employees", require("./routes/api/employees"))



// app.get("/", (req, res)=>{
//     // res.sendFile("./views/404.html", {root: __dirname})
//     res.sendFile(path.join(__dirname, "views", "index.html"))
// })

// app.get("/new_page.html", (req, res)=>{
//     // res.sendFile("./views/404.html", {root: __dirname})
//     res.sendFile(path.join(__dirname, "views", "new_page.html"))
// })
// app.get("/404.html", (req, res)=>{
//     // res.sendFile("./views/404.html", {root: __dirname})
//     // res.sendFile(path.join(__dirname, "views", "404.html"))
//     res.redirect(301, "/new_page.html")
// })

// const one = (req, res, next)=>{
//     console.log("One")
//     next();
// }


// const two = (req, res, next)=>{
//     console.log("Two")
//     next();
// }

// const three = (req, res, next)=>{
//     console.log("Three")
//     res.send("Finished!")
// }



// app.get("/chain", [one, two, three])

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
// myEmitter.on("log", (msg)=>{
//     logEvents(msg)
// })



// setTimeout(()=>{
//     myEmitter.emit("log", "Log Event Emitted!!")
// }, 3000)