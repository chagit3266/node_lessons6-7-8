// import users from '../users.js'
import User, { generateToken } from '../models/User.model.js'

export const signIn = async (req, res, next) => {

    const { mail, password } = req.body
    try {
        const user =await User.findOne({ mail })
        if (!user)
            return next({ message: 'User not found', status: 404 })
        const isEven = await bcrypt.compare(password, user.password)
        if (!isEven)
            return next({ status: 401, message: 'Invalid credentials' });
        //ניצור טוקן ונחזיר
        const token = generateToken(user)
        res.json({ username: user.username, token });
    } catch (error) {
        next({ message: error.message })
    }
}

export const signUp = async (req, res, next) => {
    const { username, phone, mail, password } = req.body
    try {
        const exisuser = await User.findOne({ $or: [{ phone }, { mail }] })
        if (exisuser) {
            return next({
                message: exisuser.mail === mail
                    ? 'Email already exists'
                    : 'Phone already exists'
                , status: 409
            })
        }
        
        //וחוסכים את הקטע הזה -לפני כל שמירה הוא יצפין סיסמה pre עושים פונקצית 
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = new User({
        //     username,
        //     password: hashedPassword,
        //     mail,
        //     phone,
        // })
        await user.save()
        //ניצור טוקן ונחזיר
        const token = generateToken(user)
        res.json({ username: user.username, token });
    } catch (error) {
        next({ message: error.message })
    }
    // users.push(user)//add user
    // res.json(user)
}