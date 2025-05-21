import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next({ status: 401, message: 'Missing or invalid authorization header.' });
        }
        const [, token] = authHeader.split(' ');

        //נשמר כאן את המשתמש במשתנה בקשה שיהיה למידלורים הבאים
        req.currentUser = jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET')
        next();
    } catch (error) {
        next({ status: 401, message: 'Invalid token.' });
    }
}

export const checkAdmi = (req, res, next) => {
if (!req.currentUser || req.currentUser.role!=='admin') {
        return next({status:403, message: 'Access denied. Admins only.'});
    }
    next();
}