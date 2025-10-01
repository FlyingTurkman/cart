'use client'

import ProductCard from "@/components/products/ProductCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useSiteContext } from "@/context/SiteContextProvider"
import { cartProductType, productType } from "@/types"
import { useEffect, useState } from "react"














export default function MainPageClient() {

    const { cart, allProducts } = useSiteContext()

    const [selectedProducts, setSelectedProducts] = useState<cartProductType[]>([])

    useEffect(() => {

        // calculating total price with cart products
        // need this for price calculation
        let cartProducts: cartProductType[] = []

        for (const cartItem of cart) {

            const product: productType | undefined = allProducts.find((p) => p.id == cartItem.productId)

            if (product) {
                cartProducts.push({
                    ...product,
                    count: cartItem.count
                })
            }
        }

        setSelectedProducts(cartProducts)
    }, [cart, allProducts])

    return (
        <div
        className="container mx-auto my-10"
        >
            <div
            className="flex flex-row items-start"
            >
                <div
                className="flex flex-col basis-full lg:basis-3/4 gap-4 p-2"
                >
                    {cart.map((cartItem) => {

                        const productData: productType | undefined = allProducts.find((product) => product.id == cartItem.productId)

                        if (productData) {

                            return (
                                <ProductCard
                                key={cartItem.productId}
                                product={{
                                    ...productData,
                                    count: cartItem.count
                                }}
                                />
                            )
                        } else {
                            return null
                        }
                    })}
                </div>

                {/* Total price seciton */}
                <div
                className="flex flex-col basis-full lg:basis-1/4 p-2 gap-4"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center font-bold text-xl">
                                Sepetim
                            </CardTitle>
                        </CardHeader>
                        <Separator/>
                        <CardContent
                        className="flex flex-col gap-2"
                        >
                            <Label>
                                <b>Tutar: </b>{selectedProducts.reduce((acc, product) => acc + (product.price * product.count), 0).toFixed(2)} $
                            </Label>
                            <Label>
                                <b>Vergi: </b>{(selectedProducts.reduce((acc, product) => acc + (product.price * product.count), 0) / 10).toFixed(2)} $
                            </Label>
                            <Label>
                                <b>Toplam: </b>{(selectedProducts.reduce((acc, product) => acc + (product.price * product.count), 0) * 1.1).toFixed(2)} $
                            </Label>
                        </CardContent>
                        <Separator/>
                        <CardFooter>
                            <Button
                            className="w-full"
                            >
                                Alışverişi Tamamla
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}