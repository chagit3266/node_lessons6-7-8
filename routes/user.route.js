import users from '../users.js'

import express from 'express';

const router = express.Router()

router.post('/sign-in', (req, res) => {
  const { name, password } = req.body
  const index = users.findIndex(u => u.name === name)
  if (index >= 0) {
    if (users[index].password !== password)
      return res.status(401).json({ error: 'Invalid credentials' })
    return res.status(200).json('success')
  }
  res.status(404).json({ error: 'User not found' })
})
router.post('/sign-up', (req, res) => {
  const { name, password } = req.body
  const index = users.findIndex(u => u.name === name)
  if (index >= 0)
    return res.status(409).json({ error: 'Username already taken' });
  const user = { name, password }
  users.push(user)//add user
  res.json(user)
})
export default router