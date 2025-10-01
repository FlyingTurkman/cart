'use client'

import { cartProductType } from "@/types"
import { Card, CardContent, CardDescription } from "../ui/card"
import Image from "next/image"
import { imageLoader } from "@/lib/src/imageLoader"
import { Label } from "../ui/label"
import ProductStars from "./ProductStars"
import { Button } from "../ui/button"
import { IoAdd, IoRemove } from "react-icons/io5"
import { useState } from "react"
import { Separator } from "../ui/separator"
import { toast } from "sonner"
import { updateBasketItem } from "@/actions/updateBasketItem"
import { useSiteContext } from "@/context/SiteContextProvider"
import { removeProductFromBasket } from "@/actions/removeProductFromBasket"













export default function ProductCard({
    product
}: {
    product: cartProductType
}) {

    const { setCart } = useSiteContext()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [count, setCount] = useState<number>(product.count)
    return (
        <Card>
            <CardContent>
                <div
                className="flex flex-col lg:flex-row items-start"
                >
                    <div
                    className="w-32 h-32 lg:w-64 lg:h-64 aspect-square shrink-0"
                    >
                        <Image
                        width={256}
                        height={256}
                        alt={`${product.title} image`}
                        src={product.image}
                        loader={imageLoader}
                        className="w-full aspect-square object-contain"
                        />
                    </div>
                    <div
                    className="flex flex-col gap-2"
                    >
                        <Label>
                            <b>{product.title}</b>
                        </Label>
                        <CardDescription
                        className="line-clamp-3"
                        >
                            {product.description}
                        </CardDescription>
                        <div
                        className="flex flex-row items-center gap-2"
                        >
                            <ProductStars
                            stars={product.rating.rate}
                            />
                            <Label>
                                ({product.rating.count})
                            </Label>
                        </div>
                        <Label
                        className="text-xl"
                        >
                            {(product.price * count).toFixed(2)} $
                        </Label>
                        <Separator/>
                        <div
                        className="flex flex-row items-center gap-4"
                        >
                            <Button
                            variant={'outline'}
                            size={'icon'}
                            disabled={count == 1}
                            onClick={() => {
                                setCount((prev) => prev == 1 ? 1 : prev - 1)
                            }}
                            >
                                <IoRemove/>
                            </Button>
                            <Label
                            className="text-xl"
                            >
                                {count}
                            </Label>
                            <Button
                            variant={'outline'}
                            size={'icon'}
                            onClick={() => {
                                setCount((prev) => prev + 1)
                            }}
                            >
                                <IoAdd/>
                            </Button>
                        </div>
                        <div
                        className="flex flex-row items-center gap-2"
                        >
                            {count != product.count && (
                                <Button
                                onClick={updateCartProductFunction}
                                disabled={isLoading}
                                >
                                    Güncelle
                                </Button>
                                
                            )}
                            <Button
                            variant={'destructive'}
                            disabled={isLoading}
                            onClick={removeProductFromBasketFunction}
                            >
                                Kaldır
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    async function updateCartProductFunction() {

        if (isLoading) return 

        setIsLoading(true)

        try {
            
            const res = await fetch(`${process.env.homeDomain}/api/cartApi/${product.id}`, {
                method: 'POST',
                body: JSON.stringify({
                    count
                })
            })

            const fetchResponse = await res.json()

            if (res.status != 200) {
                toast.error('İşlem başarısız.', {
                    description: fetchResponse
                })

                setIsLoading(false)
                return
            }

            const response = await updateBasketItem({
                productId: product.id,
                count
            })

            if (!response.status) {
                toast.error('İşlem başarısız.', {
                    description: response.message
                })
            }else {
                toast.success('İşlem başarılı.', {
                    description: response.message
                })

                if (response.cart) {
                    setCart(response.cart)
                }
            }

            
        } catch (error) {
            console.log('Error: ', error)

            toast.error('Beklenmedik bir hata meydana geldi.')
        }

        setIsLoading(false)
    }

    async function removeProductFromBasketFunction() {
        if (isLoading) return

        setIsLoading(true)

        try {
            
            const res = await fetch(`${process.env.homeDomain}/api/cartApi/${product.id}`, {
                method: 'DELETE'
            })

            const fetchResponse = await res.json()

            if (res.status != 200) {

                toast.error('İşlem başarısız.', {
                    description: fetchResponse
                })

                setIsLoading(false)

                return
            }

            const response = await removeProductFromBasket(product.id)

            if (!response.status) {
                toast.error('İşlem başarısız.', {
                    description: response.message
                })
            } else {
                toast.success('İşlem başarılı.', {
                    description: response.message
                })

                if (response.cart) {
                    setCart(response.cart)
                }
            }
        } catch (error) {
            console.log('Error: ', error)

            toast.error('İşlem başarısız.', {
                description: 'Beklenmedik bir hata meydana geldi.'
            })
        }

        setIsLoading(false)
    }
}