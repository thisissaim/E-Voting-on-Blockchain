const { json } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/Signupmodels')

router.post('/signup' , (request, response)=>{
    const signedupUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        pass:request.body.pass,
        email:request.body.email,
        contact:request.body.contact

    })
    signedupUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})
module.exports = router
//5KQTomTuHBBULF5V pass for databse access