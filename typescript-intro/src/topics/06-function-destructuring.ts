

export interface Product {
    description: string
    price: number

}

const phone: Product = {
    description: "telefono",
    price: 1
}

const tablet: Product = {
    description: "tableta",
    price: 2000.0
}

interface TaxCalculationOptions {
    tax: number
    product: Product[]
}

export function taxCalculation({ tax, product }: TaxCalculationOptions): number[] {
    let total = 0;

    product.forEach(({ price }) => {

        total += price
    })

    return [total, total * tax]
}



const shoppingCart: Product[] = [phone, tablet];
const tax: number = 0.16;

const result = taxCalculation({ product: shoppingCart, tax })

console.log(result)
