import express from 'express'
import db from './src/db.mjs'
import { createWebSocketServer, sendTodosToAllConnections } from './src/websocket.mjs'

const port = 3000

const app = express()

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: true }))

app.post('/add', async (req, res) => {
    if (req.body && req.body.text) {
        await db('todos').insert({
            text: String(req.body.text),
            done: false
        })
    }
    res.redirect("/")
})

app.get('/', async (req, res) => {
    const todos = await db('todos').select('*')
    res.render('index', { title: "todo list", todos})
})

app.get('/hello/:jmeno', (req, res) => {
    res.send("ahoj " + req.params.jmeno)
})

app.get('/done/:id', async (req, res) => {
    const id = Number(req.params.id)
    //const todo = await db('todos').select('*').where('id', id).first()

    await db('todos').update({ done: true }).where('id', id)

    await sendTodosToAllConnections()
    res.redirect("/")
})

app.get('/undone/:id', async (req, res) => {
    const id = Number(req.params.id)
    //const todo = await db('todos').select('*').where('id', id).first()

    await db('todos').update({ done: false }).where('id', id)
    await sendTodosToAllConnections()
    //res.end()
    res.redirect("/")
})

app.get('/delete/:id', async (req, res) => {
    const id = Number(req.params.id)

    await db('todos').delete().where('id', id)

    res.redirect("/")
})

const server = app.listen(port, () => {
    console.log(`server is listening ${port}`)
})

createWebSocketServer(server)