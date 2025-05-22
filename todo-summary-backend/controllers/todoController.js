import dotenv from 'dotenv';
dotenv.config();
import { CohereClient } from "cohere-ai";
import axios from 'axios';
// import store from '../store/store.js'

let todos=[];

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const listTodos = async (req, res) => {
res.json(todos)
}

const createTodos = async (req, res) => {

    try {

    const {text} = req.body;
    if(!text) return res.status(400).json({error: 'Todo Text required'});

    const newTodo = {id: Date.now(), text};
    todos.push(newTodo);
    res.status(201).json({success: true, newTodo});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const deleteTodos = async (req, res) => {
    
    try {
        const id = parseInt(req.params.id);
        todos = todos.filter(todo => todo.id !== id);
        res.status(204).end();

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }
}

const updateTodo = async (req, res) => {
        
        try {
            const id = parseInt(req.params.id);
            const { text } = req.body;
            const index = todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        todos[index].text = text;
        res.json({ success: true, updatedTodo: todos[index] });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update todo' });
    }
};

const summarizeTodos = async (req, res) => {

    try {
        if(todos.length === 0){
            return res.status(400).json({success: false, message: 'No Todos to Summarize'});
        }

        const todoTexts = todos.map(todo=> `- ${todo.text}`).join('\n');

        const response = await cohere.generate({
            model: 'command',
            prompt: `Summarize the following todo list:\n${todoTexts}`,
            maxTokens: 100,
            temperature: 0.7,
        });

        const summary = response.generations[0].text;

        await axios.post(process.env.SLACK_WEBHOOK_URL, {
            text: `Todo Summary: ${summary}`,
        });

        res.json({success:true, summary});

    } catch (error) {
        console.error('Summarization error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to summarize todos.' });
    }
    
}

export {createTodos, listTodos, updateTodo, deleteTodos, summarizeTodos}