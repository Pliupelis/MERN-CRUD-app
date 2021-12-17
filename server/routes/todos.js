
import {getTodo,  createTodo, updateTodo, updatepartTodo, deleteTodo } from '../controllers/todo.js';
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getTodo)
router.post('/', auth, createTodo)
router.patch('/:id', auth, updatepartTodo)
router.delete('/:id', auth, deleteTodo)
router.put('/:id', auth, updateTodo);

export default router; 