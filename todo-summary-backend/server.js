import dotenv from'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo-routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/todos',todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
