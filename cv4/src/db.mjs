import knex from 'knex'
import knexfile from '../knexfile.mjs'

const db = knex(knexfile)

export default db 

export const getAllTodos = async() => {
    return await db('todos').select('*')
}