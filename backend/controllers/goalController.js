const asyncHandler= require('express-async-handler')

const Goal = require('../models/goalModel')

const getGoals=asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

const setGoals=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400).json({message:'Please add a text field'})
    }

    const goal = await Goal.create({text:req.body.text})
    res.status(200).json(goal)
})

const updateGoal=asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400).json({message:'Goal Not found'})
    }

    const updateGoal= await Goal.findByIdAndUpdate(req.params.id, req.body,{new:true,})
    res.status(200).json(updateGoal)
})

const deleteGoal=asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400).json({message:'Goal Not found'})
    }

    const deleteGoal= await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteGoal)
})

module.exports={
    getGoals, setGoals, updateGoal, deleteGoal
}