import users from '../users.js'

import express from 'express';

const router = express.Router()

router.post('/sign-in', (req, res) => {
  const {name,password}=req.body
  const index=users.findInIndex(u=>u.name===name)
  if(index>0){
    if(users[index].password!==password)
        res.status(401).json({ error: 'Invalid credentials' })
    res.status(200).json('success')
  }
  res.status(404).json({ error: 'User not found' })
})
router.post('/sign-un', (req, res) => {
   const {user}=req.body
   const index=users.findInIndex(u=>u.name===user.name)
   if(index>=0)
     retatus(409).json({ error: 'Username already taken' });
   users.push(user)
   res.json(user)
})
export default router