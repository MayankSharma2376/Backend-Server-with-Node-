const {v4: uuid} = require("uuid")

const {format} = require("date-fns")

const fs = require("fs")

const fsPromises = require("fs").promises

const path = require("path")


const logEvents = async(message)=>{
    const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
   try{
    const logDir = path.join(__dirname, "logs")

    if(!fs.existsSync(logDir)){
        await fsPromises.mkdir(logDir, {recursive: true})
    }

    // testing 

    await fsPromises.appendFile(path.join(logDir, "eventLog.txt"), logItem)

   }catch(err){
    console.log(err)

   }
}

module.exports = logEvents

// console.log(uuid())

// console.log()

// console.log(format(new Date(), "yyyy-MM-dd\tHH:mm:ss"))