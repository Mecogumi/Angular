function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = 'New Property'
        hello = 'override'
    }
}


@classDecorator
export class SuperClass {
    public property: string = 'abc'

    public print() {
        console.log('hola mundo')
    }
}

console.log(SuperClass)

const myClass = new SuperClass();

console.log(myClass)