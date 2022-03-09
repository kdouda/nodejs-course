import http from 'http'
import chalk from 'chalk'
import fs from "fs/promises"


const port = 8080
const staticFilePath = "./public"

const server = http.createServer(async (req, res) => {
    console.log('url', req.url)
    console.log('method', req.method)

    let path = req.url.substring(1)

    if (path.length === 0) {
        path = "index.html"
    }

    if (path.endsWith("/")) {
        res.setHeader("Location", "/" + path.substring(0, path.length - 1))
        res.statusCode = 302 // nechci aby si to browser pamatoval
        res.end()
        return
    }

    path = `${staticFilePath}/${path}`
    console.log('looking up file', path)

    try {
        const fspath = await fs.realpath(path)
        res.write(await fs.readFile(fspath))
        res.end()
    } catch (e) {
        console.log(e)
        console.log('file does not exist')
        res.statusCode = 404
        res.end()
    }
})

server.listen(port, () => {
    console.log(chalk.green(`server listening on http://localhost:${port}`))
})

