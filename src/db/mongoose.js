const  mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})


// const me = new User({
//     name:'Happy',
//     age : 2,
//     password:'    dfdf   ssworkdfd '
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error',error)
// })




// const pehla = new Task({
//     // description:'when do i do what i want to do',
//     completed:'false',
//     some:'other info'
// })

// pehla.save().then(()=>{
//     console.log(pehla)
// }
// ).catch((e)=>{
//     console.log("Error",e)
// })