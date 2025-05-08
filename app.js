import express from 'express'
import booksRoute from './routes/book.route.js';
import userRoute from './routes/user.route.js'
import {addDate,printDate} from './middlewares/addDate.middleware.js'

const app = express();

app.use(express.json());

app.use(addDate)
app.use(printDate)

app.get('/', (req, res) => {
    res.json('HELLO TO YOU');
});

app.use('/books', booksRoute);
app.use('/users',userRoute);

const PORT=5000
app.listen(PORT, () => {
    console.log(`השרת רץ על הפורט ${PORT}`);
});