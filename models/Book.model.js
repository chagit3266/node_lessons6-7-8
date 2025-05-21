import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    name: { type: String, minlength: [3, 'Name must be at least 3 characters long'] },
    price: Number,
    category: {
        type: [String],
        enum: ['Fiction', 'Nonfiction', 'History', 'Science', 'Kids', 'Religion']
    },
    author: {
        name: String,
        phone: String,
        mail: String
    },
    isBorrowed: {type: Boolean,default: false},
});

export default model('book', bookSchema)