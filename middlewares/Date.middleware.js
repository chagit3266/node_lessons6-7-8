export const addDate = (req, res, next) => {
    req.currentDate = new Date();
    next()
}

export const printDate = (req, res, next) => {
    if (req.method === 'GET') {
        console.log(req.cuurentDate);
    }
    next()
}