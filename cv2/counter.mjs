import fs from 'node:fs'

fs.readFile('count.txt', (err, contents) => {
    if (err) {
        fs.writeFile('count.txt', '0', () => {
            
        })
    }
    console.log(contents.toString())
})