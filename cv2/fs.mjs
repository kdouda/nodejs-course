import fs from 'node:fs'

fs.readFile('test.txt', (err, contents) => {
    console.log(contents.toString())
})