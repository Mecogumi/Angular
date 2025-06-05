import type { Product } from './06-function-destructuring';
import { taxCalculation } from './06-function-destructuring';


const shoppingCart: Product[] = [{
    description: 'tefe',
    price: 23
},
{
    description: 'table',
    price: 23
}];

const [total, tax] = taxCalculation({ tax: 0.16, product: shoppingCart })

console.log(total, tax)