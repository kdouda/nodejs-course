function add(x, y) {
    return x + y
} 

const secti = add

function makeCounter() {
    let count = 0

    return () => {
        count++

        return count
    }
}

const counter = makeCounter()

console.log(counter())
console.log(counter())

const counter2 = makeCounter()
console.log(counter2())

const cisla = [1, 2, 3, 4, 5, 6]

console.log(cisla.filter(x => x % 2 === 0))

console.log(cisla.map(x => x * 2))

console.log(cisla.filter(x => x % 2 === 0).map(x => x * 2))

const people = [
    { firstName: 'test', lastName: 'asdf' },
    { firstName: 'asdf', lastName: 'cdfg' }
]

console.log(people.find(x => x.firstName === 'test'))