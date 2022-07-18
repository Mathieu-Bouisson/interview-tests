/* ------------------------------------------
   Report model
--------------------------------------------- */
import { generate } from 'shortid'
import db from '../db'

const COLLECTION_NAME = 'reports';
const defaultModel = {
  title: '',
  description: '',
  status: '',
  category: '',
  userId: null,
  createdAt: null,
  updatedAt: null,
}

export const getAll = () => db
  .then(con => con.get(COLLECTION_NAME).value())

export const insert = report => db
  .then(con => {
    const toSave = {
      id: generate(),
      ...defaultModel,
      ...report,
      createdAt: Date.now()
    }
    return con.get(COLLECTION_NAME)
      .push(toSave)
      .write()
      .then(reports => reports
        .filter(r => r.id === toSave.id)
        .reduce((acc, c) => ({ ...acc, ...c }), {}))
  })

export const update = (id, fields) => db
  .then(con => {
    const current = con
      .get(COLLECTION_NAME)
      .find({ id })
      .value()
    if (!current) return Promise.reject('BAD_ID')
    return con
      .get(COLLECTION_NAME)
      .find({ id })
      .assign({
        ...fields,
        updatedAt: Date.now()
      })
      .value()
  })

export const remove = id => db
  .then(con => con.get(COLLECTION_NAME)
    .remove({ id })
    .value()
  )
