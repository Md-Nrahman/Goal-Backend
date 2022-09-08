const express = require('express')
const { getGoals, setGoals, updateGoal, deleteGoal } = require('../controllers/goalController')
const router = express.Router()

router.get('/',getGoals).post('/',setGoals)
router.put('/:id',updateGoal).delete('/:id',deleteGoal)

module.exports= router