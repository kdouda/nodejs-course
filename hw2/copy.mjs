import { readFile, writeFile } from "fs"
import { argv } from "process"

const copy = function (from, to) {
    readFile(from, (err, data) => {
        if (err) {
            console.warn("Error opening original file!")
            return
        }

        writeFile(to, data, (err) => {
            if (err) {
                console.warn("File could not be copied to its destination")
            } else {
                console.log(`File ${from} was copied to ${to}`)
            }
        } )
    })
}

const args = argv.splice(2)

if (args.length !== 2) {
    console.log("Invalid number of arguments, two are maximum")
} else {
    copy(args[0], args[1])
}