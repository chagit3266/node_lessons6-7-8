import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    mail: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, unique: true },
    date: { type: Date, default: Date.now },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book', maxlength: [3, ""] }],
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
})

export const generateToken = (user) => {
    const secretKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign({ _id: user.id, mail: user.mail, phone: user.phone, role: user.role }, secretKey, { expiresIn: '5m' })
    return token
}

userSchema.pre('save', async function () {

    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    this.password = await bcrypt.hash(this.password, salt);

    console.log(this);
})

export default model("user", userSchema)