var express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var Schema = require('mongoose').Schema
const userSchema = Schema({
    username: String,
    password: String,
    name: String,
    surname: String,
    gender: String
}, {
    collection: 'users'
})

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema)
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10)
    return result
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password,
            name: dataUser.name,
            surname: dataUser.surname,
            gender: dataUser.gender
        })
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'))
            }else{
                resolve({message: 'Sign up successfully'})
            }
        })
    })
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                username: req.body.username,
                password: hashText,
                name: req.body.name,
                surname: req.body.surname,
                gender: req.body.gender
            }
            console.log(playload);
            insertUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result)
                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                })
        })
    })
module.exports = router
