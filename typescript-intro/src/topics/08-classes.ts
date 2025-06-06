
export class Person {
    //public name: string
    //private address: string


    constructor(
        public name: string,
        private address: string = 'no address') { }

}

/*
export class Hero extends Person {
    constructor(
        public alterego: string,
        public age: number,
        public realName: string
    ) {
        super(realName);
    }
}
*/

export class Hero {

    constructor(
        public alterego: string,
        public age: number,
        public realName: string,
        public person: Person
    ) {
    }
}

const tony = new Person('Tony Stark', 'New york');
const ironman = new Hero('ironman', 45, 'Tony', tony)

console.log(ironman)