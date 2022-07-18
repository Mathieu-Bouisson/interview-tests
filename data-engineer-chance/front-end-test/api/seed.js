/* ------------------------------------------
   Data seed
--------------------------------------------- */
import bcrypt from 'bcrypt'
import { generate } from 'shortid'

import db from './db'
import { BCRYPT_SALT_ROUND } from './constants'

const usersSeed = [
  {
    id: generate(),
    firstName: 'Nicolas',
    lastName: 'ANDRE',
    email: 'nicolas@chance.co',
    password: bcrypt.hashSync('chance', BCRYPT_SALT_ROUND),
  }
]
const categoriesSeed = [
  {
    id: generate(),
    label: 'User interface'
  },
  {
    id: generate(),
    label: 'Application behavior'
  },
  {
    id: generate(),
    label: 'Wrong content'
  },
  {
    id: generate(),
    label: 'Localization'
  },
]
const reportsSeed = []
const commentsSeed = []

let shouldSeedUsers = false
let shouldSeedCategories = false
let shouldSeedReports = false
let shouldSeedComments = false

db
  .then(con => {
    const promises = []
    promises.push(con.get('users').write())
    promises.push(con.get('categories').write())
    promises.push(con.get('reports').write())
    promises.push(con.get('comments').write())

    Promise.all(promises)
      .then(responses => {
        if (!responses[0]) {
          shouldSeedUsers = true
        }
        if (!responses[1]) {
          shouldSeedCategories = true
        }
        if (!responses[2]) {
          shouldSeedReports = true
        }
        if (!responses[3]) {
          shouldSeedComments = true
        }
        con.defaults({
          ...shouldSeedUsers ? { users: usersSeed } : {},
          ...categoriesSeed ? { categories: categoriesSeed } : {},
          ...shouldSeedReports ? { reports: reportsSeed } : {},
          ...shouldSeedComments ? { comments: commentsSeed } : {},
        }).write()
      })
      .catch(e => {
        throw e
      })
  })
