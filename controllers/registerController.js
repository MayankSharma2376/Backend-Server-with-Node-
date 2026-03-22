const userDB = {
    users: require("../model/users.json"),
    setUsers: function(data){
        this.users = data
    }

}

const fsPromises = require("fs").promises
const path = require("path")

const bcrypt = require("bcrypt")
const { json } = require("stream/consumers")


const handleNewUser = async(req, res)=>{
    const {user, password} = req.body
    if(!user || !password){
        return res.status(400).json({
            message: "Enter Valid Credentials"
        })
    }



    // check for duplicate username in the database


    const duplicate = userDB.users.find(person => person.username === user);
    if(duplicate){
        return res.sendStatus(409)
    }


    try{

        // encrypt the password

        const hashedPassword = await bcrypt.hash(password, 10)
        // store the new user

        const newUser = {
            "username": user,
            "password": hashedPassword
        }

        userDB.setUsers([...userDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(userDB.users)
        )

        console.log(userDB.users)
        res.status(201).json({
            success: `New user ${user} created!`
        })

    }catch(err){
        res.status(500).josn({
            message: "Internal Server Error"
        })

    }
}



module.exports = {
    handleNewUser
}