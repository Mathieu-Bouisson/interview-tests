/* ------------------------------------------
   User model
--------------------------------------------- */
import { generate } from 'shortid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import db from '../db'
import { JWT_SECRET, BCRYPT_SALT_ROUND } from '../constants'

const COLLECTION_NAME = 'users';
const defaultModel = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export const sanitizeUser = user => Object.keys(user)
  .reduce((acc, c) => ({
    ...acc,
    ...c !== 'password' ? { [c]: user[c] } : {}
  }), {})

export const matchPasswords = (password, hash) => bcrypt.compareSync(password, hash)

export const makeToken = user => jwt.sign({
  email: user.email,
}, JWT_SECRET)
export const checkToken = token => jwt.decode(token) || {}

export const findByEmail = email => db
  .then(con => {
    return con.get(COLLECTION_NAME)
      .find({ email })
      .value()
  })

export const getAll = () => db
  .then(con => con.get(COLLECTION_NAME)
    .write()
    .then(results => results.map(sanitizeUser))
  )

export const insert = user => db
  .then(con => {
    const toSave = {
      id: generate(),
      ...user,
      password: bcrypt.hashSync(user.password, BCRYPT_SALT_ROUND)
    }
    return con.get(COLLECTION_NAME)
      .push(toSave)
      .write()
      .then(users => users
        .filter(u => u.id === toSave.id)
        .reduce((acc, c) => ({ ...acc, ...c }), {}))
  })
