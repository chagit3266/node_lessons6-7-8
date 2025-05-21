// import books from "../books.js";
import Book from '../models/Book.model.js'

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        next({ message: error.message });
    }
}

export const getBookById = async (req, res, next) => {
    const id = req.params.id
    const book = await Book.findById(id);
    // let index = books.findIndex(b => b.id == id)
    // if (index == -1) {
    if (!book) {
        // res.status(404).json({ error: "Not found" })
       return next({ message: 'Not found', status: 404 })
    }
    res.json(book);
    // return res.json(books[index]);
}

export const addBook = async (req, res, next) => {

    try {
        const book = new Book(req.body);
        // books.push(book)
        await book.save()
        res.status(201).json(book);
    } catch (error) {
        next({ message: error.message });
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const id = req.params.id
        if (id !== req.body.id)
            return next({ status: 409, message: 'id conflict' })
        // let index = books.findIndex(b => b.id == id)

        const book = await Book.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            { new: true });
        // books[index].id = book.id
        // books[index].name = book.name
        // books[index].price = book.price
        if (!book) {
            // res.status(404).json({ error: "Not found" });
           next({ status: 404, message: 'Not found' })
        }
        res.json(book)
    } catch (error) {
        next({ message: error.message });
    }
}

export const deleteBook =async (req, res, next) => {
    try {
        const id = req.params.id
        const book =await Book.findByIdAndDelete(id)
        if (!book) {
            next({ message: "'Not found'", status: 404 })
            // res.status(404).json("NOT FOUND")
        }
    } catch (error) {
        next({ message: error.message })
    }
    // else {
    //     books.splice(index, 1)
    //     res.json()
    // }
}