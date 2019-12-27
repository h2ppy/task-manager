const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/tasks',auth,async (req,res)=>{
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{
    const match = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort:{
                    createdAt:1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks) 
    } catch (e) {
        res.status(500).send()
     }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const _id = req.params.id

    const updateKeys = Object.keys(req.body)
    const allowedUpdateKeys = ['description','completed']
    const isValid = updateKeys.every((item)=>{
        return allowedUpdateKeys.includes(item)
    })

    if(!isValid) {
        return res.status(400).send({error:"invalid updaes boss"})
    }

    try {
        const task = await Task.findByIdAndUpdate(_id,req.body,{new :true,runValidators:true}) 
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})
module.exports = router
