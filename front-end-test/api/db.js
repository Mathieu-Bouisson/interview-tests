/* ------------------------------------------
   DB setup
--------------------------------------------- */
import { existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'

const jsonDBFile = resolve('data', 'db.json')
if (!existsSync(jsonDBFile)) {
  writeFileSync(jsonDBFile, '{}');
}
const adapter = new FileAsync(jsonDBFile)
const db = low(adapter)

export default db
