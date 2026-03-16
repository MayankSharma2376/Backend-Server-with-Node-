const http = require("http")
const path = require("path")
const fs = require("fs")

const fsPromises = require("fs").promises


const logEvents = require("./logEvent")

const EventEmitter = require("events")
const { ht, fi } = require("date-fns/locale")


class MyEmitter extends EventEmitter{}



const myEmitter = new MyEmitter()



const PORT = process.env.PORT || 3500


const serveFile = async(filePath, contentType, response)=>{
    try{

        const data = await fsPromises.readFile(filePath, "utf8")
        response.writeHead(200, {"contentType": contentType})
        response.end(data)
    }catch(err){
        console.log(err)
        response.statusCode = 500
        response.end("Internal Server Code")
    }

}

const server = http.createServer((req, res)=>{
    console.log(req.url, req.method)

    const extension = path.extname(req.url)
    let contentType;

    switch(extension){
        case ".css":
            contentType = "text/css";
            break

        case ".js":
            contentType = "text/javascript"
            break

        case ".json":
            contentType = "application/json"
            break
        
        case ".jpg":
            contentType = "image/jpg"
            break
        
        case ".png":
            contentType = "image/png"
            break
        
        default:
            contentType = "text/html"

    }


    let filePath = contentType === "text/html" && req.url === "/"
    ? path.join(__dirname, "views", "index.html") :
    contentType === "text/html" && req.url.slice(-1) === "/"
    ? path.join(__dirname, "views", req.url, "index.html")
    : contentType === "text/html"
    ? path.join(__dirname, "views", req.url)
    : path.join(__dirname, req.url)

    if(!extension && req.url.slice(-1) !== "/"){
        filePath += ".html"
    }

    const fileExists = fs.existsSync(filePath)


    if(fileExists){
        serveFile(filePath, contentType, res)

    }else{
        switch(path.parse(filePath).base){
            case "old-page-html":
                res.writeHead(301, {"Location" : "/new-page.html"})
                res.end()
                break
            

            case "www-page-html":
                res.writeHead(301, {"Location" : "/"})
                res.end()
                break;

            default:
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res)

        }
    }

    
})



server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
// myEmitter.on("log", (msg)=>{
//     logEvents(msg)
// })



// setTimeout(()=>{
//     myEmitter.emit("log", "Log Event Emitted!!")
// }, 3000)