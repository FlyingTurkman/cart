'use server'

import { cartCookieType, responseType } from "@/types"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"





type removeProductFromBasketresponseType = responseType & { cart?: cartCookieType[] }





export async function removeProductFromBasket(productId: number): Promise<removeProductFromBasketresponseType> {

    try {

        // get cookie for cart items
        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        if (!store) {
            return {
                status: false,
                message: 'Sepetiniz zaten boş.'
            }
        }

        const items: cartCookieType[] = JSON.parse(store)

        // filter cart items and remove selected product
        const newItems: cartCookieType[] = items.filter((item) => item.productId != productId)

        cookieStore.set('cart', JSON.stringify(newItems), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30}) // setting 1 month

        // revalidate for cart item count
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