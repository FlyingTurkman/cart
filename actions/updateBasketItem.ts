'use server'

import { cartCookieType, responseType } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";





type updateBasketItemResponseType = responseType & {
    cart?: cartCookieType[]
}






export async function updateBasketItem(data: cartCookieType): Promise<updateBasketItemResponseType> {
    try {
        
        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        if (!store) {
            return {
                status: false,
                message:'Sepetiniz boş.'
            }
        }

        const items: cartCookieType[] = JSON.parse(store)

        const cartItem: cartCookieType | undefined = items.find((item) => item.productId == data.productId)

        if (!cartItem) {
            return {
                status: false,
                message: 'Ürün sepetinizde bulunamadı.'
            }
        }

        const newCartItems: cartCookieType[] = items.map((item) => {

            if (item.productId.toString() == data.productId.toString()) {

                return data
            } else {
                return item
            }
        })

        cookieStore.set('cart', JSON.stringify(newCartItems), { expires: Date.now() + 1000 * 60 * 60 * 24 * 30})

        revalidatePath('/cart')
        
        return {
            status: true,
            message: 'Ürün başarıyla güncellendi.',
            cart: newCartItems
        }

    } catch (error) {
        console.log('Error: ', error)

        return {
            status: false,
            message: 'Beklenmedik bir hata meydana geldi.'
        }
    }
}