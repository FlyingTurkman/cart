'use client'


import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { cartCookieType, cartProductType, productType } from '@/types'
import { getBasketItems } from "@/actions/getBasketItems"





export type siteContextType = {
    cart: cartCookieType[]
    setCart: Dispatch<SetStateAction<cartCookieType[]>>,
    allProducts: productType[]
}



const SiteContext = createContext<siteContextType>({
    cart: [],
    setCart: () => {},
    allProducts: []
})



export function useSiteContext(): siteContextType {
    const ctx = useContext(SiteContext)

    if (!ctx) {
        throw new Error('useSiteContext must be within SiteContextProvider')
    }

    return ctx
}


export default function SiteContextProvider({
    children,
    allProducts
}: {
    children: ReactNode,
    allProducts: productType[]
}) {

    const [cart, setCart] = useState<cartCookieType[]>([])

    const value: siteContextType = {
        cart,
        setCart,
        allProducts
    }

    useEffect(() => {

        // initial shopping cart set
        getBasketItems().then((data) => {
            setCart(data)
        })

    }, [])
    return (
        <SiteContext.Provider
        value={value}
        >
            {children}
        </SiteContext.Provider>
    )
}
