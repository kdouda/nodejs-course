import { readFile, writeFile, access } from "fs/promises"
import { argv } from "process"

const copy = async function (from, to) {
    try {
        const readData = await readFile(from)

        try {
            await access(to)
            console.warn("File already exists!")
        } catch (e) {
            // do nothing, file doesnt exist
        }

        try {
            await writeFile(to, readData)
        } catch {
            console.log("Could not write to destination path")
        }
    } catch {
        console.log("Could not read file")
    }
}

const args = argv.splice(2)

if (args.length !== 2) {
    console.log("Invalid number of arguments, two are maximum")
} else {
    copy(args[0], args[1])
}