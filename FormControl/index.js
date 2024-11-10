const express = require('express')
const app = express()
const morgan = require('morgan')
const dbConnection = require('./config/db')
const userModel = require('./models/user') 

app.use(morgan('dev'))

//this middelware is use for get data from post req

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//this is use to connect css file
app.use(express.static('public'))

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('form')
})

app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',async (req,res)=>{
    const {username , email , password } = req.body

    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password
    })

    res.send(newUser)
})

app.get('/get-users',(req,res)=>{
    userModel.find({
        // username:'b' //this is use for get spesific data
    }).then((users)=>{
        res.send(users)
    })
})

app.get('/get-user',(req,res)=>{
    userModel.findOne({
        username:'d'
    }).then((user)=>{
        res.send(user)
    })
})

app.get('/update-user',async (req,res)=>{
    await userModel.findOneAndUpdate({
        username:'d'
    },{
        email:'d@d.com'
    }).then(()=>{
        res.send('user updated')
    })
})

app.get('/delete-user', async (req,res)=>{
    await userModel.findOneAndDelete({
        username:'d'
    }).then(()=>{
        res.send('user deleted')
    })
})

    //post is use for not show content on url

app.post('/get-form-data',(req,res)=>{
    console.log(req.body)
    res.send('data reacived')
})

app.listen(3000,()=>{
    console.log('your app lisnt on port 3000')
})