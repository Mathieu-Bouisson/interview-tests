/* ------------------------------------------
   API server
--------------------------------------------- */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import './seed'

import {
  findByEmail,
  matchPasswords,
  sanitizeUser,
  makeToken,
  checkToken,
  getAll as getAllUsers,
  insert as insertUser
} from './models/user'

import {
  getAll as getAllReports,
  insert as insertReport,
  update as updateReport,
  remove as removeReport
} from './models/report'

import {
  getAll as getAllComments,
  insert as insertComment,
  getAllByReportId as getAllCommentsByReportId
} from './models/comment'

const server = express()
server.use(bodyParser.json())
server.use(cors())

const JWTAuthMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ error: 'Unauthorized request' })
  }
  const { email } = checkToken(authorization)
  if (!email) return res.status(403).json({ error: 'Unauthorized request' })
  findByEmail(email)
    .then(user => {
      if (!user) return res.status(403).json({ error: 'Unauthorized request' })
      next()
    })
}

server.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(401).json({ error: 'Not Authorized' })
  }
  findByEmail(email)
    .then(user => {
      if (!user) return res.status(401).json({ error: 'Not Authorized' })
      if (matchPasswords(password, user.password)) {
        return res.json({
          user: sanitizeUser(user),
          token: makeToken(user)
        })
      }
      return res.status(401).json({ error: 'Not Authorized' })
    })
})
server.post('/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  findByEmail(email)
    .then(user => {
      if (user) return res.status(403).json({ error: 'User already exists' })
      return insertUser(req.body)
        .then(inserted => {
          res.json({
            user: sanitizeUser(inserted),
            token: makeToken(inserted)
          })
        })
    })
})

server.get('/user', JWTAuthMiddleware, (req, res) => {
  return getAllUsers()
    .then(users => {
      res.json(users)
    })
})

server.get('/report', JWTAuthMiddleware, (req, res) => {
  return getAllReports()
    .then(reports => {
      res.json(reports)
    })
})
server.post('/report', JWTAuthMiddleware, (req, res) => {
  const { title, description, status, userId, categoryId } = req.body
  if (!title || !description || !status || !userId || !categoryId) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  return insertReport(req.body)
    .then(saved => {
      res.json(saved)
    })
})
server.put('/report', JWTAuthMiddleware, (req, res) => {
  const { id, ...rest } = req.body
  if (!id) return res.status(400).json({ error: 'No ID provided' })
  return updateReport(id, rest)
    .then(saved => {
      res.json(saved)
    })
    .catch(e => {
      if (e === 'BAD_ID') {
        return res.status(400).json({ error: 'Bad ID provided' })
      }
    })
})
server.delete('/report/:id', JWTAuthMiddleware, (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'No ID provided' })
  return removeReport(id)
    .then(deleted => {
      if (deleted.length > 0) {
        res.json({ success: true })
      } else {
        res.status(404).json({ error: 'No report found' })
      }
    })
})

server.get('/report/:id/comment', JWTAuthMiddleware, (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'No ID provided' })
  return getAllCommentsByReportId(id)
    .then(reports => {
      res.json(reports)
    })
})

server.get('/comment', JWTAuthMiddleware, (req, res) => {
  return getAllComments()
    .then(comments => {
      res.json(comments)
    })
})
server.post('/comment', JWTAuthMiddleware, (req, res) => {
  const { content, userId, reportId } = req.body
  if (!content || !userId || !reportId) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  return insertComment(req.body)
    .then(saved => {
      res.json(saved)
    })
})

server.listen(8000, () => {
  console.log('Server listen on 8000')
})
