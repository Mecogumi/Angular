export function whatsMyType<T>(argument: T): T {
    return argument
}

const iAmString = whatsMyType<string>('hola mundo')
const iAmNumber = whatsMyType<number>(10)
const iAmArray = whatsMyType<number[]>([1, 2, 4, 5])

console.log(iAmString);
console.log(iAmNumber);
console.log(iAmArray);