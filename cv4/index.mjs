import express from 'express'

const port = 3000

const app = express()

app.set('view engine', 'ejs')

let id = 0

let todos = [
    {
        id: id++,
        text: "asdf",
        done: true
    },
    {
        id: id++,
        text: "asdf",
        done: false
    }
]

app.use(express.urlencoded({ extended: true }))

app.post('/add', (req, res) => {
    console.log(req.body)
    if (req.body && req.body.text) {
        todos.push({
            id: id++,
            text: req.body.text,
            done: false
        })
    }
    res.redirect("/")
})

app.get('/', (req, res) => {
    res.render('index', { title: "todo list", todos})
})

app.get('/hello/:jmeno', (req, res) => {
    res.send("ahoj " + req.params.jmeno)
})

app.get('/done/:id', (req, res) => {
    const todo = todos.filter(x => x.id == req.params.id)
    
    if (todo) {
        todo[0].done = true
    }

    res.redirect("/")
})

app.get('/undone/:id', (req, res) => {
    const todo = todos.filter(x => x.id == req.params.id)
    
    if (todo) {
        todo[0].done = false
    }

    res.redirect("/")
})

app.get('/delete/:id', (req, res) => {
    const todoIndex = todos.findIndex(x => x.id == req.params.id)
    console.log(todoIndex)
    if (todoIndex >= 0) {
        todos.splice(todoIndex, 1)
    }

    res.redirect("/")
})

app.listen(port, () => {
    console.log(`server is listening ${port}`)
})