import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';

import { errorHandler, notFound } from './middlewares/errorHandling.middleware.js';
import {addDate,printDate} from './middlewares/Date.middleware.js';
import booksRoute from './routes/book.route.js';
import userRoute from './routes/user.route.js';

config()
console.log('🔍 DB_URL from .env:', process.env.DB_URI);

import { connectDB } from './config/db.js';
connectDB()

const app = express();

app.use(express.json());
// מאפשר לקבל באדי מתוך טופס
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(cors());

app.use(addDate)
app.use(printDate)

app.get('/', (req, res) => {
    res.json('HELLO TO YOU');
});

app.use('/books', booksRoute);
app.use('/users',userRoute);

app.use(notFound);

app.use(errorHandler);

const PORT=5000
app.listen(PORT, () => {
    console.log(`השרת רץ על הפורט ${PORT}`);
});