import books from "../books.js";
import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
    res.json(books);
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    let index = books.findIndex(b => b.id == id)
    if (index == -1) {
        res.status(404).json("NOT FOUND")
    }
    else {
        res.json(books[index]);
    }
})
router.post('/', (req, res) => {
    const { book } = req.body;
    books.push(book)
    res.json(book);
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const { book } = req.body
    let index = books.findIndex(b => b.id == id)
    // books[index].id = book.id
    books[index].name = book.name
    books[index].price = book.price
    res.json(book)
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    let index = books.findIndex(b => b.id == id)
    if (index == -1) {
        res.status(404).json("NOT FOUND")
    }
    else {
        books.splice(index, 1)
        res.json()
    }
})

export default router