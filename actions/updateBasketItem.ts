'use server'

import { tokenExpiryTime } from "@/lib/src/constants";
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

        // finding item for create new one or overwrite
        const cartItem: cartCookieType | undefined = items.find((item) => item.productId == data.productId)

        if (!cartItem) {
            return {
                status: false,
                message: 'Ürün sepetinizde bulunamadı.'
            }
        }

        const newCartItems: cartCookieType[] = items.map((item) => {

            if (item.productId.toString() == data.productId.toString()) {

                return data // if item exist returning data
            } else {
                return item // if item doesnt exist returning current data
            }
        })

        cookieStore.set('cart', JSON.stringify(newCartItems), { expires: Date.now() + tokenExpiryTime }) // setting 1 month

        // revalidate for menu cart item count
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