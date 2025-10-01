import { apiBasePath } from "@/lib/src/constants";
import { cartCookieType, cartProductType } from "@/types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";










// update for cart
export async function POST(req: NextRequest, { params }: { params: Promise<{ productId: string }> }): Promise<NextResponse> {

    try {
        

        const body = await req.json()

        const { productId } = await params

        if (isNaN(Number(productId))) {
            return NextResponse.json('Lütfen geçerli bir ürün numarası giriniz.', { status: 400 })
        }
        
        const { count } = body

        if (!count) {
            return NextResponse.json('Lütfen ürün sayısı giriniz.', { status: 400 })
        }

        const res = await fetch(`${apiBasePath}/products/${productId}`)

        const response = await res.json()

        if (!response) {
            return NextResponse.json('Ürün bulunamadı', { status: 400 })
        }

        const cookieStore = await cookies()

        const store = cookieStore.get('cart')?.value

        let items: cartCookieType[] = []

        if (!store) {

            items = [{
                productId: Number(productId),
                count
            }]

            
        } else {
            items = JSON.parse(store)

            const existItem = items.find((i) => i.productId.toString() == productId)

            if (!existItem) {
                items = [...items, {
                    productId: Number(productId),
                    count
                }]
            } else {
                items = items.map((item) => {

                    if (item.productId.toString() == productId) {

                        return {
                            productId: Number(productId),
                            count: item.count + count
                        }
                    } else {
                        return item
                    }
                })
            }
        }

        cookieStore.set('cart', JSON.stringify(items))

        return NextResponse.json('Ürün sepete başarıyla eklendi.', { status: 200 })

    } catch (error) {
        console.log('Error: ', error)

        return NextResponse.json(JSON.stringify(null), { status: 400, statusText: 'test' })
    }
}