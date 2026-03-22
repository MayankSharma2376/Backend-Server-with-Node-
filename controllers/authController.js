const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){
        this.users = data
    }

}


const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();
const fsPromises = require("fs").promises
const path = require("path")

const handleLogin = async(req, res)=>{
    const {user, password} = req.body
    if(!user || !password){
        return res.status(400).json({
            message: "Enter Valid Credentials"
        })
    }

    const foundUser = userDB.users.find(person => person.username === user)
    if(!foundUser){
        return res.sendStatus(401)

    }

    const match = await bcrypt.compare(password, foundUser.password)
    if(match){
        // create jwt


        const accessToken = jwt.sign(
            {
                "username": foundUser.username
            },

            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30s"}
        )
        const refreshToken = jwt.sign(
            {
                "username": foundUser.username
            },

            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        )


        // Saving refreshToken with current user
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUSER  = {...foundUser, refreshToken}
        userDB.setUsers([...otherUsers, currentUSER])

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.josn"),
            JSON.stringify(userDB.users)
        )

        res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})




        res.json({
           accessToken
        })
    }else{
        res.sendStatus(401)
    }

}


module.exports = {
    handleLogin
}