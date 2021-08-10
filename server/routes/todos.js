import express from 'express'
import { createTodo, deleteTodo, readTodos, updataTodo } from '../controller/todo.js'

const router=express.Router()
router.get('/',readTodos)
router.post('/',createTodo)
router.patch('/:id',updataTodo)
router.delete('/:id',deleteTodo)

export default router