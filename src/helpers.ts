export type Product = {
  id: number
  name: string
}
export type SelectedProduct={
  product:Product
  quantity:number
}

const AllProducts: Product[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Cherry' },
]

export function getProducts(): Promise<Product[]> {
  return new Promise(resolve => {
    console.log('downloading product list...')
    setTimeout(() => {
      console.log('downloaded product list')
      resolve(AllProducts)
    }, 2000)
  })
}
