'use server'

import { cartCookieType, responseType } from "@/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





type removeProductFromBasketresponseType = responseType & { cart?: cartCookieType[] }





export async function removeProductFromBasket(productId: number): Promise<removeProductFromBasketresponseType> {

    try {
        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        if (!store) {
            return {
                status: false,
                message: 'Sepetiniz zaten boş.'
            }
        }

        const items: cartCookieType[] = JSON.parse(store)

        const newItems: cartCookieType[] = items.filter((item) => item.productId != productId)

        cookieStore.set('cart', JSON.stringify(newItems), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30})

        revalidatePath('/cart')

        return {
            status: true,
            message: 'Ürün sepetinizden başarıyla kaldırıldı.',
            cart: newItems
        }
    } catch (error) {
        console.log('Error: ', error)

        return {
            status: false,
            message: 'Beklenmedik bir hata meydana geldi.'
        }
    }
}