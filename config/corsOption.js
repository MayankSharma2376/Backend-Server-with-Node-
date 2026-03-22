const whiteList = ["http://127.0.0.1:5500",
    "http://localhost:3000",
    "http://localhost:3500"]

const corsOptions = {
    origin: (origin, callback)=>{
        console.log("Requested Origin : ", origin)
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("Not Allowed by cors"))
        }
    },

    OptionSuccessStatus: 200

}


module.exports = corsOptions