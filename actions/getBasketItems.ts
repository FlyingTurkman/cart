'use server'

import { cartCookieType } from "@/types";
import { cookies } from "next/headers";














export async function getBasketItems(): Promise<cartCookieType[]> {
    try {
        
        const cookieStore = await cookies()

        const storage = cookieStore.get('cart')?.value

        if (!storage) {
            return []
        }

        return JSON.parse(storage)
    } catch (error) {
        console.log('Error: ', error)

        return []
    }
}