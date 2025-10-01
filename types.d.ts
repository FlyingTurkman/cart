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

export type cartCookieType = {
    productId: number,
    count: number
}

export type cartProductType = productType & {
    count: number
}

export type responseType = {
    status: boolean,
    message?: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            homeDomain: string
        }
    }
}