export {}





export type productType = {
    id: number
    title: string
    description: string
    price: number
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}


export type cartProductType = productType & {
    count: number
}