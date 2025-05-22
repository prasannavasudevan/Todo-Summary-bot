import express from'express';
import { listTodos, createTodos, updateTodo, deleteTodos, summarizeTodos} from '../controllers/todoController.js';
const todoRouter = express.Router();

todoRouter.get('/', listTodos);

todoRouter.post('/', createTodos);

todoRouter.put('/:id', updateTodo);

todoRouter.delete('/:id', deleteTodos);

todoRouter.post('/summarize', summarizeTodos)

export default todoRouter;