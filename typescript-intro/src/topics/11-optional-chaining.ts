export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Damian'
}

const passenger2: Passenger = {
    name: ' Dulce',
    children: ['juana', 'sotana']
}


const howManyChilds = (passenger: Passenger) => {
    const childs = passenger.children?.length || 0;
    console.log(childs)
}

howManyChilds(passenger2)
