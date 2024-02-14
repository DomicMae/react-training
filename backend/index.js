import express, { Router } from 'express';
import cors from 'cors';

const app = express();
const route = Router();

app.use(cors());

app.get('/', async (req, res) => {
    return res.status(200).json({
        status: 'Server is running!'
    })
})

const PORT = 3001

app.listen(PORT).on('listening', () => {
    console.log('Backend server is running!')
})

