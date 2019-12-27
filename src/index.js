const express = require('express')
require('./db/mongoose')

const userRouter = require('../src/router/user')
const taskRouter = require('../src/router/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits:{
        fileSize:1000000 
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('not a doc file'))
        }
        cb(undefined,true)
    }
})

app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on port :",port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main  = async () =>{
   
}

main()