'use client'

import ProductCard from "@/components/products/ProductCard"
import { useSiteContext } from "@/context/SiteContextProvider"
import { productType } from "@/types"














export default function MainPageClient() {

    const { cart, allProducts } = useSiteContext()

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
                <div
                className="flex flex-col basis-full lg:basis-1/4"
                >
                    Fiyat
                </div>
            </div>
        </div>
    )
}